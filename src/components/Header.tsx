import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, User, ChevronDown, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfile } from '@/components/auth/UserProfile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} shadow-sm sticky top-0 z-50`}>
      {/* Top Header */}
      <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="cricket-container py-2">
          <div className="flex justify-between items-center">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-cricket-blue">
                CricketExpress
              </Link>
            </div>
            
            {/* Right side */}
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-cricket-blue'}`}
                onClick={toggleSearch}
              >
                <Search size={20} />
              </button>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDark ? 'text-yellow-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <UserProfile />
              
              <button
                className={`sm:hidden p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-cricket-blue'}`}
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search bar */}
      {isSearchOpen && (
        <div className={`border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} py-2 animate-fade-in`}>
          <div className="cricket-container">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search for news, matches, players..." 
                className={`pl-10 ${isDark ? 'bg-gray-800 border-gray-700 text-white' : ''}`}
                autoFocus
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      )}
      
      {/* Main Navigation */}
      <div className="cricket-container py-3">
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} sm:block`}>
          <ul className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm font-medium ${isDark ? 'text-gray-300' : ''}`}>
            <li>
              <Link 
                to="/" 
                className={`cricket-nav-link ${isActive('/') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/matches" 
                className={`cricket-nav-link ${isActive('/matches') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                Matches
              </Link>
            </li>
            <li>
              <Link 
                to="/ipl-2025" 
                className={`cricket-nav-link ${isActive('/ipl-2025') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                IPL 2025
              </Link>
            </li>
            <li>
              <Link 
                to="/news" 
                className={`cricket-nav-link ${isActive('/news') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                News
              </Link>
            </li>
            <li>
              <Link 
                to="/wpl-2025" 
                className={`cricket-nav-link ${isActive('/wpl-2025') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                WPL 2025
              </Link>
            </li>
            <li>
              <Link 
                to="/series/world-cup" 
                className={`cricket-nav-link ${isActive('/series/world-cup') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                World Cup
              </Link>
            </li>
            <li>
              <Link 
                to="/photos" 
                className={`cricket-nav-link ${isActive('/photos') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                Photos
              </Link>
            </li>
            <li>
              <Link 
                to="/videos" 
                className={`cricket-nav-link ${isActive('/videos') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                Videos
              </Link>
            </li>
            <li>
              <Link 
                to="/rankings" 
                className={`cricket-nav-link ${isActive('/rankings') ? 'active' : ''} ${isDark ? 'text-gray-300 hover:text-white' : ''}`}
              >
                Rankings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
