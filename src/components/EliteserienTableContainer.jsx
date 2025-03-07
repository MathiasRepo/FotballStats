import React from 'react';
import useApi from '../hooks/useApi';
import { getEliteserienStandings } from '../services/sportsDbApi';
import TeamLogo from './TeamLogo';

/**
 * Container component for Eliteserien table that uses TheSportsDB API
 * @param {Object} props - Component props
 * @param {Function} props.getPositionColor - Function to get position color
 * @param {Function} props.getPositionLabel - Function to get position label
 * @returns {JSX.Element} EliteserienTableContainer component
 */
function EliteserienTableContainer({ getPositionColor, getPositionLabel }) {
  const { data: leagueTable, loading, error, refetch } = useApi(getEliteserienStandings, [], []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-300 rounded-md p-4 mb-4">
        <h3 className="text-lg font-medium">Feil ved lasting av tabellen</h3>
        <p className="mt-2 text-sm">{error?.message || 'En ukjent feil oppstod'}</p>
        <button 
          onClick={refetch} 
          className="mt-3 px-3 py-1.5 text-sm bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 rounded-md"
        >
          Prøv igjen
        </button>
      </div>
    );
  }

  return (
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
  );
}

export default EliteserienTableContainer;
