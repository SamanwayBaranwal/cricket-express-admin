import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogContent from '../components/BlogContent';
import BlogPost from '../components/BlogPost';
import { NewsItem, fetchPostBySlug, fetchBlogPosts } from '../services/api';
import { Skeleton } from '@/components/ui/skeleton';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [post, setPost] = useState<NewsItem | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        if (!id) {
          navigate('/');
          return;
        }

        const postData = await fetchPostBySlug(id);
        if (!postData) {
          navigate('/');
          return;
        }

        setPost(postData);

        // Load related posts from the same category
        const related = await fetchBlogPosts(postData.category, 3);
        setRelatedPosts(related.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error loading post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-cricket-gray'}`}>
        <Header />
        <div className="cricket-container py-12">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-[400px] w-full mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-cricket-gray'}`}>
      <Header />

      <div className="cricket-container py-12">
        <BlogContent post={post} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogPost 
                  key={relatedPost.id} 
                  post={relatedPost}
                  size="medium"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;
