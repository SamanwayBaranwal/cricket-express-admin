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

// Fallback news data for development
const FALLBACK_NEWS: NewsItem[] = [
    {
        id: '1',
        title: 'India Clinches Victory in Thrilling Final Over Against Australia',
        content: '<p>In a nail-biting finish, India secured a victory against Australia in the final over of the match. Jasprit Bumrah\'s exceptional bowling in the death overs proved to be the deciding factor.</p><p>The match, which saw multiple momentum shifts, ultimately went India\'s way as they successfully defended a modest total of 267.</p>',
        summary: 'India defeats Australia in a thrilling last-over finish with Bumrah starring with the ball.',
        imageUrl: 'https://placehold.co/600x400/png?text=India+vs+Australia',
        author: 'Harsha Bhogle',
        publishedAt: '2025-03-15',
        category: 'International Cricket'
    },
    {
        id: '2',
        title: 'IPL 2025: Mumbai Indians Sign Star All-rounder in Mid-season Transfer',
        content: '<p>Mumbai Indians have strengthened their squad by acquiring the services of international all-rounder James Anderson in a mid-season transfer.</p><p>This strategic move is expected to bolster their bowling attack as they push for a playoff spot in the second half of the tournament.</p>',
        summary: 'Mumbai Indians acquire star all-rounder James Anderson in a mid-season transfer to strengthen their squad.',
        imageUrl: 'https://placehold.co/600x400/png?text=Mumbai+Indians',
        author: 'Ravi Shastri',
        publishedAt: '2025-03-12',
        category: 'IPL'
    },
    {
        id: '3',
        title: 'England Announces Squad for Upcoming Test Series Against South Africa',
        content: '<p>The England Cricket Board has announced a 16-member squad for the upcoming four-match Test series against South Africa.</p><p>The squad features three uncapped players and marks the return of veteran fast bowler Stuart Broad after his brief sabbatical from Test cricket.</p>',
        summary: 'England names 16-member squad with three uncapped players for the South Africa Test series.',
        imageUrl: 'https://placehold.co/600x400/png?text=England+Cricket',
        author: 'Michael Atherton',
        publishedAt: '2025-03-10',
        category: 'Test Cricket'
    },
    {
        id: '4',
        title: 'Women\'s T20 World Cup: Australia Dominates Group Stage',
        content: '<p>Australia\'s women\'s cricket team has continued their dominance in the T20 World Cup, winning all their group stage matches with commanding performances.</p><p>Captain Meg Lanning led from the front with consecutive half-centuries, while bowler Megan Schutt claimed 10 wickets in the group stage.</p>',
        summary: 'Australian women\'s team dominates T20 World Cup group stage with perfect record.',
        imageUrl: 'https://placehold.co/600x400/png?text=Women+Cricket',
        author: 'Lisa Sthalekar',
        publishedAt: '2025-03-08',
        category: 'Women\'s Cricket'
    },
    {
        id: '5',
        title: 'ICC Introduces New Playing Conditions for All Formats',
        content: '<p>The International Cricket Council has announced a set of new playing conditions that will be implemented across all formats of the game starting next month.</p><p>Key changes include modifications to the DRS protocol, stricter penalties for slow over rates, and new guidelines for wet outfield conditions.</p>',
        summary: 'ICC implements new playing conditions across all cricket formats with focus on DRS and over rates.',
        imageUrl: 'https://placehold.co/600x400/png?text=ICC+Rules',
        author: 'Sunil Gavaskar',
        publishedAt: '2025-03-05',
        category: 'Cricket Rules'
    },
    {
        id: '6',
        title: 'Rising Star Shines in County Championship with Double Century',
        content: '<p>Young batting prodigy Alex Hammond has made headlines with an extraordinary double century in his County Championship debut for Yorkshire.</p><p>The 19-year-old\'s innings, which included 28 boundaries and 5 sixes, has already sparked discussions about a potential England call-up in the near future.</p>',
        summary: '19-year-old Alex Hammond scores double century on County Championship debut for Yorkshire.',
        imageUrl: 'https://placehold.co/600x400/png?text=County+Cricket',
        author: 'David Gower',
        publishedAt: '2025-03-03',
        category: 'County Cricket'
    },
    {
        id: '7',
        title: 'IPL 2025: Chennai Super Kings Break Batting Record with 250+ Total',
        content: '<p>Chennai Super Kings have set a new IPL record by posting a mammoth total of 263/3 in their match against Royal Challengers Bangalore.</p><p>MS Dhoni turned back the clock with a blistering 78 off just 27 balls, while opener Ruturaj Gaikwad contributed with a century.</p>',
        summary: 'CSK posts record-breaking 263/3 against RCB with Dhoni and Gaikwad starring with the bat.',
        imageUrl: 'https://placehold.co/600x400/png?text=CSK+vs+RCB',
        author: 'Aakash Chopra',
        publishedAt: '2025-03-01',
        category: 'IPL'
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
        // In development mode or if WordPress API is not available, return mock data
        if (!wpData.restUrl || import.meta.env.DEV) {
            console.log('Using fallback news data');
            let filteredNews = [...FALLBACK_NEWS];
            
            if (category) {
                filteredNews = filteredNews.filter(news => 
                    news.category.toLowerCase().includes(category.toLowerCase())
                );
            }
            
            return filteredNews.slice(0, limit);
        }
        
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
        // Return fallback data on error
        let filteredNews = [...FALLBACK_NEWS];
        
        if (category) {
            filteredNews = filteredNews.filter(news => 
                news.category.toLowerCase().includes(category.toLowerCase())
            );
        }
        
        return filteredNews.slice(0, limit);
    }
};

// Fetch Top Stories
export const fetchTopStories = async (limit = 4): Promise<NewsItem[]> => {
    try {
        // In development mode or if WordPress API is not available, return mock data
        if (!wpData.restUrl || import.meta.env.DEV) {
            console.log('Using fallback top stories data');
            // Use the first few items from our fallback news as featured stories
            return FALLBACK_NEWS.slice(0, limit);
        }
        
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
        // Return fallback data on error
        return FALLBACK_NEWS.slice(0, limit);
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
