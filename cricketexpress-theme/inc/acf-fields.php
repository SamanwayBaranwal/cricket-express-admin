<?php
if( function_exists('acf_add_local_field_group') ):

// Live Matches Fields
acf_add_local_field_group(array(
    'key' => 'group_live_matches',
    'title' => 'Match Details',
    'fields' => array(
        array(
            'key' => 'field_match_status',
            'label' => 'Match Status',
            'name' => 'match_status',
            'type' => 'select',
            'choices' => array(
                'live' => 'Live',
                'upcoming' => 'Upcoming',
                'completed' => 'Completed'
            ),
            'required' => 1
        ),
        array(
            'key' => 'field_team1',
            'label' => 'Team 1',
            'name' => 'team1',
            'type' => 'text',
            'required' => 1
        ),
        array(
            'key' => 'field_team2',
            'label' => 'Team 2',
            'name' => 'team2',
            'type' => 'text',
            'required' => 1
        ),
        array(
            'key' => 'field_team1_score',
            'label' => 'Team 1 Score',
            'name' => 'team1_score',
            'type' => 'text'
        ),
        array(
            'key' => 'field_team2_score',
            'label' => 'Team 2 Score',
            'name' => 'team2_score',
            'type' => 'text'
        ),
        array(
            'key' => 'field_match_date',
            'label' => 'Match Date',
            'name' => 'match_date',
            'type' => 'date_time_picker',
            'required' => 1
        ),
        array(
            'key' => 'field_venue',
            'label' => 'Venue',
            'name' => 'venue',
            'type' => 'text',
            'required' => 1
        )
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'live_matches',
            ),
        ),
    ),
));

// Series Fields
acf_add_local_field_group(array(
    'key' => 'group_series',
    'title' => 'Series Details',
    'fields' => array(
        array(
            'key' => 'field_series_start_date',
            'label' => 'Start Date',
            'name' => 'start_date',
            'type' => 'date_picker',
            'required' => 1
        ),
        array(
            'key' => 'field_series_end_date',
            'label' => 'End Date',
            'name' => 'end_date',
            'type' => 'date_picker',
            'required' => 1
        ),
        array(
            'key' => 'field_participating_teams',
            'label' => 'Participating Teams',
            'name' => 'participating_teams',
            'type' => 'repeater',
            'sub_fields' => array(
                array(
                    'key' => 'field_team_name',
                    'label' => 'Team Name',
                    'name' => 'team_name',
                    'type' => 'text'
                )
            )
        )
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'cricket_series',
            ),
        ),
    ),
));

// Player Fields
acf_add_local_field_group(array(
    'key' => 'group_player',
    'title' => 'Player Details',
    'fields' => array(
        array(
            'key' => 'field_player_role',
            'label' => 'Role',
            'name' => 'player_role',
            'type' => 'select',
            'choices' => array(
                'batsman' => 'Batsman',
                'bowler' => 'Bowler',
                'all_rounder' => 'All-Rounder',
                'wicket_keeper' => 'Wicket Keeper'
            )
        ),
        array(
            'key' => 'field_player_team',
            'label' => 'Team',
            'name' => 'player_team',
            'type' => 'text'
        ),
        array(
            'key' => 'field_player_stats',
            'label' => 'Player Statistics',
            'name' => 'player_stats',
            'type' => 'group',
            'sub_fields' => array(
                array(
                    'key' => 'field_batting_average',
                    'label' => 'Batting Average',
                    'name' => 'batting_average',
                    'type' => 'number'
                ),
                array(
                    'key' => 'field_bowling_average',
                    'label' => 'Bowling Average',
                    'name' => 'bowling_average',
                    'type' => 'number'
                )
            )
        )
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'cricket_players',
            ),
        ),
    ),
));

// Team Fields
acf_add_local_field_group(array(
    'key' => 'group_team',
    'title' => 'Team Details',
    'fields' => array(
        array(
            'key' => 'field_team_ranking',
            'label' => 'Team Ranking',
            'name' => 'team_ranking',
            'type' => 'number'
        ),
        array(
            'key' => 'field_team_captain',
            'label' => 'Team Captain',
            'name' => 'team_captain',
            'type' => 'text'
        ),
        array(
            'key' => 'field_team_coach',
            'label' => 'Team Coach',
            'name' => 'team_coach',
            'type' => 'text'
        )
    ),
    'location' => array(
        array(
            array(
                'param' => 'post_type',
                'operator' => '==',
                'value' => 'cricket_teams',
            ),
        ),
    ),
));

endif;
