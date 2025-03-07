import React from 'react';
import useApi from '../hooks/useApi';
import { getTeamDetails } from '../services/sportsDbApi';
import TeamLogo from './TeamLogo';

/**
 * Component to display team information in a card
 * @returns {JSX.Element} TeamInfoCard component
 */
function TeamInfoCard() {
  const { data: teamData, loading, error, refetch } = useApi(getTeamDetails, [], ['Fredrikstad'], false);

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
          <h3 className="text-lg font-medium">Feil ved lasting av lagdata</h3>
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
        {/* Team header with modern layout */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            {teamData?.crest ? (
              <img src={teamData.crest} alt={teamData.name} className="w-16 h-16 object-contain" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center">
                <TeamLogo teamName={teamData?.name} className="w-12 h-12" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-md">
              <span className="text-xs font-bold text-red-600">N</span>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{teamData?.name}</h2>
            <div className="flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500 mr-1">
                <path d="M9.69 18.933l-.005.003-.019.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
              </svg>
              <p className="text-sm text-muted-foreground">{teamData?.venue}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-3 border border-white/5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Grunnlagt</p>
            <p className="font-semibold">{teamData?.founded}</p>
          </div>
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-3 border border-white/5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Farger</p>
            <p className="font-semibold">{teamData?.clubColors}</p>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
          </svg>
          Meritter
        </h3>
        <div className="space-y-3">
          {teamData?.achievements?.map((achievement, index) => (
            <div key={index} className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-3 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="font-medium">{achievement.title}</span>
                <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full">{achievement.count}x</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{achievement.years}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamInfoCard;
