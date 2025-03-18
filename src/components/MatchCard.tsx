import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../services/api';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full">
      {/* Match Type Header */}
      <div className="bg-cricket-blue text-white p-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-white/20 text-white border-none">
            {match.type}
          </Badge>
          <span className="text-sm">{match.series}</span>
        </div>
        {match.result && (
          <div className="text-sm text-white/90">
            {match.result}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Teams and Scores */}
        <div className="space-y-4">
          {/* Team 1 */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{match.teams.home.team}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-xl text-gray-900">{match.teams.home.score}</span>
              </div>
            </div>
            {match.teams.home.overs && (
              <div className="text-right text-sm text-gray-500">
                {match.teams.home.overs} ov
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span className="font-medium text-gray-900">{match.teams.away.team}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-xl text-gray-900">{match.teams.away.score}</span>
              </div>
            </div>
            {match.teams.away.overs && (
              <div className="text-right text-sm text-gray-500">
                {match.teams.away.overs} ov
              </div>
            )}
          </div>
        </div>

        {/* View Match Details Link */}
        <div className="mt-4 border-t pt-3">
          <Link 
            to={`/match/${match.id}`}
            className="text-sm text-cricket-blue hover:text-cricket-blue/80 flex items-center gap-1"
          >
            View Match Details
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
