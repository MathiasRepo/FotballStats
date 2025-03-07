import React from 'react';
import useApi from '../hooks/useApi';
import { getUpcomingEvents } from '../services/sportsDbApi';
import { Button } from './ui/button';

/**
 * Component to display upcoming matches from TheSportsDB API
 * @returns {JSX.Element} UpcomingMatches component
 */
function UpcomingMatches() {
  const { data, loading, error, refetch } = useApi(getUpcomingEvents, [], [], false);

  // Log the data for debugging
  console.log('Upcoming events data:', data);

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
        <h3 className="text-lg font-medium">Error loading upcoming matches</h3>
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
  const events = data?.events || [];

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Upcoming Matches</h2>
        <p className="text-sm text-gray-500 mt-1">Eliteserien</p>
      </div>
      
      {events.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {events.map((event) => (
            <div key={event.idEvent} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {formatDate(event.dateEvent)}
                  {event.strTime && ` • ${formatTime(event.strTime)}`}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {event.strVenue}
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {event.strHomeTeamBadge && (
                    <img 
                      src={event.strHomeTeamBadge} 
                      alt={`${event.strHomeTeam} badge`} 
                      className="w-8 h-8 object-contain"
                    />
                  )}
                  <span className="font-medium">{event.strHomeTeam}</span>
                </div>
                
                <div className="text-center">
                  <span className="px-2 py-1 bg-blue-50 text-blue-800 text-xs font-medium rounded">
                    VS
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{event.strAwayTeam}</span>
                  {event.strAwayTeamBadge && (
                    <img 
                      src={event.strAwayTeamBadge} 
                      alt={`${event.strAwayTeam} badge`} 
                      className="w-8 h-8 object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          No upcoming matches found
        </div>
      )}
    </div>
  );
}

export default UpcomingMatches;
