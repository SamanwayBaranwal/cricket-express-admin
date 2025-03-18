import axios from 'axios';
import { WORDPRESS_CONFIG } from '../config/wordpress';

const wpData = (window as any).wpData || {
    restUrl: process.env.VITE_WORDPRESS_API_URL,
    nonce: '',
    baseUrl: ''
};

const api = axios.create({
    baseURL: wpData.restUrl,
    headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpData.nonce
    }
});

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    count: number;
    parent: number;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    modified: string;
    slug: string;
    featured_media: number;
    categories: number[];
    blog_categories: number[];
    author: number;
    _embedded?: {
        author?: Array<{ name: string; }>;
        'wp:featuredmedia'?: Array<{ source_url: string; }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string; }>>;
    };
}

export interface Match {
    id: string;
    title: string;
    type: string;
    status: string;
    venue: string;
    series: string;
    result?: string;
    teams: {
        home: { team: string; score: string };
        away: { team: string; score: string };
    };
    custom_fields: {
        match_status: string;
        team1: string;
        team2: string;
        team1_score: string;
        team2_score: string;
        match_date: string;
        venue: string;
    };
}

export interface NewsItem {
    id: string;
    title: string;
    content: string;
    summary: string;
    imageUrl: string;
    author: string;
    publishedAt: string;
    category: string;
}

