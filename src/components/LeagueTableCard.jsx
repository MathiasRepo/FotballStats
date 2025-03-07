import React from 'react';
import useApi from '../hooks/useApi';
import { getEliteserienStandings } from '../services/sportsDbApi';
import TeamLogo from './TeamLogo';

/**
 * Component to display the league table in a card
 * @returns {JSX.Element} LeagueTableCard component
 */
function LeagueTableCard() {
  const { data: leagueTable, loading, error, refetch } = useApi(getEliteserienStandings, [], ['2024'], false);

  // Function to determine the background color based on position
  const getPositionColor = (position) => {
    if (position <= 2) return 'bg-blue-200 dark:bg-blue-600/40'; // Champions League Qualification
    if (position <= 4) return 'bg-emerald-200 dark:bg-emerald-600/40'; // Conference League Qualification
    if (position === 14) return 'bg-orange-200 dark:bg-orange-600/40'; // Relegation playoff
    if (position >= 15) return 'bg-red-200 dark:bg-red-600/40'; // Direct relegation
    return '';
  };

  // Function to get position label
  const getPositionLabel = (position) => {
    if (position <= 2) return 'Champions League Kvalifisering';
    if (position <= 4) return 'Conference League Kvalifisering';
    if (position === 14) return 'Nedrykkskvalifikasjon';
    if (position >= 15) return 'Direkte Nedrykk';
    return '';
  };

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
          <h3 className="text-lg font-medium">Feil ved lasting av tabellen</h3>
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
            <path d="M4.93 1.31a41.401 41.401 0 0110.14 0C16.194 1.45 17 2.414 17 3.517V18.25a.75.75 0 01-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 01-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 013 18.25V3.517c0-1.103.806-2.068 1.93-2.207z" />
          </svg>
          Eliteserien Tabell
        </h2>
        
        {/* Position Legend */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-3 border border-white/5">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-200 dark:bg-blue-600/40 mr-1 rounded-sm"></div>
            <span className="text-xs">Champions League Kvalifisering</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-200 dark:bg-emerald-600/40 mr-1 rounded-sm"></div>
            <span className="text-xs">Conference League Kvalifisering</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-200 dark:bg-orange-600/40 mr-1 rounded-sm"></div>
            <span className="text-xs">Nedrykkskvalifikasjon</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-200 dark:bg-red-600/40 mr-1 rounded-sm"></div>
            <span className="text-xs">Direkte Nedrykk</span>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5 dark:bg-white/2 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 dark:border-white/5 bg-white/10 dark:bg-white/5">
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">#</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Lag</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">K</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">V</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">U</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">T</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">+/-</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12">P</th>
                </tr>
              </thead>
              <tbody>
                {leagueTable?.standings?.[0]?.table?.map((team) => {
                  const positionColor = getPositionColor(team.position);
                  const positionLabel = getPositionLabel(team.position);
                  
                  return (
                    <tr 
                      key={team.team.id} 
                      className={`border-b border-white/5 transition-colors hover:bg-white/10 dark:hover:bg-white/5 ${
                        team.team.name === 'Fredrikstad FK' ? 'bg-red-500/5' : ''
                      }`}
                    >
                      <td className={`py-3 px-4 text-sm font-medium ${positionColor}`}>
                        <div className="flex items-center">
                          <span>{team.position}</span>
                          {positionLabel && (
                            <span className="ml-1 inline-block w-2 h-2 rounded-full bg-current"></span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 mr-2 flex-shrink-0">
                            {team.team.crest ? (
                              <img 
                                src={team.team.crest} 
                                alt={`${team.team.name} logo`} 
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <TeamLogo teamName={team.team.name} />
                            )}
                          </div>
                          <span className="font-medium">{team.team.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center text-sm">{team.playedGames}</td>
                      <td className="py-3 px-4 text-center text-sm">{team.won}</td>
                      <td className="py-3 px-4 text-center text-sm">{team.draw}</td>
                      <td className="py-3 px-4 text-center text-sm">{team.lost}</td>
                      <td className="py-3 px-4 text-center text-sm">{team.goalDifference}</td>
                      <td className="py-3 px-4 text-center text-sm font-bold">{team.points}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeagueTableCard;
