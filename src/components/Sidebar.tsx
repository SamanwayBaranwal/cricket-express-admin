
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // For the number crunching carousel
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { 
      number: "0-3", 
      description: "Delhi Capitals' win-loss record in the WPL finals." 
    },
    { 
      number: "100", 
      description: "Runs scored by Harmanpreet Kaur in the WPL final" 
    },
    { 
      number: "91", 
      description: "Pakistan's total in the first T20I against New Zealand" 
    },
    { 
      number: "9", 
      description: "Wickets taken by Trent Boult in the IPL so far" 
    },
    { 
      number: "189", 
      description: "Highest individual score in this season's PM Cup" 
    }
  ];

  // Auto-advance the stat carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [stats.length]);

  const handleStatIndicatorClick = (index: number) => {
    setCurrentStat(index);
  };

  return (
    <aside className="w-full lg:w-80 space-y-6 animate-slide-in-right">
      {/* Ad Banner */}
      <div className="w-full h-72 bg-cricket-gray rounded-lg overflow-hidden shadow-sm">
        <img 
          src="/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png" 
          alt="Advertisement" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Number Crunching */}
      <div className="bg-cricket-gray rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b border-gray-200">Number Crunching</h3>
        
        <div className="p-6 relative h-48 bg-gradient-to-br from-cricket-lightBlue to-cricket-blue">
          <div className="text-center text-white">
            <div className="text-7xl font-bold mb-4">{stats[currentStat].number}</div>
            <p className="text-sm">{stats[currentStat].description}</p>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {stats.map((_, index) => (
              <button
                key={index}
                className={`dot-indicator ${
                  currentStat === index ? 'bg-white w-3 h-3' : 'bg-white/50 w-2 h-2'
                }`}
                onClick={() => handleStatIndicatorClick(index)}
                aria-label={`Stat ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* On This Day */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">On This Day</h3>
          <Link to="/history" className="text-cricket-blue text-sm hover:underline">
            See all
          </Link>
        </div>
        
        <div className="relative overflow-hidden">
          <img 
            src="/lovable-uploads/918272bd-174f-4673-8c35-ca6fea65ba52.png" 
            alt="Cricket History" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <div className="bg-cricket-blue inline-block px-2 py-1 text-xs font-medium rounded mb-2">
              MAR 16
            </div>
            <h4 className="text-xl font-bold mb-1">Tendulkar gets his 100th hundred</h4>
            <p className="text-sm text-white/80">On this day in 2012, Sachin Tendulkar became the first cricketer to score 100 international centuries.</p>
          </div>
        </div>
      </div>
      
      {/* CricForecast */}
      <div className="bg-cricket-gray rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">CricketExpress Caster</h3>
        <img 
          src="/lovable-uploads/5e53f18f-c6fa-4c89-b9e3-efe4bc72c9ea.png" 
          alt="CricketExpress Caster" 
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <p className="text-sm text-cricket-darkGray">
          Submit your entry and get a chance to become a cricket commentator.
        </p>
        <button className="w-full mt-3 cricket-btn-primary">
          Apply Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
