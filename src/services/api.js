import axios from 'axios';
import ffkLogo from '../assets/images/fredrikstad.png';

// Use local server as proxy
const API_BASE_URL = 'http://localhost:3001/api';
const DEFAULT_TEAM_ID = import.meta.env.VITE_TEAM_ID || '6956'; // Fredrikstad FK
const DEFAULT_COMPETITION_ID = 'TIP'; // Eliteserien

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  config => {
    console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      console.error('Error response data:', error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received');
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Mock data for development or when API calls fail
const mockData = {
  team: {
    id: 6956,
    name: 'Fredrikstad FK',
    shortName: 'FFK',
    tla: 'FFK',
    crest: '../assets/images/fredrikstad.png', // Use local image to avoid CORB issues
    address: 'Fredrikstad Stadion, Fredrikstad',
    website: 'https://www.fredrikstadfk.no',
    founded: 1903,
    clubColors: 'Red / White',
    venue: 'Fredrikstad Stadion',
    lastUpdated: '2023-05-10T19:48:56Z'
  },
  upcomingFixtures: {
    matches: [
      {
        id: 500001,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-03-10T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Rosenborg BK' },
        score: { fullTime: { home: null, away: null } }
      }
    ]
  },
  pastMatches: {
    matches: [
      {
        id: 500002,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-03-01T15:00:00Z',
        status: 'FINISHED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Molde FK' },
        score: { fullTime: { home: 2, away: 1 } }
      }
    ]
  },
  seasonMatches: {
    matches: [
      // March 2025
      {
        id: 500001,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-03-10T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Rosenborg BK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500003,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-03-16T18:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Molde FK' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500004,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-03-30T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Bodø/Glimt' },
        score: { fullTime: { home: null, away: null } }
      },
      // April 2025
      {
        id: 500005,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-04-13T14:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Viking FK' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500006,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-04-20T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Vålerenga' },
        score: { fullTime: { home: null, away: null } }
      },
      // May 2025
      {
        id: 500007,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-05-01T19:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Lillestrøm' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500008,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-05-11T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Strømsgodset' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500009,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-05-16T18:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Brann' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500010,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-05-24T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Haugesund' },
        score: { fullTime: { home: null, away: null } }
      },
      // June 2025
      {
        id: 500011,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-06-01T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Sandefjord' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500012,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-06-22T19:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Tromsø' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500013,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-06-29T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Odd' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      // July 2025
      {
        id: 500014,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-07-06T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Sarpsborg 08' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500015,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-07-13T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Rosenborg BK' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500016,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-07-20T19:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Molde FK' },
        score: { fullTime: { home: null, away: null } }
      },
      // August 2025
      {
        id: 500017,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-08-03T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Bodø/Glimt' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500018,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-08-10T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Viking FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500019,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-08-17T19:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Vålerenga' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500020,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-08-24T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Lillestrøm' },
        score: { fullTime: { home: null, away: null } }
      },
      // September 2025
      {
        id: 500021,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-09-14T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Strømsgodset' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500022,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-09-21T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Brann' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500023,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-09-28T19:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Haugesund' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      // October 2025
      {
        id: 500024,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-10-05T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Sandefjord' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500025,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-10-19T17:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Tromsø' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500026,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-10-26T15:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Odd' },
        score: { fullTime: { home: null, away: null } }
      },
      // November 2025
      {
        id: 500027,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-11-02T14:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Sarpsborg 08' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500028,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-11-09T14:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'HamKam' },
        score: { fullTime: { home: null, away: null } }
      },
      {
        id: 500029,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-11-30T14:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Stabæk' },
        awayTeam: { name: 'Fredrikstad FK' },
        score: { fullTime: { home: null, away: null } }
      },
      // December 2025 - Season finale
      {
        id: 500030,
        competition: { name: 'Eliteserien' },
        utcDate: '2025-12-07T14:00:00Z',
        status: 'SCHEDULED',
        homeTeam: { name: 'Fredrikstad FK' },
        awayTeam: { name: 'Aalesund' },
        score: { fullTime: { home: null, away: null } }
      }
    ]
  },
  leagueTable: {
    standings: [
      {
        stage: 'REGULAR_SEASON',
        type: 'TOTAL',
        group: null,
        table: [
          {
            position: 1,
            team: { 
              name: 'Fredrikstad FK',
              id: 6956,
              crest: '../assets/images/fredrikstad.png'
            },
            playedGames: 27,
            won: 20,
            draw: 5,
            lost: 2,
            points: 65,
            goalsFor: 62,
            goalsAgainst: 20,
            goalDifference: 42
          },
          {
            position: 2,
            team: { 
              name: 'Bodø/Glimt',
              id: 6965,
              crest: '../assets/images/bodo-glimt.png'
            },
            playedGames: 27,
            won: 19,
            draw: 4,
            lost: 4,
            points: 61,
            goalsFor: 58,
            goalsAgainst: 24,
            goalDifference: 34
          },
          {
            position: 3,
            team: { 
              name: 'Molde FK',
              id: 450,
              crest: '../assets/images/molde.png'
            },
            playedGames: 27,
            won: 17,
            draw: 5,
            lost: 5,
            points: 56,
            goalsFor: 50,
            goalsAgainst: 26,
            goalDifference: 24
          },
          {
            position: 4,
            team: { 
              name: 'Rosenborg BK',
              id: 464,
              crest: '../assets/images/rosenborg.png'
            },
            playedGames: 27,
            won: 15,
            draw: 6,
            lost: 6,
            points: 51,
            goalsFor: 47,
            goalsAgainst: 28,
            goalDifference: 19
          },
          {
            position: 5,
            team: { 
              name: 'Brann',
              id: 337,
              crest: '../assets/images/brann.png'
            },
            playedGames: 27,
            won: 14,
            draw: 7,
            lost: 6,
            points: 49,
            goalsFor: 45,
            goalsAgainst: 30,
            goalDifference: 15
          },
          {
            position: 6,
            team: { 
              name: 'Viking FK',
              id: 1438,
              crest: '../assets/images/viking.png'
            },
            playedGames: 27,
            won: 13,
            draw: 8,
            lost: 6,
            points: 47,
            goalsFor: 43,
            goalsAgainst: 32,
            goalDifference: 11
          },
          {
            position: 7,
            team: { 
              name: 'Vålerenga',
              id: 1755,
              crest: '../assets/images/valerenga.png'
            },
            playedGames: 27,
            won: 12,
            draw: 8,
            lost: 7,
            points: 44,
            goalsFor: 40,
            goalsAgainst: 34,
            goalDifference: 6
          },
          {
            position: 8,
            team: { 
              name: 'Lillestrøm',
              id: 738,
              crest: '../assets/images/lillestrom.png'
            },
            playedGames: 27,
            won: 11,
            draw: 8,
            lost: 8,
            points: 41,
            goalsFor: 38,
            goalsAgainst: 36,
            goalDifference: 2
          },
          {
            position: 9,
            team: { 
              name: 'Strømsgodset',
              id: 896,
              crest: '../assets/images/stromsgodset.png'
            },
            playedGames: 27,
            won: 10,
            draw: 8,
            lost: 9,
            points: 38,
            goalsFor: 36,
            goalsAgainst: 38,
            goalDifference: -2
          },
          {
            position: 10,
            team: { 
              name: 'Sarpsborg 08',
              id: 917,
              crest: '../assets/images/sarpsborg.png'
            },
            playedGames: 27,
            won: 9,
            draw: 8,
            lost: 10,
            points: 35,
            goalsFor: 34,
            goalsAgainst: 40,
            goalDifference: -6
          },
          {
            position: 11,
            team: { 
              name: 'Haugesund',
              id: 1463,
              crest: '../assets/images/haugesund.png'
            },
            playedGames: 27,
            won: 8,
            draw: 8,
            lost: 11,
            points: 32,
            goalsFor: 32,
            goalsAgainst: 42,
            goalDifference: -10
          },
          {
            position: 12,
            team: { 
              name: 'Odd',
              id: 861,
              crest: '../assets/images/odd.png'
            },
            playedGames: 27,
            won: 7,
            draw: 8,
            lost: 12,
            points: 29,
            goalsFor: 30,
            goalsAgainst: 44,
            goalDifference: -14
          },
          {
            position: 13,
            team: { 
              name: 'Tromsø',
              id: 816,
              crest: '../assets/images/tromso.png'
            },
            playedGames: 27,
            won: 7,
            draw: 7,
            lost: 13,
            points: 28,
            goalsFor: 28,
            goalsAgainst: 46,
            goalDifference: -18
          },
          {
            position: 14,
            team: { 
              name: 'Sandefjord',
              id: 2540,
              crest: '../assets/images/sandefjord.png'
            },
            playedGames: 27,
            won: 6,
            draw: 8,
            lost: 13,
            points: 26,
            goalsFor: 26,
            goalsAgainst: 48,
            goalDifference: -22
          },
          {
            position: 15,
            team: { 
              name: 'HamKam',
              id: 843,
              crest: '../assets/images/hamkam.png'
            },
            playedGames: 27,
            won: 5,
            draw: 8,
            lost: 14,
            points: 23,
            goalsFor: 24,
            goalsAgainst: 50,
            goalDifference: -26
          },
          {
            position: 16,
            team: { 
              name: 'Aalesund',
              id: 532,
              crest: '../assets/images/aalesund.png'
            },
            playedGames: 27,
            won: 3,
            draw: 7,
            lost: 17,
            points: 16,
            goalsFor: 20,
            goalsAgainst: 54,
            goalDifference: -34
          }
        ]
      }
    ]
  },
  squad: {
    squad: [
      {
        id: 10001,
        name: 'Sample Player',
        position: 'Offence',
        dateOfBirth: '1995-01-01',
        nationality: 'Norway'
      }
    ]
  },
};

