import axios from 'axios';

const wpData = (window as any).wpData || {
    restUrl: import.meta.env.VITE_WORDPRESS_API_URL,
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

export interface Match {
    id: string;
    title: string;
    type: string;
    status: string;
    venue: string;
    series: string;
    result: string;
    teams: {
        home: { team: string; score: string; overs: string };
        away: { team: string; score: string; overs: string };
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

// Fallback data for development
const FALLBACK_MATCHES: Match[] = [
    {
        id: '1',
        title: 'Entabbe Cricket Oval',
        type: 'T20',
        status: 'Live',
        venue: 'Entabbe Cricket Oval',
        series: 'Women\'s T20',
        result: '',
        teams: {
            home: {
                team: 'Uganda Women',
                score: '71/9',
                overs: '20.0'
            },
            away: {
                team: 'Namibia Women',
                score: '72/2',
                overs: '15.3'
            }
        },
        custom_fields: {
            match_status: 'Live',
            team1: 'Uganda Women',
            team2: 'Namibia Women',
            team1_score: '71/9',
            team2_score: '72/2',
            match_date: new Date().toISOString(),
            venue: 'Entabbe Cricket Oval'
        }
    },
    {
        id: '2',
        title: 'Bayuemas Oval',
        type: 'T20',
        status: 'Live',
        venue: 'Bayuemas Oval',
        series: 'ACC Men\'s T20',
        result: 'Bahrain won by 5 wkts',
        teams: {
            home: {
                team: 'Bahrain',
                score: '126/5',
                overs: '19.2'
            },
            away: {
                team: 'Hong Kong',
                score: '129/2',
                overs: '20.0'
            }
        },
        custom_fields: {
            match_status: 'Completed',
            team1: 'Bahrain',
            team2: 'Hong Kong',
            team1_score: '126/5',
            team2_score: '129/2',
            match_date: new Date().toISOString(),
            venue: 'Bayuemas Oval'
        }
    },
    {
        id: '3',
        title: 'Miraj International',
        type: 'T20',
        status: 'Live',
        venue: 'Miraj International',
        series: 'Lions Cup',
        result: '',
        teams: {
            home: {
                team: 'Sri Lankan Lions',
                score: '148/7',
                overs: '20.0'
            },
            away: {
                team: 'Indian Royals',
                score: '15/1',
                overs: '2.3'
            }
        },
        custom_fields: {
            match_status: 'Live',
            team1: 'Sri Lankan Lions',
            team2: 'Indian Royals',
            team1_score: '148/7',
            team2_score: '15/1',
            match_date: new Date().toISOString(),
            venue: 'Miraj International'
        }
    },
    {
        id: '4',
        title: 'St Albans Club',
        type: 'T20',
        status: 'Live',
        venue: 'St Albans Club',
        series: 'Americas Cup',
        result: '',
        teams: {
            home: {
                team: 'Argentina Women',
                score: '63/9',
                overs: '20.0'
            },
            away: {
                team: 'United States of America Women',
                score: '64/2',
                overs: '15.4'
            }
        },
        custom_fields: {
            match_status: 'Live',
            team1: 'Argentina Women',
            team2: 'United States of America Women',
            team1_score: '63/9',
            team2_score: '64/2',
            match_date: new Date().toISOString(),
            venue: 'St Albans Club'
        }
    }
];

// Fetch Live Matches with fallback data
export const fetchLiveMatches = async (): Promise<Match[]> => {
    try {
        // For development, return fallback data
        return FALLBACK_MATCHES;

        /* Uncomment this when WordPress is set up
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
            result: match.custom_fields?.match_result || '',
            teams: {
                home: {
                    team: match.custom_fields?.team1 || '',
                    score: match.custom_fields?.team1_score || '',
                    overs: match.custom_fields?.team1_overs || ''
                },
                away: {
                    team: match.custom_fields?.team2 || '',
                    score: match.custom_fields?.team2_score || '',
                    overs: match.custom_fields?.team2_overs || ''
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
        */
    } catch (error) {
        console.error('Error fetching live matches:', error);
        return FALLBACK_MATCHES;
    }
};

// Fetch Blog Posts
export const fetchBlogPosts = async (category?: string, limit = 6): Promise<NewsItem[]> => {
    try {
        const params: any = {
            per_page: limit,
            _embed: true
        };

        if (category) {
            params.cricket_category = category;
        }

        const response = await api.get('/wp/v2/posts', { params });
        
        return response.data.map((post: any) => ({
            id: post.id.toString(),
            title: post.title.rendered,
            content: post.content.rendered,
            summary: post.excerpt.rendered,
            imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            author: post._embedded?.author?.[0]?.name || 'Unknown',
            publishedAt: new Date(post.date).toLocaleDateString(),
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

// Fetch Top Stories
export const fetchTopStories = async (limit = 4): Promise<NewsItem[]> => {
    try {
        const response = await api.get('/wp/v2/posts', {
            params: {
                per_page: limit,
                _embed: true,
                meta_key: '_featured_post',
                meta_value: '1',
                orderby: 'date',
                order: 'desc'
            }
        });
        
        return response.data.map((post: any) => ({
            id: post.id.toString(),
            title: post.title.rendered,
            content: post.content.rendered,
            summary: post.excerpt.rendered,
            imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            author: post._embedded?.author?.[0]?.name || 'Unknown',
            publishedAt: new Date(post.date).toLocaleDateString(),
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'
        }));
    } catch (error) {
        console.error('Error fetching top stories:', error);
        return [];
    }
};

// Fetch Teams
export const fetchTeams = async () => {
    try {
        const response = await api.get('/wp/v2/cricket_teams', {
            params: {
                per_page: 20,
                _embed: true
            }
        });
        
        return response.data.map((team: any) => ({
            id: team.id.toString(),
            name: team.title.rendered,
            logo: team._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            ranking: team.custom_fields?.team_ranking || null,
            captain: team.custom_fields?.team_captain || '',
            coach: team.custom_fields?.team_coach || ''
        }));
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
};

// Fetch Series
export const fetchSeries = async () => {
    try {
        const response = await api.get('/wp/v2/cricket_series', {
            params: {
                per_page: 10,
                _embed: true
            }
        });
        
        return response.data.map((series: any) => ({
            id: series.id.toString(),
            title: series.title.rendered,
            startDate: series.custom_fields?.start_date || '',
            endDate: series.custom_fields?.end_date || '',
            teams: series.custom_fields?.participating_teams || [],
            type: series.tournament_type?.[0]?.name || 'Unknown'
        }));
    } catch (error) {
        console.error('Error fetching series:', error);
        return [];
    }
};

// Fetch Players
export const fetchPlayers = async () => {
    try {
        const response = await api.get('/wp/v2/cricket_players', {
            params: {
                per_page: 20,
                _embed: true
            }
        });
        
        return response.data.map((player: any) => ({
            id: player.id.toString(),
            name: player.title.rendered,
            image: player._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            role: player.custom_fields?.player_role || '',
            team: player.custom_fields?.player_team || '',
            stats: player.custom_fields?.player_stats || {}
        }));
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
};

// Fetch Categories
export const fetchCategories = async () => {
    try {
        const response = await api.get('/wp/v2/cricket_category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

// Fetch Match by ID
export const fetchMatchById = async (id: string): Promise<Match | null> => {
    try {
        const response = await api.get(`/wp/v2/live_matches/${id}`, {
            params: {
                _embed: true
            }
        });
        
        const match = response.data;
        return {
            id: match.id.toString(),
            title: match.title.rendered,
            type: match.match_type?.[0]?.name || 'Unknown',
            status: match.custom_fields?.match_status || 'Unknown',
            venue: match.custom_fields?.venue || '',
            series: match.tournament_type?.[0]?.name || '',
            result: match.custom_fields?.match_result || '',
            teams: {
                home: {
                    team: match.custom_fields?.team1 || '',
                    score: match.custom_fields?.team1_score || '',
                    overs: match.custom_fields?.team1_overs || ''
                },
                away: {
                    team: match.custom_fields?.team2 || '',
                    score: match.custom_fields?.team2_score || '',
                    overs: match.custom_fields?.team2_overs || ''
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
        };
    } catch (error) {
        console.error('Error fetching match by ID:', error);
        return null;
    }
};

// Fetch Post by Slug
export const fetchPostBySlug = async (slug: string): Promise<NewsItem | null> => {
    try {
        const response = await api.get('/wp/v2/posts', {
            params: {
                slug,
                _embed: true
            }
        });
        
        if (!response.data.length) {
            return null;
        }

        const post = response.data[0];
        return {
            id: post.id.toString(),
            title: post.title.rendered,
            content: post.content.rendered,
            summary: post.excerpt.rendered,
            imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            author: post._embedded?.author?.[0]?.name || 'Unknown',
            publishedAt: new Date(post.date).toLocaleDateString(),
            category: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized'
        };
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
};
