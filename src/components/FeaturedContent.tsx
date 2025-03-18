
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const FeaturedContent = () => {
  return (
    <section className="py-8 bg-white">
      <div className="cricket-container">
        <h2 className="text-2xl font-bold text-cricket-darkGray mb-6">Featured</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured video */}
          <div className="lg:col-span-2 animate-fade-in">
            <div className="relative rounded-lg overflow-hidden shadow-md group h-full">
              <div className="h-[320px] relative">
                <img 
                  src="/lovable-uploads/40109b02-0ca3-472b-9dbd-92637a446eb1.png" 
                  alt="Featured video" 
                  className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Play button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 rounded-full p-3 backdrop-blur-sm border border-white/30 group-hover:bg-cricket-blue transition-all duration-300">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
                
                {/* Video duration */}
                <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  4:25
                </div>
                
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-xs font-medium text-white bg-cricket-blue px-2 py-1 rounded-full mb-2 inline-block">
                    IPL 2025
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Nitish passed fit to join SRH after clearing yo-yo test
                  </h3>
                  <div className="flex flex-col space-y-2 text-white/90 text-sm">
                    <Link to="#" className="hover:text-cricket-blue transition-colors duration-200 flex items-center">
                      <span className="mr-2">•</span>
                      <span>Bumrah set to miss first few games for Mumbai</span>
                    </Link>
                    <Link to="#" className="hover:text-cricket-blue transition-colors duration-200 flex items-center">
                      <span className="mr-2">•</span>
                      <span>Axar Patel to captain Delhi Capitals</span>
                    </Link>
                    <Link to="#" className="hover:text-cricket-blue transition-colors duration-200 flex items-center">
                      <span className="mr-2">•</span>
                      <span>Rahane keen to learn from T20 stalwart Bravo</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar content */}
          <div className="space-y-6">
            <div className="bg-cricket-gray p-4 rounded-lg animate-fade-in">
              <h3 className="text-lg font-semibold text-cricket-darkGray mb-4">News and Analysis</h3>
              <div className="relative rounded-lg overflow-hidden mb-4">
                <img 
                  src="/lovable-uploads/5ee4703b-101e-49a7-8644-197841f3897c.png" 
                  alt="News and Analysis" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-cricket-blue text-white text-xs px-2 py-1 rounded flex items-center">
                  <Play className="h-3 w-3 mr-1" fill="white" />
                  <span>4077 videos</span>
                </div>
              </div>
            </div>
            
            <div className="bg-cricket-gray p-4 rounded-lg animate-fade-in">
              <h3 className="text-lg font-semibold text-cricket-darkGray mb-4">Quick Links</h3>
              <div className="space-y-3">
                <Link to="#" className="block text-cricket-darkGray hover:text-cricket-blue transition-colors duration-200 flex items-center">
                  <span className="mr-2">•</span>
                  <span>Beyond Boundaries</span>
                </Link>
                <Link to="#" className="block text-cricket-darkGray hover:text-cricket-blue transition-colors duration-200 flex items-center">
                  <span className="mr-2">•</span>
                  <span>Farak Hai Moments</span>
                </Link>
                <Link to="#" className="block text-cricket-darkGray hover:text-cricket-blue transition-colors duration-200 flex items-center">
                  <span className="mr-2">•</span>
                  <span>Safe Hands</span>
                </Link>
                <Link to="#" className="block text-cricket-darkGray hover:text-cricket-blue transition-colors duration-200 flex items-center">
                  <span className="mr-2">•</span>
                  <span>Match Day</span>
                </Link>
                <Link to="#" className="block text-cricket-darkGray hover:text-cricket-blue transition-colors duration-200 flex items-center">
                  <span className="mr-2">•</span>
                  <span>Cricinformed</span>
                </Link>
                <button className="w-full mt-2 text-cricket-blue text-sm font-medium">
                  Show More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
