import React from 'react';
import useApi from '../hooks/useApi';
import { getTeamDetails } from '../services/sportsDbApi';
import { Button } from './ui/button';
import fredrikstadLogo from '/images/teams/fredrikstad.png';

/**
 * Component to display Fredrikstad FK information in a card with site-matching design
 * @returns {JSX.Element} FFKInfoCard component
 */
function FFKInfoCard() {
  // Use the API hook to fetch team data with useMockData set to false
  const { data: teamData, loading, error, refetch } = useApi(getTeamDetails, [], ['Fredrikstad'], false);
  
  // Log the data for debugging
  console.log('Team data:', teamData);

  // Key facts about Fredrikstad FK
  const keyFacts = [
    { label: 'Grunnlagt', value: teamData?.founded || '1903' },
    { label: 'Hjemmebane', value: teamData?.venue || 'Fredrikstad Stadion' },
    { label: 'Kallenavn', value: 'FFK, Plankehaugen' },
    { label: 'Farger', value: teamData?.clubColors || 'Rød / Hvit' }
  ];

  // Hardcoded achievements data
  const achievements = [
    { title: "Eliteserien", count: 9, years: "1938, 1939, 1949, 1950, 1951, 1952, 1954, 1957, 1960" },
    { title: "Norgesmesterskapet", count: 12, years: "1932, 1935, 1936, 1938, 1940, 1950, 1957, 1961, 1966, 1984, 2006, 2024" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 dark:border-white/5 pb-2">
        <span className="text-xs font-medium text-red-500/80 dark:text-red-400/80">OM KLUBBEN</span>
        <span className="text-xs font-medium">Fredrikstad FK</span>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground mt-2">Laster klubbdata...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-red-500/50 mb-2">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          <p className="text-muted-foreground">Kunne ikke laste klubbdata: {error.message}</p>
          <Button 
            onClick={refetch} 
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Prøv igjen
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Club logo and name */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center">
              <img 
                src={fredrikstadLogo} 
                alt="Fredrikstad FK logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  console.error('Error loading imported image');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{teamData?.name || 'Fredrikstad FK'}</h3>
              <p className="text-xs text-muted-foreground">Stolt tradisjonsrik klubb fra Østfold</p>
            </div>
          </div>
          
          {/* Key facts */}
          <div className="grid grid-cols-2 gap-2">
            {keyFacts.map((fact, index) => (
              <div key={index} className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-lg p-2 border border-white/5">
                <p className="text-xs text-muted-foreground">{fact.label}</p>
                <p className="font-medium text-sm">{fact.value}</p>
              </div>
            ))}
          </div>
          
          {/* Achievements */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" />
              </svg>
              Prestasjoner
            </h4>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex flex-col p-2 bg-white/5 dark:bg-white/2 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{achievement.title}</span>
                    <span className="bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded-full">{achievement.count}x</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.years}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fun fact */}
          <div className="bg-red-500/10 dark:bg-red-500/5 rounded-lg p-3 border border-red-500/10 mt-4">
            <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">VISSTE DU AT...</p>
            <p className="text-sm">Fredrikstad FK var det første laget som vant den norske toppdivisjonen da den ble etablert i 1937/38-sesongen?</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FFKInfoCard;
