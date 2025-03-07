import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { getEliteserienStandings } from '../services/sportsDbApi';
import { Button } from './ui/button';
import TeamLogo from './TeamLogo';
import { isFredrikstadTeam, getPositionColor, getPositionLabel } from '../lib/teamUtils';

/**
 * Component to display Eliteserien standings with site-matching design
 * @returns {JSX.Element} EliteserienTable component
 */
function EliteserienTable() {
  const [season, setSeason] = useState('2024');
  const { data, loading, error, refetch } = useApi(getEliteserienStandings, [season], [season], false);

  const handleSeasonChange = (newSeason) => {
    setSeason(newSeason);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
        <h3 className="text-lg font-medium">Feil ved lasting av tabellen</h3>
        <p className="mt-2 text-sm">{error.message || 'En ukjent feil oppstod'}</p>
        <Button 
          onClick={refetch} 
          className="mt-3 bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300"
        >
          Prøv igjen
        </Button>
      </div>
    );
  }

  // Handle the actual API response format
  let standings = data?.standings?.[0]?.table || [];
  
  // Log the data for debugging
  console.log('Standings data:', data);

  // If no standings are found, try to handle the mock data format
  if (standings.length === 0 && data?.table) {
    // Use the table data directly if it exists
    data.standings = [{ table: data.table }];
    standings = data?.standings?.[0]?.table || [];
  }

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <Button 
          onClick={() => handleSeasonChange('2024')} 
          variant={season === '2024' ? 'default' : 'outline'}
          size="sm"
          className={season === '2024' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white/5 dark:bg-white/2 hover:bg-white/10 dark:hover:bg-white/5'}
        >
          2024
        </Button>
        <Button 
          onClick={() => handleSeasonChange('2023')} 
          variant={season === '2023' ? 'default' : 'outline'}
          size="sm"
          className={season === '2023' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-white/5 dark:bg-white/2 hover:bg-white/10 dark:hover:bg-white/5'}
        >
          2023
        </Button>
      </div>
      
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
            {standings.length > 0 ? (
              standings.map((team, index) => {
                const positionColor = getPositionColor(index + 1);
                const positionLabel = getPositionLabel(index + 1);
                
                return (
                  <tr 
                    key={team.team.id} 
                    className={`border-b border-white/5 transition-colors hover:bg-white/10 dark:hover:bg-white/5 ${
                      isFredrikstadTeam(team.team.name) ? 'bg-red-500/5' : ''
                    }`}
                  >
                    <td className={`py-3 px-4 text-sm font-medium ${positionColor}`}>
                      <div className="flex items-center">
                        <span>{index + 1}</span>
                        {positionLabel && (
                          <span className="ml-1 inline-block w-2 h-2 rounded-full bg-current"></span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-6 h-6 mr-2 flex-shrink-0">
                          {team.team.crest ? (
                            <img src={team.team.crest} alt={team.team.name} className="w-6 h-6 object-contain" />
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
              })
            ) : (
              <tr>
                <td colSpan="8" className="py-4 px-6 text-center text-sm text-gray-500">
                  Ingen data tilgjengelig for {season} sesongen
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EliteserienTable;
