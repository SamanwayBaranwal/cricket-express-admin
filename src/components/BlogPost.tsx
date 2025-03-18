
import React from 'react';
import { Link } from 'react-router-dom';
import { NewsItem } from '../services/api';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface BlogPostProps {
  post: NewsItem;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, size = 'medium', className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Small blog post (for sidebar or list views)
  if (size === 'small') {
    return (
      <Link to={`/news/${post.id}`} className={`block group ${className}`}>
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
            />
          </div>
          <div>
            <span className={`text-xs ${isDark ? 'text-cricket-blue/80' : 'text-cricket-blue'}`}>
              {post.category}
            </span>
            <h4 className={`text-sm font-medium line-clamp-2 group-hover:text-cricket-blue transition-colors ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
              {post.title}
            </h4>
            <div className={`flex text-xs gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Large blog post (featured)
  if (size === 'large') {
    return (
      <div className={`relative rounded-lg overflow-hidden shadow-md group h-[320px] ${className}`}>
        <Link to={`/news/${post.id}`}>
          <div className="h-full relative">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <Badge className="mb-2 bg-cricket-blue hover:bg-cricket-blue/90">
                {post.category}
              </Badge>
              <h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
              <p className="text-white/80 mb-3 line-clamp-2">{post.summary}</p>
              <div className="flex items-center text-xs text-white/70 gap-4">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.publishedAt}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  // Medium blog post (default)
  return (
    <div className={`rounded-lg overflow-hidden shadow-md h-full ${isDark ? 'bg-gray-800' : 'bg-white'} group ${className}`}>
      <Link to={`/news/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <Badge variant="outline" className={`mb-2 ${isDark ? 'text-white border-white/20' : 'text-cricket-blue border-cricket-blue/20'}`}>
            {post.category}
          </Badge>
          <h3 className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-cricket-blue transition-colors ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
            {post.title}
          </h3>
          <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.summary}
          </p>
          <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.publishedAt}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
