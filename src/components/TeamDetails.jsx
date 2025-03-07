import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import { getTeamDetails } from '../services/sportsDbApi';
import { Button } from './ui/button';

/**
 * Component to display team details from TheSportsDB API
 * @returns {JSX.Element} TeamDetails component
 */
function TeamDetails({ initialTeam = 'Fredrikstad' }) {
  const [teamName, setTeamName] = useState(initialTeam);
  const [inputValue, setInputValue] = useState(initialTeam);
  const { data, loading, error, refetch } = useApi(getTeamDetails, [teamName], [teamName]);

  // Log the data for debugging
  console.log('Team details data:', data);

  const handleSearch = (e) => {
    e.preventDefault();
    setTeamName(inputValue);
  };

  const team = data?.teams?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Team Details</h2>
        <form onSubmit={handleSearch} className="mt-2 flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter team name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" className="rounded-l-none">
            Search
          </Button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 m-4">
          <h3 className="text-lg font-medium">Error loading team details</h3>
          <p className="mt-2 text-sm">{error.message || 'An unknown error occurred'}</p>
          <Button 
            onClick={refetch} 
            className="mt-3 bg-red-100 text-red-800 hover:bg-red-200"
          >
            Try Again
          </Button>
        </div>
      ) : team ? (
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {team.strTeamBadge && (
              <div className="flex-shrink-0">
                <img 
                  src={team.strTeamBadge} 
                  alt={`${team.strTeam} badge`} 
                  className="w-32 h-32 object-contain"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{team.strTeam}</h1>
              {team.strTeamShort && (
                <p className="text-gray-500 text-sm mt-1">Short name: {team.strTeamShort}</p>
              )}
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.intFormedYear && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                    <p className="mt-1 text-gray-900">{team.intFormedYear}</p>
                  </div>
                )}
                
                {team.strStadium && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stadium</h3>
                    <p className="mt-1 text-gray-900">{team.strStadium}</p>
                  </div>
                )}
                
                {team.strWebsite && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Website</h3>
                    <a 
                      href={`https://${team.strWebsite}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-1 text-blue-600 hover:underline"
                    >
                      {team.strWebsite}
                    </a>
                  </div>
                )}
              </div>
              
              {team.strDescriptionEN && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">About</h3>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                    {team.strDescriptionEN}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {team.strStadiumThumb && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Stadium</h3>
              <img 
                src={team.strStadiumThumb} 
                alt={`${team.strStadium}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Social Media</h3>
            <div className="flex space-x-4">
              {team.strFacebook && (
                <a 
                  href={`https://${team.strFacebook}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Facebook
                </a>
              )}
              {team.strTwitter && (
                <a 
                  href={`https://${team.strTwitter}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600"
                >
                  Twitter
                </a>
              )}
              {team.strInstagram && (
                <a 
                  href={`https://${team.strInstagram}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-gray-500">
          No team found with the name "{teamName}"
        </div>
      )}
    </div>
  );
}

export default TeamDetails;