/**
 * Get team information
 * @param {string} teamId - Team ID
 * @returns {Promise<Object>} Team information
 */
function getTeamInfo(teamId = DEFAULT_TEAM_ID) {
  return apiClient.get(`/teams/${teamId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching team info:', error);
      throw error;
    });
}
getTeamInfo.mockData = mockData.team;

/**
 * Get upcoming fixtures for a team
 * @param {string} teamId - Team ID
 * @param {number} limit - Maximum number of fixtures to return
 * @returns {Promise<Object>} Upcoming fixtures
 */
function getUpcomingFixtures(teamId = DEFAULT_TEAM_ID, limit = 5) {
  return apiClient.get(`/teams/${teamId}/matches?status=SCHEDULED&limit=${limit}`)
    .then(response => {
      const fixtures = response.data.matches || [];
      return fixtures.slice(0, limit);
    })
    .catch(error => {
      console.error('Error fetching upcoming fixtures:', error);
      throw error;
    });
}
getUpcomingFixtures.mockData = mockData.upcomingFixtures;

/**
 * Get past matches for a team
 * @param {string} teamId - Team ID
 * @param {number} limit - Maximum number of matches to return
 * @returns {Promise<Object>} Past matches
 */
function getPastMatches(teamId = DEFAULT_TEAM_ID, limit = 5) {
  return apiClient.get(`/teams/${teamId}/matches?status=FINISHED&limit=${limit}`)
    .then(response => {
      const matches = response.data.matches || [];
      return matches.slice(0, limit);
    })
    .catch(error => {
      console.error('Error fetching past matches:', error);
      throw error;
    });
}
getPastMatches.mockData = mockData.pastMatches;

/**
 * Get all matches for the current season
 * @param {string} teamId - Team ID
 * @param {string} season - Season year (e.g., '2024')
 * @returns {Promise<Object>} All matches for the season
 */
function getSeasonMatches(teamId = DEFAULT_TEAM_ID, season = '2025') {
  return apiClient.get(`/teams/${teamId}/matches?season=${season}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching season matches:', error);
      throw error;
    });
}
getSeasonMatches.mockData = mockData.seasonMatches;

