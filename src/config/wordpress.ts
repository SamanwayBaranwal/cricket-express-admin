export const WORDPRESS_CONFIG = {
  // Your WordPress site URL (change this to your actual WordPress site URL)
  API_URL: process.env.WORDPRESS_API_URL || 'http://your-wordpress-site.com/wp-json',
  
  // WordPress REST API version
  API_VERSION: 'wp/v2',
  
  // Custom endpoints
  ENDPOINTS: {
    posts: '/posts',
    pages: '/pages',
    media: '/media',
    categories: '/categories',
    tags: '/tags',
    menus: '/menus/v1/menus',
    matchScores: '/cricket/v1/matches',
    videos: '/cricket/v1/videos',
    photos: '/cricket/v1/photos',
    series: '/cricket/v1/series'
  },
  
  // Authentication
  AUTH: {
    username: process.env.WORDPRESS_USERNAME,
    password: process.env.WORDPRESS_PASSWORD,
    APPLICATION_PASSWORD: process.env.WORDPRESS_APP_PASSWORD
  }
};
