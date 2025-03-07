import React from 'react';
import useApi from '../hooks/useApi';
import { getUpcomingEvents } from '../services/sportsDbApi';
import { Button } from './ui/button';
import TeamLogo from './TeamLogo';
import { formatDate } from '../lib/utils';
import { isFredrikstadTeam } from '../lib/teamUtils';

/**
 * Component to display upcoming matches in a card with site-matching design
 * @returns {JSX.Element} UpcomingMatchesCard component
 */
function UpcomingMatchesCard() {
  const { data, loading, error, refetch } = useApi(getUpcomingEvents, [], [], false);

  // Log the data for debugging
  console.log('Upcoming events data:', data);

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
        <h3 className="text-lg font-medium">Feil ved lasting av kommende kamper</h3>
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
  const matches = data?.matches || [];

  // If no matches are found, try to handle the mock data format
  if (matches.length === 0 && data?.events) {
    // Transform the mock data to match the expected format
    data.matches = data.events.map(event => ({
      id: parseInt(event.idEvent),
      competition: { name: 'Eliteserien' },
      utcDate: event.dateEvent + 'T' + (event.strTime || '00:00:00') + 'Z',
      status: 'SCHEDULED',
      homeTeam: { 
        name: event.strHomeTeam, 
        crest: event.strHomeTeamBadge || null 
      },
      awayTeam: { 
        name: event.strAwayTeam, 
        crest: event.strAwayTeamBadge || null 
      },
      score: { fullTime: { home: null, away: null } }
    }));
  }

  // Filter matches to only include those involving Fredrikstad FK
  const fredrikstadMatches = (data?.matches || []).filter(match => 
    isFredrikstadTeam(match.homeTeam.name) || 
    isFredrikstadTeam(match.awayTeam.name)
  );
  
  // Log the filtered matches for debugging
  console.log('Fredrikstad matches:', fredrikstadMatches);

  // Format date for display
  const formatMatchDate = (dateString) => {
    if (!dateString) return '';
    return formatDate(new Date(dateString));
  };

  // Format time for display
  const formatMatchTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {fredrikstadMatches.length > 0 ? (
        fredrikstadMatches.slice(0, 5).map((match) => (
          <div 
            key={match.id} 
            className={`bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5 ${
              isFredrikstadTeam(match.homeTeam.name) ? 'border-l-4 border-l-red-500' : 'border-r-4 border-r-red-500'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">{formatMatchDate(match.utcDate)}</span>
              <span className="text-xs text-muted-foreground">{formatMatchTime(match.utcDate)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex-shrink-0">
                  {match.homeTeam.crest ? (
                    <img src={match.homeTeam.crest} alt={match.homeTeam.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <TeamLogo teamName={match.homeTeam.name} />
                  )}
                </div>
                <span className={`font-medium ${isFredrikstadTeam(match.homeTeam.name) ? 'text-red-500 font-bold' : ''}`}>
                  {match.homeTeam.name}
                </span>
              </div>
              
              <span className="text-sm font-bold px-3 py-1 rounded-md bg-white/5 dark:bg-white/10">vs</span>
              
              <div className="flex items-center space-x-2">
                <span className={`font-medium ${isFredrikstadTeam(match.awayTeam.name) ? 'text-red-500 font-bold' : ''}`}>
                  {match.awayTeam.name}
                </span>
                <div className="w-8 h-8 flex-shrink-0">
                  {match.awayTeam.crest ? (
                    <img src={match.awayTeam.crest} alt={match.awayTeam.name} className="w-8 h-8 object-contain" />
                  ) : (
                    <TeamLogo teamName={match.awayTeam.name} />
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {match.competition?.name || 'Eliteserien'}
              {isFredrikstadTeam(match.homeTeam.name) ? 
                <span className="ml-2 text-green-500">(Hjemme)</span> : 
                <span className="ml-2 text-blue-500">(Borte)</span>
              }
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5 text-center">
          <p className="text-sm text-muted-foreground">Ingen kommende kamper funnet for Fredrikstad FK</p>
        </div>
      )}
      
      {fredrikstadMatches.length > 5 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/5 dark:bg-white/2 hover:bg-white/10 dark:hover:bg-white/5"
          >
            Vis alle FFK kamper
          </Button>
        </div>
      )}
    </div>
  );
}

export default UpcomingMatchesCard;
