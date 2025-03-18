<?php
function cricket_express_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('menus');
    
    // Register Navigation Menus
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'footer' => 'Footer Menu',
        'top-menu' => 'Top Menu',
        'blog-categories' => 'Blog Categories Menu'
    ));
}
add_action('after_setup_theme', 'cricket_express_setup');

// Register Custom Post Types
function cricket_express_register_post_types() {
    // Live Matches
    register_post_type('live_matches', array(
        'labels' => array(
            'name' => 'Live Matches',
            'singular_name' => 'Live Match',
            'add_new' => 'Add New Match',
            'edit_item' => 'Edit Match',
            'all_items' => 'All Matches'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-calendar',
        'has_archive' => true
    ));

    // Cricket News
    register_post_type('cricket_news', array(
        'labels' => array(
            'name' => 'Cricket News',
            'singular_name' => 'News',
            'add_new' => 'Add News',
            'edit_item' => 'Edit News'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-media-document',
        'has_archive' => true
    ));

    // Teams
    register_post_type('cricket_teams', array(
        'labels' => array(
            'name' => 'Teams',
            'singular_name' => 'Team'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-groups'
    ));

    // Players
    register_post_type('cricket_players', array(
        'labels' => array(
            'name' => 'Players',
            'singular_name' => 'Player'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-admin-users'
    ));

    // Series & Tournaments
    register_post_type('cricket_series', array(
        'labels' => array(
            'name' => 'Series & Tournaments',
            'singular_name' => 'Series'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-awards'
    ));
}
add_action('init', 'cricket_express_register_post_types');

// Register Custom Taxonomies
function cricket_express_register_taxonomies() {
    // Blog Categories
    register_taxonomy('blog_category', array('post', 'cricket_news'), array(
        'labels' => array(
            'name' => 'Blog Categories',
            'singular_name' => 'Blog Category',
            'menu_name' => 'Blog Categories',
            'all_items' => 'All Categories',
            'edit_item' => 'Edit Category',
            'view_item' => 'View Category',
            'update_item' => 'Update Category',
            'add_new_item' => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'parent_item' => 'Parent Category',
            'parent_item_colon' => 'Parent Category:',
            'search_items' => 'Search Categories',
            'popular_items' => 'Popular Categories',
            'separate_items_with_commas' => 'Separate categories with commas',
            'add_or_remove_items' => 'Add or remove categories',
            'choose_from_most_used' => 'Choose from the most used categories',
            'not_found' => 'No categories found'
        ),
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
        'rest_base' => 'blog-categories',
        'rewrite' => array('slug' => 'blog-category')
    ));

    // Cricket Categories
    register_taxonomy('cricket_category', array('cricket_news', 'post'), array(
        'labels' => array(
            'name' => 'Cricket Categories',
            'singular_name' => 'Cricket Category',
            'menu_name' => 'Cricket Categories',
            'all_items' => 'All Categories',
            'edit_item' => 'Edit Category',
            'view_item' => 'View Category',
            'update_item' => 'Update Category',
            'add_new_item' => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'parent_item' => 'Parent Category',
            'parent_item_colon' => 'Parent Category:',
            'search_items' => 'Search Categories',
            'popular_items' => 'Popular Categories'
        ),
        'hierarchical' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'show_in_rest' => true,
        'rest_base' => 'cricket-categories',
        'rewrite' => array('slug' => 'cricket-category')
    ));

    // Default Blog Categories
    $blog_categories = array(
        'Match Analysis' => array(
            'description' => 'In-depth match analysis and reports',
            'slug' => 'match-analysis'
        ),
        'Player Spotlight' => array(
            'description' => 'Features on cricket players',
            'slug' => 'player-spotlight'
        ),
        'Cricket News' => array(
            'description' => 'Latest cricket news and updates',
            'slug' => 'cricket-news'
        ),
        'Opinion' => array(
            'description' => 'Expert opinions and editorials',
            'slug' => 'opinion'
        ),
        'Technology in Cricket' => array(
            'description' => 'Technology impact in cricket',
            'slug' => 'technology'
        ),
        'Cricket History' => array(
            'description' => 'Historical cricket moments',
            'slug' => 'history'
        )
    );

    // Create default blog categories
    foreach ($blog_categories as $cat_name => $cat_args) {
        if (!term_exists($cat_name, 'blog_category')) {
            wp_insert_term(
                $cat_name,
                'blog_category',
                array(
                    'description' => $cat_args['description'],
                    'slug' => $cat_args['slug']
                )
            );
        }
    }

    // Match Types
    register_taxonomy('match_type', 'live_matches', array(
        'labels' => array(
            'name' => 'Match Types',
            'singular_name' => 'Match Type'
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_admin_column' => true
    ));

    // Tournament Types
    register_taxonomy('tournament_type', array('cricket_series', 'live_matches'), array(
        'labels' => array(
            'name' => 'Tournament Types',
            'singular_name' => 'Tournament Type'
        ),
        'hierarchical' => true,
        'show_in_rest' => true,
        'show_admin_column' => true
    ));
}
add_action('init', 'cricket_express_register_taxonomies');

// Add meta box for blog categories
function cricket_express_add_blog_meta_boxes() {
    add_meta_box(
        'blog_category_meta_box',
        'Blog Categories',
        'cricket_express_blog_category_meta_box',
        'post',
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'cricket_express_add_blog_meta_boxes');

// Blog category meta box callback
function cricket_express_blog_category_meta_box($post) {
    $terms = get_terms(array(
        'taxonomy' => 'blog_category',
        'hide_empty' => false,
    ));
    
    $post_terms = wp_get_object_terms($post->ID, 'blog_category', array('fields' => 'ids'));
    
    echo '<div class="blog-categories-meta-box">';
    foreach ($terms as $term) {
        echo '<label>';
        echo '<input type="checkbox" name="blog_category[]" value="' . esc_attr($term->term_id) . '"';
        if (in_array($term->term_id, $post_terms)) {
            echo ' checked="checked"';
        }
        echo '> ' . esc_html($term->name);
        echo '</label><br>';
    }
    echo '</div>';
}

// Save blog categories
function cricket_express_save_blog_categories($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['blog_category'])) {
        $categories = array_map('intval', $_POST['blog_category']);
        wp_set_object_terms($post_id, $categories, 'blog_category');
    }
}
add_action('save_post', 'cricket_express_save_blog_categories');

// Add REST API support for blog categories
function cricket_express_register_rest_fields() {
    // Register blog category terms in REST API
    register_rest_field('post', 'blog_categories', array(
        'get_callback' => function($post) {
            return wp_get_post_terms($post['id'], 'blog_category', array('fields' => 'ids'));
        },
        'update_callback' => function($value, $post) {
            return wp_set_post_terms($post->ID, $value, 'blog_category');
        },
        'schema' => array(
            'description' => 'Blog categories',
            'type' => 'array',
            'items' => array(
                'type' => 'integer',
            ),
        ),
    ));

    // Add meta fields for blog posts
    register_rest_field('post', 'meta_fields', array(
        'get_callback' => function($post) {
            return array(
                'featured' => get_post_meta($post['id'], '_featured_post', true),
                'views' => get_post_meta($post['id'], '_post_views', true),
                'reading_time' => get_post_meta($post['id'], '_reading_time', true)
            );
        },
        'update_callback' => function($value, $post) {
            if (!empty($value['featured'])) {
                update_post_meta($post->ID, '_featured_post', $value['featured']);
            }
            if (!empty($value['views'])) {
                update_post_meta($post->ID, '_post_views', $value['views']);
            }
            if (!empty($value['reading_time'])) {
                update_post_meta($post->ID, '_reading_time', $value['reading_time']);
            }
        },
        'schema' => array(
            'description' => 'Post meta fields',
            'type' => 'object'
        ),
    ));

    // Add author details
    register_rest_field('post', 'author_info', array(
        'get_callback' => function($post) {
            $author_id = $post['author'];
            return array(
                'name' => get_the_author_meta('display_name', $author_id),
                'avatar' => get_avatar_url($author_id),
                'bio' => get_the_author_meta('description', $author_id)
            );
        },
        'schema' => array(
            'description' => 'Author information',
            'type' => 'object'
        ),
    ));

    $post_types = array('live_matches', 'cricket_news', 'cricket_teams', 
                       'cricket_players', 'cricket_series', 'post');

    // Add featured image URL
    register_rest_field($post_types, 'featured_image_url', array(
        'get_callback' => function($post) {
            if (has_post_thumbnail($post['id'])) {
                $img_id = get_post_thumbnail_id($post['id']);
                $img_url = wp_get_attachment_image_src($img_id, 'full');
                return $img_url[0];
            }
            return null;
        }
    ));

    // Add custom fields
    register_rest_field($post_types, 'custom_fields', array(
        'get_callback' => function($post) {
            return get_fields($post['id']);
        }
    ));

    // Add categories and terms
    register_rest_field($post_types, 'categories_data', array(
        'get_callback' => function($post) {
            $categories = get_the_terms($post['id'], 'cricket_category');
            return !is_wp_error($categories) ? $categories : array();
        }
    ));
}
add_action('rest_api_init', 'cricket_express_register_rest_fields');

// Register custom fields for live matches
function cricket_express_register_match_fields() {
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
            if (!empty($value['match_status'])) {
                update_post_meta($object->ID, '_match_status', $value['match_status']);
            }
            if (!empty($value['match_result'])) {
                update_post_meta($object->ID, '_match_result', $value['match_result']);
            }
            if (!empty($value['team1'])) {
                update_post_meta($object->ID, '_team1', $value['team1']);
            }
            if (!empty($value['team2'])) {
                update_post_meta($object->ID, '_team2', $value['team2']);
            }
            if (!empty($value['team1_score'])) {
                update_post_meta($object->ID, '_team1_score', $value['team1_score']);
            }
            if (!empty($value['team2_score'])) {
                update_post_meta($object->ID, '_team2_score', $value['team2_score']);
            }
            if (!empty($value['team1_overs'])) {
                update_post_meta($object->ID, '_team1_overs', $value['team1_overs']);
            }
            if (!empty($value['team2_overs'])) {
                update_post_meta($object->ID, '_team2_overs', $value['team2_overs']);
            }
            if (!empty($value['match_date'])) {
                update_post_meta($object->ID, '_match_date', $value['match_date']);
            }
            if (!empty($value['venue'])) {
                update_post_meta($object->ID, '_venue', $value['venue']);
            }
        },
        'schema' => array(
            'description' => 'Match custom fields',
            'type' => 'object'
        ),
    ));
}
add_action('rest_api_init', 'cricket_express_register_match_fields');

// Add custom columns to posts list
function cricket_express_add_admin_columns($columns) {
    $new_columns = array();
    foreach ($columns as $key => $value) {
        if ($key === 'date') {
            $new_columns['blog_categories'] = 'Blog Categories';
            $new_columns['featured'] = 'Featured';
        }
        $new_columns[$key] = $value;
    }
    return $new_columns;
}
add_filter('manage_posts_columns', 'cricket_express_add_admin_columns');

// Fill custom columns with data
function cricket_express_custom_column_content($column, $post_id) {
    switch ($column) {
        case 'blog_categories':
            $terms = wp_get_post_terms($post_id, 'blog_category');
            if (!empty($terms) && !is_wp_error($terms)) {
                $term_names = array_map(function($term) {
                    return sprintf(
                        '<a href="%s">%s</a>',
                        esc_url(get_edit_term_link($term->term_id, 'blog_category')),
                        esc_html($term->name)
                    );
                }, $terms);
                echo implode(', ', $term_names);
            }
            break;
        case 'featured':
            $featured = get_post_meta($post_id, '_featured_post', true);
            echo $featured ? '★' : '−';
            break;
    }
}
add_action('manage_posts_custom_column', 'cricket_express_custom_column_content', 10, 2);

// Make columns sortable
function cricket_express_sortable_columns($columns) {
    $columns['blog_categories'] = 'blog_categories';
    $columns['featured'] = 'featured';
    return $columns;
}
add_filter('manage_edit-post_sortable_columns', 'cricket_express_sortable_columns');

// Add quick edit support for featured posts
function cricket_express_quick_edit_custom_box($column_name, $post_type) {
    if ($column_name !== 'featured') return;
    ?>
    <fieldset class="inline-edit-col-right">
        <div class="inline-edit-col">
            <label class="inline-edit-featured">
                <input type="checkbox" name="featured_post" value="1">
                <span class="checkbox-title">Featured Post</span>
            </label>
        </div>
    </fieldset>
    <?php
}
add_action('quick_edit_custom_box', 'cricket_express_quick_edit_custom_box', 10, 2);

// Save quick edit data
function cricket_express_save_quick_edit_data($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['featured_post'])) {
        update_post_meta($post_id, '_featured_post', 1);
    } else {
        delete_post_meta($post_id, '_featured_post');
    }
}
add_action('save_post', 'cricket_express_save_quick_edit_data');

