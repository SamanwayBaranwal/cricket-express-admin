
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <footer className={`${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-white'} pt-12`}>
      <div className="cricket-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CricketExpress</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} mb-4`}>
              Your premier source for cricket news, scores, stats, and analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-cricket-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-cricket-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-cricket-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-cricket-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Key Resources</h3>
            <ul className={`${isDark ? 'text-gray-400' : 'text-gray-300'} space-y-2`}>
              <li><Link to="/matches" className="hover:text-cricket-blue transition-colors">Live Scores</Link></li>
              <li><Link to="/rankings" className="hover:text-cricket-blue transition-colors">Rankings</Link></li>
              <li><Link to="/news" className="hover:text-cricket-blue transition-colors">News</Link></li>
              <li><Link to="/photos" className="hover:text-cricket-blue transition-colors">Photos</Link></li>
              <li><Link to="/videos" className="hover:text-cricket-blue transition-colors">Videos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Cricket Series</h3>
            <ul className={`${isDark ? 'text-gray-400' : 'text-gray-300'} space-y-2`}>
              <li><Link to="/ipl-2025" className="hover:text-cricket-blue transition-colors">IPL 2025</Link></li>
              <li><Link to="/wpl-2025" className="hover:text-cricket-blue transition-colors">WPL 2025</Link></li>
              <li><Link to="/series/world-cup" className="hover:text-cricket-blue transition-colors">ICC World Cup</Link></li>
              <li><Link to="/series/champions-trophy" className="hover:text-cricket-blue transition-colors">Champions Trophy</Link></li>
              <li><Link to="/series/t20-world-cup" className="hover:text-cricket-blue transition-colors">T20 World Cup</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} flex items-center mb-2`}>
              <Mail size={16} className="mr-2" /> info@cricketexpress.com
            </p>
            <form>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-300'} mb-2`}>Subscribe for updates:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-800 border-gray-700'} px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-cricket-blue`}
                />
                <button
                  type="submit"
                  className="bg-cricket-blue text-white px-4 py-2 rounded-r-md hover:bg-cricket-darkBlue transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-800'} py-6 text-center`}>
          <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm`}>
            © 2025 CricketExpress. All rights reserved. WordPress integration enabled for content management.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/terms" className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm hover:text-cricket-blue transition-colors`}>
              Terms of Service
            </Link>
            <Link to="/privacy" className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm hover:text-cricket-blue transition-colors`}>
              Privacy Policy
            </Link>
            <Link to="/cookies" className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm hover:text-cricket-blue transition-colors`}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
