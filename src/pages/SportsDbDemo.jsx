import React from 'react';
import EliteserienStandings from '../components/EliteserienStandings';
import TeamDetails from '../components/TeamDetails';
import UpcomingMatches from '../components/UpcomingMatches';

/**
 * Demo page for TheSportsDB API integration
 * @returns {JSX.Element} SportsDbDemo page
 */
function SportsDbDemo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">TheSportsDB API Demo</h1>
        <p className="mt-2 text-gray-600">
          This page demonstrates the integration with TheSportsDB API for Norwegian Eliteserien data.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <TeamDetails initialTeam="Fredrikstad" />
            <EliteserienStandings />
          </div>
        </div>
        
        <div>
          <UpcomingMatches />
        </div>
      </div>
    </div>
  );
}

export default SportsDbDemo;