/**
 * Get team squad
 * @param {string} teamId - Team ID
 * @returns {Promise<Object>} Team squad
 */
function getTeamSquad(teamId = DEFAULT_TEAM_ID) {
  return apiClient.get(`/teams/${teamId}`)
    .then(response => response.data.squad || [])
    .catch(error => {
      console.error('Error fetching team squad:', error);
      throw error;
    });
}
getTeamSquad.mockData = mockData.squad;

/**
 * Get the league table for a specific competition
 * @param {string} competitionId - The ID of the competition
 * @returns {Promise<Object>} - The league table data
 */
function getLeagueTable(competitionId = DEFAULT_COMPETITION_ID) {
  return apiClient.get(`/competitions/${competitionId}/standings`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching league table:', error);
      throw error;
    });
}
getLeagueTable.mockData = mockData.leagueTable;

/**
 * Get all competitions
 * @returns {Promise<Object>} List of available competitions
 */
function getCompetitions() {
  return apiClient.get('/competitions')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching competitions:', error);
      throw error;
    });
}
getCompetitions.mockData = { competitions: [] };

/**
 * Get all teams in a competition
 * @param {string} competitionId - Competition ID
 * @returns {Promise<Object>} List of teams in the competition
 */
function getTeamsByCompetition(competitionId = DEFAULT_COMPETITION_ID) {
  return apiClient.get(`/competitions/${competitionId}/teams`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching teams by competition:', error);
      throw error;
    });
}
getTeamsByCompetition.mockData = { teams: [] };

export {
  getTeamInfo,
  getUpcomingFixtures,
  getPastMatches,
  getTeamSquad,
  getLeagueTable,
  getCompetitions,
  getTeamsByCompetition,
  getSeasonMatches
};
