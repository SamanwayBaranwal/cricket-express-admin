import React, { useEffect, useState } from 'react';
import MatchCard from './MatchCard';
import { Match, fetchLiveMatches } from '../services/api';

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  useEffect(() => {
    const getMatches = async () => {
      setLoading(true);
      try {
        const data = await fetchLiveMatches();
        setMatches(data);
        if (data.length > 0 && !selectedFormat) {
          setSelectedFormat(data[0].type.toLowerCase());
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  const filteredMatches = selectedFormat 
    ? matches.filter(match => match.type.toLowerCase().includes(selectedFormat.toLowerCase()))
    : matches;

  const formats = Array.from(new Set(matches.map(match => match.type.toLowerCase())));

  return (
    <div className="bg-gray-50">
      <div className="cricket-container py-4">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-6 h-6 border-4 border-cricket-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Match Navigation */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Matches ({matches.length})</span>
              {formats.map((format) => (
                <button
                  key={format}
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    selectedFormat === format
                      ? 'bg-cricket-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFormat(format)}
                >
                  {format.toUpperCase()}
                </button>
              ))}
              {matches.some(m => 
                (m.teams.home.team.includes('NZ') && m.teams.away.team.includes('PAK')) ||
                (m.teams.home.team.includes('PAK') && m.teams.away.team.includes('NZ'))
              ) && (
                <button
                  className={`px-3 py-1 text-sm font-medium rounded ${
                    selectedFormat === 'nz-pak'
                      ? 'bg-cricket-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFormat('nz-pak')}
                >
                  NZ vs PAK (1)
                </button>
              )}
            </div>

            {/* Match Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredMatches.map((match) => (
                <div key={match.id} className="animate-fade-in">
                  <MatchCard match={match} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
