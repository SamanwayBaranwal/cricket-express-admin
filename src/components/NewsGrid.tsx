
import React, { useEffect, useState } from 'react';
import { fetchBlogPosts, NewsItem } from '../services/api';
import BlogPost from './BlogPost';
import { useTheme } from '@/hooks/use-theme';

interface NewsGridProps {
  category?: string;
  limit?: number;
  title?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({ 
  category, 
  limit = 8,
  title = 'Latest News'
}) => {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogPosts(category, limit);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [category, limit]);

  if (loading) {
    return (
      <div className="py-6 flex justify-center">
        <div className="w-6 h-6 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        No posts found in this category.
      </div>
    );
  }

  return (
    <section className={`py-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="cricket-container">
        <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature post in first two columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <BlogPost post={posts[0]} size="large" />
          </div>
          
          {/* Medium posts */}
          {posts.slice(1, 3).map(post => (
            <div key={post.id} className="col-span-1">
              <BlogPost post={post} />
            </div>
          ))}
          
          {/* Remaining posts in a grid */}
          {posts.slice(3, 7).map(post => (
            <div key={post.id} className="col-span-1">
              <BlogPost post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;
