import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPost from '../components/BlogPost';
import { NewsItem, fetchBlogPosts } from '../services/api';
import { Skeleton } from '@/components/ui/skeleton';

interface EmptyPageProps {
  title: string;
  description: string;
}

const EmptyPage: React.FC<EmptyPageProps> = ({ title, description }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        // Get category from title
        const category = title.includes('IPL') ? 'IPL' : 
                        title.includes('News') ? 'News' :
                        title.includes('Women') ? "Women's Cricket" : undefined;
        
        const data = await fetchBlogPosts(category, 12);
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [title]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(0).map((_, i) => (
        <div key={i} className={`rounded-lg overflow-hidden shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-3" />
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-cricket-gray'}`}>
      <Header />

      {/* Page Header */}
      <section className={`py-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="cricket-container">
          <h1 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
            {title}
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="cricket-container">
          {loading ? (
            renderSkeletons()
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmptyPage;
