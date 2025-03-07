import React from 'react';
import useApi from '../hooks/useApi';
import { getPastEvents } from '../services/sportsDbApi';
import { formatDate } from '../lib/utils';

/**
 * Component to display recent match results in a card
 * @returns {JSX.Element} RecentResultsCard component
 */
function RecentResultsCard() {
  const { data: pastMatches, loading, error, refetch } = useApi(getPastEvents, [], ['133604'], false);

  // Render loading state
  if (loading) {
    return (
      <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
        <div className="p-6 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
        <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
        <div className="p-6">
          <h3 className="text-lg font-medium">Feil ved lasting av resultater</h3>
          <p className="mt-2 text-sm">{error?.message || 'En ukjent feil oppstod'}</p>
          <button 
            onClick={refetch} 
            className="mt-3 px-3 py-1.5 text-sm bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-md"
          >
            Prøv igjen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
      
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6.285 12.686l1.414 1.414L10 11.172l-1.414 1.414L8.285 12.686l-1.414-1.414 1.414-1.414z" clipRule="evenodd" />
          </svg>
          Siste Resultater
        </h2>
        
        {pastMatches?.matches?.length > 0 ? (
          <div className="space-y-4">
            {pastMatches.matches.slice(0, 5).map(match => (
              <div key={match.id} className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/5 text-muted-foreground mr-2">
                      {match.competition.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(match.utcDate)}</span>
                  </div>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/5 ${
                    match.score.fullTime.home > match.score.fullTime.away 
                      ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                      : match.score.fullTime.home < match.score.fullTime.away 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                        : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {match.score.fullTime.home > match.score.fullTime.away 
                      ? 'Seier' 
                      : match.score.fullTime.home < match.score.fullTime.away 
                        ? 'Tap' 
                        : 'Uavgjort'}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 flex-shrink-0">
                      {match.homeTeam.crest ? (
                        <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-8 h-8 bg-white/10 dark:bg-white/5 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{match.homeTeam.name.substring(0, 3)}</span>
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{match.homeTeam.name}</span>
                  </div>
                  
                  <div className="px-3 py-1 bg-white/10 dark:bg-white/5 rounded-md font-bold">
                    {match.score.fullTime.home} - {match.score.fullTime.away}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{match.awayTeam.name}</span>
                    <div className="w-8 h-8 flex-shrink-0">
                      {match.awayTeam.crest ? (
                        <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-8 h-8 bg-white/10 dark:bg-white/5 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{match.awayTeam.name.substring(0, 3)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-6 border border-white/5 text-center">
            <p className="text-muted-foreground">Ingen nylige kamper funnet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentResultsCard;
