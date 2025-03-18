
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMatchById } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CricketChatbot from '../components/CricketChatbot';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Trophy, Users } from 'lucide-react';

const MatchDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMatchDetails = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await fetchMatchById(id);
          setMatch(data);
        }
      } catch (error) {
        console.error('Error fetching match details:', error);
      } finally {
        setLoading(false);
      }
    };

    getMatchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cricket-gray">
        <Header />
        <div className="cricket-container py-12">
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-cricket-gray">
        <Header />
        <div className="cricket-container py-12">
          <h1 className="text-3xl font-bold mb-4 text-cricket-darkGray">Match Not Found</h1>
          <p>Sorry, we couldn't find the match details you're looking for.</p>
        </div>
        <Footer />
        <CricketChatbot />
      </div>
    );
  }

  const isCompleted = match.status.toLowerCase() === 'result' || 
                    match.status.toLowerCase() === 'completed' ||
                    match.status.toLowerCase().includes('won');

  return (
    <div className="min-h-screen bg-cricket-gray">
      <Header />
      
      <div className="cricket-container py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Match Header */}
          <div className="bg-cricket-blue text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <Badge variant="outline" className="bg-white/20 text-white border-none mb-2">
                  {match.type}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{match.teams.home.team} vs {match.teams.away.team}</h1>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin size={16} />
                  <span>{match.venue}</span>
                </div>
              </div>
              <Badge 
                variant={isCompleted ? "secondary" : "outline"} 
                className={isCompleted ? "mt-4 md:mt-0 bg-white/90 text-cricket-blue text-lg px-4 py-2" : "mt-4 md:mt-0 bg-white/20 text-white border-none text-lg px-4 py-2"}
              >
                {match.status}
              </Badge>
            </div>
          </div>
          
          {/* Match Score */}
          <div className="p-6 bg-white border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Team 1 */}
              <div className="bg-cricket-gray/30 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cricket-darkGray">{match.teams.home.team}</h2>
                  <span className="text-2xl font-bold text-cricket-darkGray">{match.teams.home.score}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {match.teams.home.overs && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Overs: {match.teams.home.overs}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Team 2 */}
              <div className="bg-cricket-gray/30 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cricket-darkGray">{match.teams.away.team}</h2>
                  <span className="text-2xl font-bold text-cricket-darkGray">{match.teams.away.score}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {match.teams.away.overs && (
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>Overs: {match.teams.away.overs}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Match Result */}
            {match.result && (
              <div className="mt-6 p-4 bg-cricket-blue/10 rounded-lg border border-cricket-blue/20">
                <div className="flex items-center gap-2 text-cricket-blue">
                  <Trophy size={20} />
                  <span className="font-medium">{match.result}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Match Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-cricket-darkGray">Match Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-cricket-blue" size={20} />
                    <h4 className="font-semibold">Series</h4>
                  </div>
                  <p>{match.series}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="text-cricket-blue" size={20} />
                    <h4 className="font-semibold">Match Type</h4>
                  </div>
                  <p>{match.type}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* WordPress Section - This would pull content from WordPress in a real implementation */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-cricket-darkGray">Match Analysis</h3>
          <p className="mb-4">
            This match between {match.teams.home.team} and {match.teams.away.team} showcased some exciting cricket. 
            The conditions at {match.venue} were perfect for this {match.type} match.
          </p>
          <p>
            This content would be pulled from WordPress in a real implementation, allowing editors to provide 
            match analysis, player performances, and other relevant content through the WordPress admin panel.
          </p>
        </div>
      </div>
      
      <Footer />
      <CricketChatbot />
    </div>
  );
};

export default MatchDetails;