// Create default categories, match types, and tournament types on theme activation
function cricket_express_create_default_categories() {
    $categories = array(
        'Match Reports' => array(
            'description' => 'Detailed match analysis and reports',
            'slug' => 'match-reports'
        ),
        'Team Updates' => array(
            'description' => 'Latest team news and updates',
            'slug' => 'team-updates'
        ),
        'Player Profiles' => array(
            'description' => 'In-depth player profiles and statistics',
            'slug' => 'player-profiles'
        ),
        'Series Coverage' => array(
            'description' => 'Coverage of ongoing cricket series and tournaments',
            'slug' => 'series-coverage'
        ),
        'IPL News' => array(
            'description' => 'Indian Premier League news and updates',
            'slug' => 'ipl-news'
        ),
        'International Cricket' => array(
            'description' => 'International cricket news and coverage',
            'slug' => 'international-cricket'
        ),
        'Domestic Cricket' => array(
            'description' => 'Domestic cricket tournaments and matches',
            'slug' => 'domestic-cricket'
        ),
        'Analysis & Opinion' => array(
            'description' => 'Expert analysis and opinion pieces',
            'slug' => 'analysis-opinion'
        )
    );

    foreach ($categories as $cat_name => $cat_args) {
        if (!term_exists($cat_name, 'cricket_category')) {
            wp_insert_term(
                $cat_name,
                'cricket_category',
                array(
                    'description' => $cat_args['description'],
                    'slug' => $cat_args['slug']
                )
            );
        }
    }

    // Create default match types
    $match_types = array(
        'Test Match' => 'test-match',
        'ODI' => 'odi',
        'T20I' => 't20i',
        'T20 League' => 't20-league',
        'First Class' => 'first-class',
        'List A' => 'list-a'
    );

    foreach ($match_types as $type_name => $slug) {
        if (!term_exists($type_name, 'match_type')) {
            wp_insert_term($type_name, 'match_type', array('slug' => $slug));
        }
    }

    // Create default tournament types
    $tournament_types = array(
        'ICC World Cup' => 'icc-world-cup',
        'T20 World Cup' => 't20-world-cup',
        'Champions Trophy' => 'champions-trophy',
        'Bilateral Series' => 'bilateral-series',
        'IPL' => 'ipl',
        'Big Bash League' => 'bbl',
        'The Hundred' => 'the-hundred'
    );

    foreach ($tournament_types as $type_name => $slug) {
        if (!term_exists($type_name, 'tournament_type')) {
            wp_insert_term($type_name, 'tournament_type', array('slug' => $slug));
        }
    }
}

