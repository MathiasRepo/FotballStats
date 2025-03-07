import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { getEliteserienStandings } from '../services/sportsDbApi';
import { Button } from './ui/button';

/**
 * Component to display Eliteserien standings
 * @returns {JSX.Element} EliteserienStandings component
 */
function EliteserienStandings() {
  const [season, setSeason] = useState('2024');
  const { data, loading, error, refetch } = useApi(getEliteserienStandings, [season], [season], false);

  const handleSeasonChange = (newSeason) => {
    setSeason(newSeason);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-4">
        <h3 className="text-lg font-medium">Error loading standings</h3>
        <p className="mt-2 text-sm">{error.message || 'An unknown error occurred'}</p>
        <Button 
          onClick={refetch} 
          className="mt-3 bg-red-100 text-red-800 hover:bg-red-200"
        >
          Try Again
        </Button>
      </div>
    );
  }

  // Handle the actual API response format
  const standings = data?.table || [];
  
  // Log the data for debugging
  console.log('Standings data:', data);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Eliteserien Standings</h2>
        <div className="flex space-x-2 mt-2">
          <Button 
            onClick={() => handleSeasonChange('2024')} 
            variant={season === '2024' ? 'default' : 'outline'}
            size="sm"
          >
            2024
          </Button>
          <Button 
            onClick={() => handleSeasonChange('2023')} 
            variant={season === '2023' ? 'default' : 'outline'}
            size="sm"
          >
            2023
          </Button>
          <Button 
            onClick={() => handleSeasonChange('2022')} 
            variant={season === '2022' ? 'default' : 'outline'}
            size="sm"
          >
            2022
          </Button>
          <Button 
            onClick={() => handleSeasonChange('2021')} 
            variant={season === '2021' ? 'default' : 'outline'}
            size="sm"
          >
            2021
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pos
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                W
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                D
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                L
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GF
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GA
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                GD
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pts
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {standings.length > 0 ? (
              standings.map((team) => (
                <tr key={team.teamid} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {team.position || team.pos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {team.name || team.strTeam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.played || team.intPlayed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.win || team.intWin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.draw || team.intDraw}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.loss || team.intLoss}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.goalsfor || team.intGoalsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.goalsagainst || team.intGoalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {team.goalsdifference || team.intGoalDifference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {team.points || team.intPoints}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                  No standings data available for this season
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EliteserienStandings;
