<?php
function cricket_express_setup() {
    // Add basic theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Enqueue React build files
    function cricket_express_scripts() {
        $assets_dir = get_template_directory_uri() . '/assets';
        
        // Enqueue main JS file
        wp_enqueue_script('cricket-express-main', 
            $assets_dir . '/index.js',
            array(),
            '1.0.0',
            true
        );

        // Enqueue main CSS file
        wp_enqueue_style('cricket-express-styles',
            $assets_dir . '/index.css',
            array(),
            '1.0.0'
        );
    }
    add_action('wp_enqueue_scripts', 'cricket_express_scripts');
}
add_action('after_setup_theme', 'cricket_express_setup');

// Basic SEO meta tags
function cricket_express_meta_tags() {
    ?>
    <meta name="keywords" content="cricket scores, live cricket, cricket news, cricket matches, cricket updates, cricket results">
    <meta property="og:title" content="<?php echo get_bloginfo('name'); ?>">
    <meta property="og:description" content="Live cricket scores, match updates, and latest cricket news">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <?php
}
add_action('wp_head', 'cricket_express_meta_tags');

// Enable CORS for API
function cricket_express_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
add_action('init', 'cricket_express_cors_headers');
