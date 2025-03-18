
import React, { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Header from '../components/Header';
import LiveScores from '../components/LiveScores';
import TopStories from '../components/TopStories';
import FeaturedContent from '../components/FeaturedContent';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import CricketChatbot from '../components/CricketChatbot';
import { Link } from 'react-router-dom';
import NewsGrid from '../components/NewsGrid';

const Index = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Simulating WordPress integration
  useEffect(() => {
    console.log('WordPress integration initialized');
    // In a real app, this would include WordPress API calls
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-gray-900' : 'bg-cricket-gray'}`}>
      <Header />
      
      {/* Main Banner */}
      <section className={`${isDark ? 'bg-cricket-blue/90' : 'bg-cricket-blue'} py-3 border-t border-b ${isDark ? 'border-cricket-blue/50' : 'border-cricket-blue/30'}`}>
        <div className="cricket-container">
          <div className="flex flex-wrap space-x-2 text-sm font-medium overflow-x-auto">
            <Link to="/ipl-2025" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              IPL 2025
            </Link>
            <Link to="/wpl-2025" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              WPL 2025
            </Link>
            <Link to="/india-mens-fixtures" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              India men's fixtures
            </Link>
            <Link to="/india-womens-fixtures" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              India women's fixtures
            </Link>
            <Link to="/ask-cricinfo" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              Ask CricketExpress
            </Link>
            <Link to="/icc-team-rankings" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              ICC team rankings
            </Link>
            <Link to="/icc-player-rankings" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              ICC player rankings
            </Link>
            <Link to="/writers" className="text-white/90 hover:text-white px-3 py-1 whitespace-nowrap">
              Writers
            </Link>
          </div>
        </div>
      </section>
      
      {/* Live Scores */}
      <LiveScores />
      
      {/* Feature Banner */}
      <section className={`py-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="cricket-container">
          <div className="w-full h-60 sm:h-72 rounded-lg overflow-hidden shadow-md">
            <img 
              src="/lovable-uploads/e7d840d2-b6d0-459b-a3a3-5bd73dba393e.png" 
              alt="Feature Banner" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Top Stories */}
      <TopStories />
      
      {/* IPL News Section */}
      <NewsGrid category="IPL" title="IPL 2025 News" limit={7} />
      
      {/* Match Coverage */}
      <section className={`py-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="cricket-container">
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-cricket-darkGray'}`}>Match Coverage</h2>
          
          <div className="mb-6">
            <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex overflow-x-auto pb-2 space-x-4">
                <button className="px-4 py-2 bg-cricket-blue text-white font-medium rounded-md whitespace-nowrap">
                  DC vs MI
                </button>
                <button className={`px-4 py-2 font-medium rounded-md whitespace-nowrap ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-cricket-darkGray hover:bg-gray-100'}`}>
                  NZ vs Pak
                </button>
                <button className={`px-4 py-2 font-medium rounded-md whitespace-nowrap ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-cricket-darkGray hover:bg-gray-100'}`}>
                  NZ vs SL
                </button>
                <button className={`px-4 py-2 font-medium rounded-md whitespace-nowrap ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-cricket-darkGray hover:bg-gray-100'}`}>
                  PM's Cup
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative rounded-lg overflow-hidden mb-6">
                <img 
                  src="/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png"
                  alt="Match Coverage" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    A Harmanpreet masterpiece brings second title to Mumbai
                  </h3>
                  <div className="inline-block bg-cricket-blue/90 text-white px-4 py-2 rounded-md text-sm mb-4">
                    DC-W vs MI-W: MI Women won by 8 runs
                  </div>
                </div>
              </div>
              
              <div className={`space-y-3 ${isDark ? 'text-gray-300' : ''}`}>
                <Link to="/match/report/1" className={`block ${isDark ? 'text-gray-300 hover:text-cricket-blue' : 'text-cricket-darkGray hover:text-cricket-blue'} transition-colors duration-200 flex items-center`}>
                  <span className="mr-2">→</span>
                  <span>DC's Batty bats for team, says 'no mental block' in final</span>
                </Link>
                <Link to="/match/report/2" className={`block ${isDark ? 'text-gray-300 hover:text-cricket-blue' : 'text-cricket-darkGray hover:text-cricket-blue'} transition-colors duration-200 flex items-center`}>
                  <span className="mr-2">→</span>
                  <span>Report: Sciver-Brunt helps to sink DC</span>
                </Link>
                <Link to="/match/report/3" className={`block ${isDark ? 'text-gray-300 hover:text-cricket-blue' : 'text-cricket-darkGray hover:text-cricket-blue'} transition-colors duration-200 flex items-center`}>
                  <span className="mr-2">→</span>
                  <span>Harmanpreet: Our MI bowlers made 150 look 'like 180'</span>
                </Link>
                <Link to="/match/report/4" className={`block ${isDark ? 'text-gray-300 hover:text-cricket-blue' : 'text-cricket-darkGray hover:text-cricket-blue'} transition-colors duration-200 flex items-center`}>
                  <span className="mr-2">→</span>
                  <span>Stats - Another WPL final, another DC defeat</span>
                </Link>
                <Link to="/match/report/5" className={`block ${isDark ? 'text-gray-300 hover:text-cricket-blue' : 'text-cricket-darkGray hover:text-cricket-blue'} transition-colors duration-200 flex items-center`}>
                  <span className="mr-2">→</span>
                  <span>Sutherland interview - 'WPL will provide intel for WC'</span>
                </Link>
              </div>
            </div>
            
            <div>
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
      
      {/* Women's Cricket Section */}
      <NewsGrid category="Women's Cricket" title="Women's Cricket" limit={5} />
      
      <FeaturedContent />
      
      <Footer />
      
      <CricketChatbot />
    </div>
  );
};

export default Index;