// Run this function on theme activation
add_action('after_switch_theme', 'cricket_express_create_default_categories');

// Scripts and Styles
function cricket_express_scripts() {
    $assets_dir = get_template_directory_uri() . '/assets';
    
    // Get all files in assets directory
    $asset_files = scandir(get_template_directory() . '/assets');
    
    // Find CSS and JS files
    $css_file = '';
    $js_file = '';
    foreach ($asset_files as $file) {
        if (strpos($file, '.css') !== false) {
            $css_file = $file;
        }
        if (strpos($file, '.js') !== false && strpos($file, '.json') === false) {
            $js_file = $file;
        }
    }
    
    // Enqueue CSS and JS
    if ($css_file) {
        wp_enqueue_style('cricket-express-styles', 
            $assets_dir . '/' . $css_file,
            array(),
            null
        );
    }
    
    if ($js_file) {
        wp_enqueue_script('cricket-express-main',
            $assets_dir . '/' . $js_file,
            array(),
            null,
            true
        );

        // Add WordPress data to window object
        wp_localize_script('cricket-express-main', 'wpData', array(
            'restUrl' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest'),
            'baseUrl' => get_site_url(),
            'adminUrl' => admin_url(),
            'categories' => get_terms(array('taxonomy' => 'cricket_category')),
            'currentUser' => wp_get_current_user()
        ));
    }
}
add_action('wp_enqueue_scripts', 'cricket_express_scripts');

// Enable CORS
function cricket_express_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}
add_action('init', 'cricket_express_cors_headers');
