
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopStories, NewsItem } from '../services/api';
import { useTheme } from '@/hooks/use-theme';
import { Badge } from '@/components/ui/badge';
import { Clock, User } from 'lucide-react';

const TopStories = () => {
  const [stories, setStories] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await fetchTopStories();
        setStories(data);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <section className={`py-8 ${isDark ? 'bg-gray-900' : 'bg-white'} animate-fade-in`}>
      <div className="cricket-container">
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>Top Stories</h2>
          <Link to="/news" className="text-cricket-blue hover:underline text-sm">
            See all
          </Link>
        </div>

        {loading ? (
          <div className="py-6 flex justify-center">
            <div className="w-6 h-6 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured story - spans full width */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <div className="relative rounded-lg overflow-hidden shadow-md group h-[320px]">
                <Link to={`/news/${stories[0]?.id}`}>
                  <div className="h-full relative">
                    <img 
                      src={stories[0]?.imageUrl} 
                      alt={stories[0]?.title} 
                      className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <Badge className="mb-2 bg-cricket-blue hover:bg-cricket-blue/90">
                        {stories[0]?.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white mb-2">{stories[0]?.title}</h3>
                      <p className="text-white/80 mb-3 line-clamp-2">{stories[0]?.summary}</p>
                      <div className="flex items-center text-xs text-white/70 gap-4">
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {stories[0]?.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {stories[0]?.publishedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Medium-sized stories */}
            {stories.slice(1, 3).map((story) => (
              <div key={story.id} className="col-span-1 md:col-span-1 animate-scale-in">
                <div className="rounded-lg overflow-hidden shadow-md h-full bg-white dark:bg-gray-800 group">
                  <Link to={`/news/${story.id}`}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={story.imageUrl} 
                        alt={story.title} 
                        className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className={`mb-2 ${isDark ? 'text-white border-white/20' : 'text-cricket-blue border-cricket-blue/20'}`}>
                        {story.category}
                      </Badge>
                      <h3 className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-cricket-blue transition-colors ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
                        {story.title}
                      </h3>
                      <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {story.summary}
                      </p>
                      <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {story.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {story.publishedAt}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}

            {/* Third row - medium article */}
            <div className="col-span-1 md:col-span-1 animate-scale-in">
              <div className="rounded-lg overflow-hidden shadow-md h-full bg-white dark:bg-gray-800 group">
                <Link to={`/news/${stories[3]?.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={stories[3]?.imageUrl} 
                      alt={stories[3]?.title} 
                      className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="outline" className={`mb-2 ${isDark ? 'text-white border-white/20' : 'text-cricket-blue border-cricket-blue/20'}`}>
                      {stories[3]?.category}
                    </Badge>
                    <h3 className={`text-lg font-semibold mb-2 line-clamp-2 group-hover:text-cricket-blue transition-colors ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
                      {stories[3]?.title}
                    </h3>
                    <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stories[3]?.summary}
                    </p>
                    <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {stories[3]?.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {stories[3]?.publishedAt}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Blog list items - smaller */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className={`rounded-lg p-5 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>Latest Updates</h3>
                <div className="space-y-4">
                  {stories.slice(4, 9).map((story) => (
                    <Link key={story.id} to={`/news/${story.id}`} className="block group">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={story.imageUrl} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <span className={`text-xs ${isDark ? 'text-cricket-blue/80' : 'text-cricket-blue'}`}>
                            {story.category}
                          </span>
                          <h4 className={`text-sm font-medium line-clamp-2 group-hover:text-cricket-blue transition-colors ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
                            {story.title}
                          </h4>
                          <div className={`flex text-xs gap-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span>{story.publishedAt}</span>
                            <span>•</span>
                            <span>{story.author}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Featured column */}
            <div className="col-span-1">
              <div className={`rounded-lg p-5 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md h-full`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
                  Editor's Pick
                </h3>
                <div className="space-y-4">
                  <div className="rounded-md overflow-hidden mb-3">
                    <img 
                      src={stories[9]?.imageUrl || "/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png"} 
                      alt="Editor's Pick" 
                      className="w-full h-36 object-cover"
                    />
                  </div>
                  <Badge className="mb-2 bg-cricket-blue hover:bg-cricket-blue/90">
                    Featured
                  </Badge>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>
                    Women's World Cup 2025: Full schedule announced
                  </h4>
                  <p className={`text-sm line-clamp-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    ICC releases the complete fixtures for the upcoming Women's World Cup with Australia defending their title.
                  </p>
                  <Link to="/news/featured" className="text-cricket-blue hover:underline text-sm inline-block mt-2">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopStories;
