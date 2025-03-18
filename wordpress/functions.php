<?php
/**
 * CricketExpress WordPress Integration
 */

// Enable CORS for React frontend
function add_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
}
add_action('init', 'add_cors_headers');

// Register Custom Post Types
function register_cricket_post_types() {
    // Live Matches Post Type
    register_post_type('live_matches', array(
        'labels' => array(
            'name' => 'Live Matches',
            'singular_name' => 'Live Match'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-cricket',
        'show_in_menu' => true,
        'has_archive' => true,
        'rewrite' => array('slug' => 'live-matches')
    ));

    // Register Match Type Taxonomy
    register_taxonomy('match_type', 'live_matches', array(
        'labels' => array(
            'name' => 'Match Types',
            'singular_name' => 'Match Type'
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_admin_column' => true
    ));

    // Register Tournament Type Taxonomy
    register_taxonomy('tournament_type', 'live_matches', array(
        'labels' => array(
            'name' => 'Tournament Types',
            'singular_name' => 'Tournament Type'
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_admin_column' => true
    ));
}
add_action('init', 'register_cricket_post_types');

// Register Custom Fields for Live Matches
function register_live_match_fields() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_live_match_details',
            'title' => 'Live Match Details',
            'fields' => array(
                array(
                    'key' => 'field_match_status',
                    'label' => 'Match Status',
                    'name' => '_match_status',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_match_result',
                    'label' => 'Match Result',
                    'name' => '_match_result',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team1',
                    'label' => 'Team 1',
                    'name' => '_team1',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team2',
                    'label' => 'Team 2',
                    'name' => '_team2',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team1_score',
                    'label' => 'Team 1 Score',
                    'name' => '_team1_score',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team2_score',
                    'label' => 'Team 2 Score',
                    'name' => '_team2_score',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team1_overs',
                    'label' => 'Team 1 Overs',
                    'name' => '_team1_overs',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_team2_overs',
                    'label' => 'Team 2 Overs',
                    'name' => '_team2_overs',
                    'type' => 'text'
                ),
                array(
                    'key' => 'field_match_date',
                    'label' => 'Match Date',
                    'name' => '_match_date',
                    'type' => 'date_time_picker'
                ),
                array(
                    'key' => 'field_venue',
                    'label' => 'Venue',
                    'name' => '_venue',
                    'type' => 'text'
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'live_matches'
                    )
                )
            )
        ));
    }
}
add_action('acf/init', 'register_live_match_fields');

// Register REST API fields for live matches
function register_live_match_rest_fields() {
    register_rest_field('live_matches', 'custom_fields', array(
        'get_callback' => function($object) {
            return array(
                'match_status' => get_post_meta($object['id'], '_match_status', true),
                'match_result' => get_post_meta($object['id'], '_match_result', true),
                'team1' => get_post_meta($object['id'], '_team1', true),
                'team2' => get_post_meta($object['id'], '_team2', true),
                'team1_score' => get_post_meta($object['id'], '_team1_score', true),
                'team2_score' => get_post_meta($object['id'], '_team2_score', true),
                'team1_overs' => get_post_meta($object['id'], '_team1_overs', true),
                'team2_overs' => get_post_meta($object['id'], '_team2_overs', true),
                'match_date' => get_post_meta($object['id'], '_match_date', true),
                'venue' => get_post_meta($object['id'], '_venue', true)
            );
        },
        'update_callback' => function($value, $object) {
            if (!empty($value['match_status'])) update_post_meta($object->ID, '_match_status', $value['match_status']);
            if (!empty($value['match_result'])) update_post_meta($object->ID, '_match_result', $value['match_result']);
            if (!empty($value['team1'])) update_post_meta($object->ID, '_team1', $value['team1']);
            if (!empty($value['team2'])) update_post_meta($object->ID, '_team2', $value['team2']);
            if (!empty($value['team1_score'])) update_post_meta($object->ID, '_team1_score', $value['team1_score']);
            if (!empty($value['team2_score'])) update_post_meta($object->ID, '_team2_score', $value['team2_score']);
            if (!empty($value['team1_overs'])) update_post_meta($object->ID, '_team1_overs', $value['team1_overs']);
            if (!empty($value['team2_overs'])) update_post_meta($object->ID, '_team2_overs', $value['team2_overs']);
            if (!empty($value['match_date'])) update_post_meta($object->ID, '_match_date', $value['match_date']);
            if (!empty($value['venue'])) update_post_meta($object->ID, '_venue', $value['venue']);
        },
        'schema' => array(
            'description' => 'Live match custom fields',
            'type' => 'object'
        )
    ));
}
add_action('rest_api_init', 'register_live_match_rest_fields');

// Add theme support
function cricket_theme_support() {
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'cricket_theme_support');

// Add custom image sizes
function cricket_custom_image_sizes() {
    add_image_size('blog-featured', 800, 400, true);
    add_image_size('match-thumbnail', 400, 300, true);
    add_image_size('player-profile', 300, 300, true);
}
add_action('after_setup_theme', 'cricket_custom_image_sizes');
