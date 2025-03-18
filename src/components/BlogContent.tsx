import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { NewsItem } from '../services/api';
import { User, Clock, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogContentProps {
  post: NewsItem;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Generate dummy content based on the summary
  const generateDummyContent = () => {
    const paragraphs = [
      post.summary,
      "Cricket, often called the gentleman's game, has evolved significantly over the years. The modern era has brought new dimensions to this traditional sport, with technological advancements and rule changes shaping its future.",
      "The impact of this development extends beyond the boundary ropes. It influences how teams strategize, how players train, and ultimately, how the game is played at the highest level. The cricket community has embraced these changes while maintaining the sport's core values.",
      "Looking ahead, the future of cricket seems bright. With increasing global participation and innovative formats, the sport continues to captivate new audiences while retaining its traditional fan base. The balance between tradition and innovation remains crucial for cricket's sustained growth.",
      "As we witness these transformations, it's essential to remember that cricket's essence lies in its ability to unite people, transcend boundaries, and create lasting memories. Whether it's a village green match or an international tournament, the spirit of cricket prevails."
    ];

    return paragraphs.map((para, index) => (
      <p key={index} className={`mb-6 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {para}
      </p>
    ));
  };

  return (
    <article className={`max-w-4xl mx-auto ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
            <span>{post.publishedAt}</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Social Share */}
      <div className={`flex items-center gap-4 mb-8 pb-8 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <span className="flex items-center gap-2">
          <Share2 size={16} />
          Share
        </span>
        <Button variant="outline" size="sm" className="gap-2">
          <Facebook size={16} />
          Facebook
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Twitter size={16} />
          Twitter
        </Button>
      </div>

      {/* Content */}
      <div className="prose max-w-none">
        {generateDummyContent()}
      </div>

      {/* Tags */}
      <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Cricket</Button>
          <Button variant="outline" size="sm">{post.category}</Button>
          <Button variant="outline" size="sm">Sports</Button>
          <Button variant="outline" size="sm">News</Button>
        </div>
      </div>
    </article>
  );
};

export default BlogContent;