// Fetch blog categories
export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
    try {
        const response = await api.get('/wp/v2/blog-categories', {
            params: {
                per_page: 100,
                hide_empty: false
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching blog categories:', error);
        return [];
    }
};

// Fetch posts by blog category
export const fetchPostsByBlogCategory = async (categoryId: number, page = 1, perPage = 10): Promise<Post[]> => {
    try {
        const response = await api.get('/wp/v2/posts', {
            params: {
                blog_category: categoryId,
                page,
                per_page: perPage,
                _embed: true
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
};

// Create a new blog post
export const createBlogPost = async (postData: {
    title: string;
    content: string;
    excerpt?: string;
    featured_media?: number;
    blog_categories?: number[];
    status?: 'publish' | 'draft' | 'pending';
}): Promise<Post> => {
    try {
        const response = await api.post('/wp/v2/posts', postData);
        return response.data;
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
};

// Update a blog post
export const updateBlogPost = async (
    postId: number,
    postData: Partial<{
        title: string;
        content: string;
        excerpt: string;
        featured_media: number;
        blog_categories: number[];
        status: 'publish' | 'draft' | 'pending';
    }>
): Promise<Post> => {
    try {
        const response = await api.put(`/wp/v2/posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }
};

// Delete a blog post
export const deleteBlogPost = async (postId: number): Promise<void> => {
    try {
        await api.delete(`/wp/v2/posts/${postId}`, {
            params: { force: true }
        });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
};

// Fetch live matches
export const fetchLiveMatches = async (): Promise<Match[]> => {
    try {
        const response = await api.get('/wp/v2/live_matches', {
            params: {
                per_page: 10,
                _embed: true
            }
        });
        
        return response.data.map((match: any) => ({
            id: match.id.toString(),
            title: match.title.rendered,
            type: match.match_type?.[0]?.name || 'Unknown',
            status: match.custom_fields?.match_status || 'Unknown',
            venue: match.custom_fields?.venue || '',
            series: match.tournament_type?.[0]?.name || '',
            result: '',
            teams: {
                home: {
                    team: match.custom_fields?.team1 || '',
                    score: match.custom_fields?.team1_score || ''
                },
                away: {
                    team: match.custom_fields?.team2 || '',
                    score: match.custom_fields?.team2_score || ''
                }
            },
            custom_fields: {
                match_status: match.custom_fields?.match_status || '',
                team1: match.custom_fields?.team1 || '',
                team2: match.custom_fields?.team2 || '',
                team1_score: match.custom_fields?.team1_score || '',
                team2_score: match.custom_fields?.team2_score || '',
                match_date: match.custom_fields?.match_date || '',
                venue: match.custom_fields?.venue || ''
            }
        }));
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return [];
    }
};

interface WordPressServiceConfig {
    baseUrl: string;
    headers: HeadersInit;
}

class WordPressService {
    private config: WordPressServiceConfig;

    constructor(config: WordPressServiceConfig) {
        this.config = config;
    }

    async getPosts(category?: string, page = 1, perPage = 10): Promise<NewsItem[]> {
        try {
            const categoryParam = category ? `&categories=${category}` : '';
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/posts?page=${page}&per_page=${perPage}${categoryParam}`,
                { headers: this.config.headers }
            );
            
            const posts = await response.json();
            return posts.map(this.transformWordPressPost);
        } catch (error) {
            console.error('Error fetching WordPress posts:', error);
            return [];
        }
    }

    async getPages(): Promise<any[]> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/pages`,
                { headers: this.config.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching WordPress pages:', error);
            return [];
        }
    }

    async getMedia(page = 1, perPage = 20): Promise<any[]> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/media?page=${page}&per_page=${perPage}`,
                { headers: this.config.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching WordPress media:', error);
            return [];
        }
    }

    async getCategories(): Promise<any[]> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/categories`,
                { headers: this.config.headers }
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching WordPress categories:', error);
            return [];
        }
    }

    async getMatches(): Promise<Match[]> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}${WORDPRESS_CONFIG.ENDPOINTS.matchScores}`,
                { headers: this.config.headers }
            );
            const matches = await response.json();
            return matches.map(this.transformWordPressMatch);
        } catch (error) {
            console.error('Error fetching WordPress matches:', error);
            return [];
        }
    }

    async createPost(postData: any): Promise<any> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/posts`,
                {
                    method: 'POST',
                    headers: this.config.headers,
                    body: JSON.stringify(postData)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error creating WordPress post:', error);
            throw error;
        }
    }

    async updatePost(postId: number, postData: any): Promise<any> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/posts/${postId}`,
                {
                    method: 'PUT',
                    headers: this.config.headers,
                    body: JSON.stringify(postData)
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error updating WordPress post:', error);
            throw error;
        }
    }

    async deletePost(postId: number): Promise<any> {
        try {
            const response = await fetch(
                `${this.config.baseUrl}/${WORDPRESS_CONFIG.API_VERSION}/posts/${postId}`,
                {
                    method: 'DELETE',
                    headers: this.config.headers
                }
            );
            return await response.json();
        } catch (error) {
            console.error('Error deleting WordPress post:', error);
            throw error;
        }
    }

    private transformWordPressPost(wpPost: any): NewsItem {
        return {
            id: wpPost.id.toString(),
            title: wpPost.title.rendered,
            summary: wpPost.excerpt.rendered.replace(/<[^>]*>/g, ''),
            content: wpPost.content.rendered,
            imageUrl: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg',
            author: wpPost._embedded?.['author']?.[0]?.name || 'Unknown Author',
            publishedAt: new Date(wpPost.date).toLocaleDateString(),
            category: wpPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'
        };
    }

    private transformWordPressMatch(wpMatch: any): Match {
        return {
            id: wpMatch.id.toString(),
            title: wpMatch.title.rendered || '',
            type: wpMatch.match_type,
            status: wpMatch.status,
            venue: wpMatch.venue,
            series: wpMatch.series_name,
            result: wpMatch.result,
            teams: {
                home: {
                    team: wpMatch.team_home,
                    score: wpMatch.score_home
                },
                away: {
                    team: wpMatch.team_away,
                    score: wpMatch.score_away
                }
            },
            custom_fields: {
                match_status: wpMatch.custom_fields?.match_status || '',
                team1: wpMatch.custom_fields?.team1 || '',
                team2: wpMatch.custom_fields?.team2 || '',
                team1_score: wpMatch.custom_fields?.team1_score || '',
                team2_score: wpMatch.custom_fields?.team2_score || '',
                match_date: wpMatch.custom_fields?.match_date || '',
                venue: wpMatch.custom_fields?.venue || ''
            }
        };
    }
}

const wordPressServiceConfig: WordPressServiceConfig = {
    baseUrl: WORDPRESS_CONFIG.API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WORDPRESS_CONFIG.AUTH.APPLICATION_PASSWORD}`
    }
};

export const wordPressService = new WordPressService(wordPressServiceConfig);
