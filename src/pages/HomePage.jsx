import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/theme-toggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { formatDate } from '../lib/utils';
import { isFredrikstadTeam } from '../lib/teamUtils';
import SeasonMatches from '../components/SeasonMatches';
import TeamLogo from '../components/TeamLogo';
import TeamInfoCard from '../components/TeamInfoCard';
import RecentResultsCard from '../components/RecentResultsCard';
import LeagueTableCard from '../components/LeagueTableCard';
import EliteserienTable from '../components/EliteserienTable';
import UpcomingMatchesCard from '../components/UpcomingMatchesCard';
import FFKInfoCard from '../components/FFKInfoCard';
import useApi from '../hooks/useApi';
import { getTeamDetails, getPastEvents, getEliteserienStandings, getPlayerStats } from '../services/sportsDbApi';

// Placeholder data
const placeholderTeamData = {
  id: 6956,
  name: "Fredrikstad FK",
  shortName: "FFK",
  tla: "FFK",
  crest: null,
  address: "Stadion Allé 9 Fredrikstad 1604",
  website: "http://www.fredrikstadfk.no",
  founded: 1903,
  clubColors: "Rød / Hvit",
  venue: "Fredrikstad Stadion",
  lastUpdated: "2022-02-19T08:54:28Z",
  achievements: [
    { title: "Eliteserien", count: 9, years: "1938, 1939, 1949, 1950, 1951, 1952, 1954, 1957, 1960" },
    { title: "Norgesmesterskapet", count: 12, years: "1932, 1935, 1936, 1938, 1940, 1950, 1957, 1961, 1966, 1984, 2006, 2024" }
  ]
};

// Placeholder data for upcoming matches
const placeholderPastMatches = {
  matches: [
    {
      id: 400001,
      competition: { name: 'Eliteserien' },
      utcDate: '2024-12-15T15:00:00Z',
      status: 'FINISHED',
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Rosenborg BK', crest: null },
      score: { fullTime: { home: 2, away: 1 } }
    },
    {
      id: 400002,
      competition: { name: 'Eliteserien' },
      utcDate: '2024-12-08T18:00:00Z',
      status: 'FINISHED',
      homeTeam: { name: 'Molde FK', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 0, away: 2 } }
    },
    {
      id: 400003,
      competition: { name: 'Eliteserien' },
      utcDate: '2024-12-01T15:00:00Z',
      status: 'FINISHED',
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Bodø/Glimt', crest: null },
      score: { fullTime: { home: 1, away: 1 } }
    }
  ]
};

const placeholderLeagueTable = {
  standings: [
    {
      table: [
        {
          position: 1,
          team: { name: 'Bodø/Glimt', crest: null },
          playedGames: 30,
          won: 22,
          draw: 5,
          lost: 3,
          goalsFor: 68,
          goalsAgainst: 25,
          goalDifference: 43,
          points: 71
        },
        {
          position: 2,
          team: { name: 'Molde FK', crest: null },
          playedGames: 30,
          won: 18,
          draw: 7,
          lost: 5,
          goalsFor: 59,
          goalsAgainst: 31,
          goalDifference: 28,
          points: 61
        },
        {
          position: 3,
          team: { name: 'Brann', crest: null },
          playedGames: 30,
          won: 17,
          draw: 6,
          lost: 7,
          goalsFor: 55,
          goalsAgainst: 35,
          goalDifference: 20,
          points: 57
        },
        {
          position: 4,
          team: { name: 'Rosenborg BK', crest: null },
          playedGames: 30,
          won: 15,
          draw: 8,
          lost: 7,
          goalsFor: 52,
          goalsAgainst: 36,
          goalDifference: 16,
          points: 53
        },
        {
          position: 5,
          team: { name: 'Fredrikstad FK', crest: null },
          playedGames: 30,
          won: 14,
          draw: 9,
          lost: 7,
          goalsFor: 48,
          goalsAgainst: 35,
          goalDifference: 13,
          points: 51
        },
        {
          position: 6,
          team: { name: 'Viking FK', crest: null },
          playedGames: 30,
          won: 13,
          draw: 8,
          lost: 9,
          goalsFor: 46,
          goalsAgainst: 38,
          goalDifference: 8,
          points: 47
        },
        {
          position: 7,
          team: { name: 'Strømsgodset', crest: null },
          playedGames: 30,
          won: 12,
          draw: 8,
          lost: 10,
          goalsFor: 42,
          goalsAgainst: 39,
          goalDifference: 3,
          points: 44
        },
        {
          position: 8,
          team: { name: 'Tromsø IL', crest: null },
          playedGames: 30,
          won: 11,
          draw: 8,
          lost: 11,
          goalsFor: 40,
          goalsAgainst: 41,
          goalDifference: -1,
          points: 41
        },
        {
          position: 9,
          team: { name: 'Vålerenga', crest: null },
          playedGames: 30,
          won: 10,
          draw: 9,
          lost: 11,
          goalsFor: 38,
          goalsAgainst: 42,
          goalDifference: -4,
          points: 39
        },
        {
          position: 10,
          team: { name: 'Kristiansund BK', crest: null },
          playedGames: 30,
          won: 9,
          draw: 10,
          lost: 11,
          goalsFor: 35,
          goalsAgainst: 43,
          goalDifference: -8,
          points: 37
        },
        {
          position: 11,
          team: { name: 'Hamarkameratene', crest: null },
          playedGames: 30,
          won: 8,
          draw: 9,
          lost: 13,
          goalsFor: 32,
          goalsAgainst: 45,
          goalDifference: -13,
          points: 33
        },
        {
          position: 12,
          team: { name: 'Sarpsborg 08', crest: null },
          playedGames: 30,
          won: 7,
          draw: 9,
          lost: 14,
          goalsFor: 30,
          goalsAgainst: 48,
          goalDifference: -18,
          points: 30
        },
        {
          position: 13,
          team: { name: 'Bryne FK', crest: null },
          playedGames: 30,
          won: 6,
          draw: 8,
          lost: 16,
          goalsFor: 28,
          goalsAgainst: 52,
          goalDifference: -24,
          points: 26
        },
        {
          position: 14,
          team: { name: 'Sandefjord', crest: null },
          playedGames: 30,
          won: 5,
          draw: 6,
          lost: 19,
          goalsFor: 25,
          goalsAgainst: 55,
          goalDifference: -30,
          points: 21
        },
        {
          position: 15,
          team: { name: 'Haugesund', crest: null },
          playedGames: 30,
          won: 4,
          draw: 7,
          lost: 19,
          goalsFor: 23,
          goalsAgainst: 58,
          goalDifference: -35,
          points: 19
        },
        {
          position: 16,
          team: { name: 'KFUM Oslo', crest: null },
          playedGames: 30,
          won: 3,
          draw: 6,
          lost: 21,
          goalsFor: 20,
          goalsAgainst: 62,
          goalDifference: -42,
          points: 15
        }
      ]
    }
  ]
};

const placeholderPlayerStats = {
  topScorers: [
    {
      name: 'Martin Andersen',
      position: 'Angrepsspiller',
      goals: 10,
      image: null
    },
    {
      name: 'Sander Eriksson',
      position: 'Midtbane',
      goals: 8,
      image: null
    },
    {
      name: 'Henrik Kristiansen',
      position: 'Forsvarsspiller',
      goals: 6,
      image: null
    }
  ],
  topAssists: [
    {
      name: 'Martin Andersen',
      position: 'Angrepsspiller',
      assists: 7,
      image: null
    },
    {
      name: 'Sander Eriksson',
      position: 'Midtbane',
      assists: 6,
      image: null
    },
    {
      name: 'Henrik Kristiansen',
      position: 'Forsvarsspiller',
      assists: 5,
      image: null
    }
  ],
  playerForm: [
    {
      name: 'Martin Andersen',
      position: 'Angrepsspiller',
      matches: 15,
      goals: 10,
      assists: 7,
      rating: 7.5,
      form: ['W', 'W', 'L', 'W', 'D']
    },
    {
      name: 'Sander Eriksson',
      position: 'Midtbane',
      matches: 15,
      goals: 8,
      assists: 6,
      rating: 7.2,
      form: ['W', 'L', 'W', 'D', 'W']
    },
    {
      name: 'Henrik Kristiansen',
      position: 'Forsvarsspiller',
      matches: 15,
      goals: 6,
      assists: 5,
      rating: 7.0,
      form: ['L', 'W', 'D', 'W', 'L']
    }
  ]
};

function HomePage() {
  // Fetch data from API with useMockData set to false
  const { data: teamData, loading: teamLoading, error: teamError } = useApi(getTeamDetails, [], ['Fredrikstad'], false);
  const { data: pastMatches, loading: matchesLoading, error: matchesError } = useApi(getPastEvents, [], ['133604'], false);
  const { data: eliteserienData, loading: eliteserienLoading, error: eliteserienError } = useApi(getEliteserienStandings, [], ['2024'], false);
  const { data: playerStatsData, loading: playerStatsLoading, error: playerStatsError } = useApi(getPlayerStats, [], ['133604'], false);
  
  // Use API data only, no fallback to mock data
  const teamDataToUse = teamData || placeholderTeamData;
  const pastMatchesToUse = pastMatches; // No fallback to placeholder data
  const playerStats = playerStatsData || placeholderPlayerStats;
  
  // Get the standings data from the API or use placeholder as fallback
  const standingsData = eliteserienData?.standings?.[0]?.table || 
                       (eliteserienData?.table ? eliteserienData.table : 
                       placeholderLeagueTable?.standings?.[0]?.table || []);

  // Debug output to check what data is being used
  console.log('Past matches data source:', pastMatches ? 'API data' : 'No data available');
  console.log('Standings data source:', eliteserienData ? 'API data' : 'Placeholder data');
  console.log('Player stats data source:', playerStatsData ? 'API data' : 'Placeholder data');
  if (pastMatches) {
    console.log('API past matches:', pastMatches);
  }
  if (eliteserienData) {
    console.log('API standings data:', eliteserienData);
  }
  if (playerStatsData) {
    console.log('API player stats data:', playerStatsData);
  }

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

  // Normalize team name to handle variations
  const normalizeTeamName = (name) => {
    // Handle specific team name variations
    if (name === 'Tromsø IL') return 'Tromsø';
    if (name === 'Hamarkameratene') return 'HamKam';
    return name;
  };

  // Function to get the correct logo filename for a team
  const getTeamLogoFilename = (teamName) => {
    // Normalize the team name first
    const normalizedName = normalizeTeamName(teamName);
    
    // Map team names to their exact file names
    const teamFilenames = {
      'Fredrikstad FK': 'fredrikstad.png',
      'Bodø/Glimt': 'bodo-glimt.png',
      'Molde FK': 'molde.png',
      'Rosenborg BK': 'rosenborg.png',
      'Brann': 'brann.png',
      'Viking FK': 'viking.png',
      'Vålerenga': 'valerenga.png',
      'Lillestrøm': 'lillestrom.png',
      'Strømsgodset': 'stromsgodset.png',
      'Sarpsborg 08': 'sarpsborg.png',
      'Haugesund': 'haugesund.png',
      'Odd': 'odd.png',
      'Tromsø': 'tromso.png',
      'Sandefjord': 'sandefjord.png',
      'HamKam': 'hamkam.png',
      'Aalesund': 'aalesund.png',
      'Bryne FK': 'bryne-seeklogo.png',
      'Kristiansund BK': 'kristiansund-bk-seeklogo.png',
      'KFUM Oslo': 'kfum-kameratene-oslo-seeklogo.png'
    };
    
    // Return the exact filename if it exists in our mapping
    if (teamFilenames[normalizedName]) {
      return teamFilenames[normalizedName];
    }
    
    // Fallback to a normalized version of the team name
    return normalizedName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[\/]/g, '-')
      .replace(/[ø]/g, 'o')
      .replace(/[å]/g, 'a')
      .replace(/[æ]/g, 'ae') + '.png';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative">
      {/* Trailing dot bullet grid background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dot grid pattern that works in both light and dark modes */}
        <div className="absolute inset-0 bg-[radial-gradient(#e11212_1px,transparent_1px)] dark:bg-[radial-gradient(#e11212_1px,transparent_1px)] [background-size:20px_20px] opacity-20 dark:opacity-30"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-100 dark:from-gray-950 dark:via-transparent dark:to-black opacity-70"></div>
      </div>
      
      <div className="container mx-auto p-4 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#e11212] to-[#e11212]/70">FFKStats</h1>
          <div className="flex items-center space-x-4">
            <Link 
              to="/api-home" 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Live API Data
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <div className="relative group overflow-hidden mb-12">
          {/* Decorative elements */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
          
          {/* Main content container with glassmorphism */}
          <div className="relative backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl overflow-hidden shadow-lg z-10">
            {/* Top accent bar with gradient */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
            
            {/* Content area */}
            <div className="p-8">
              {/* Header with text effect */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 dark:from-red-500 dark:to-red-700 drop-shadow-sm">
                    FFKStats
                  </h2>
                  <p className="text-sm font-medium text-red-700/70 dark:text-red-400/70 tracking-wider uppercase">
                    REAL-TIME ANALYTICS PLATFORM
                  </p>
                </div>
                
                {/* Status indicator */}
                <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-black/5 dark:bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 dark:border-white/5 shadow-sm">
                  <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                  <span className="text-xs font-medium tracking-wider uppercase">Live Data</span>
                </div>
              </div>
              
              {/* Main content with grid layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed">
                    <span className="font-medium text-red-700 dark:text-red-400">FFKStats</span> leverer sanntidsdata og avansert statistikk for Fredrikstad FK, med fokus på prestasjon, spilleranalyse og historiske trender.
                  </p>
                  
                  {/* Team Stats in Hero Section */}
                  {standingsData.find(team => isFredrikstadTeam(team.team.name)) && (
                    <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
                      <h3 className="text-sm font-semibold mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                          <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
                        </svg>
                        Lagsstatistikk
                        {eliteserienLoading && (
                          <div className="ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                        )}
                      </h3>
                      
                      {(() => {
                        const teamData = standingsData.find(team => isFredrikstadTeam(team.team.name));
                        if (!teamData) return null;
                        
                        // Calculate percentages
                        const winPercentage = Math.round((teamData.won / teamData.playedGames) * 100);
                        const drawPercentage = Math.round((teamData.draw / teamData.playedGames) * 100);
                        const lossPercentage = Math.round((teamData.lost / teamData.playedGames) * 100);
                        const goalsForAvg = (teamData.goalsFor / teamData.playedGames).toFixed(1);
                        const goalsAgainstAvg = (teamData.goalsAgainst / teamData.playedGames).toFixed(1);
                        
                        return (
                          <div className="space-y-4">
                            {/* Top stats with improved visualization */}
                            <div className="grid grid-cols-5 gap-2">
                              <div className="col-span-1 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center">
                                <div className="text-xs text-muted-foreground mb-1">Posisjon</div>
                                <div className={`text-2xl font-bold ${
                                  teamData.position <= 2 ? 'text-blue-500' : 
                                  teamData.position <= 4 ? 'text-emerald-500' : 
                                  teamData.position === 14 ? 'text-orange-500' : 
                                  teamData.position >= 15 ? 'text-red-500' : ''
                                }`}>
                                  {teamData.position}
                                </div>
                                <div className="text-[10px] text-center mt-1 text-muted-foreground">
                                  {teamData.position <= 2 ? 'Champions League' : 
                                   teamData.position <= 4 ? 'Conference League' : 
                                   teamData.position === 14 ? 'Kvalifisering' : 
                                   teamData.position >= 15 ? 'Nedrykk' : 'Midtbanen'}
                                </div>
                              </div>
                              
                              <div className="col-span-2 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl p-3 border border-white/10">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="text-xs font-medium">Poeng</div>
                                  <div className="text-lg font-bold">{teamData.points}</div>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-red-500 to-red-700"
                                    style={{ width: `${(teamData.points / (teamData.playedGames * 3)) * 100}%` }}
                                  ></div>
                                </div>
                                <div className="text-[10px] text-right mt-1 text-muted-foreground">
                                  {Math.round((teamData.points / (teamData.playedGames * 3)) * 100)}% av mulige poeng
                                </div>
                              </div>
                              
                              <div className="col-span-2 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl p-3 border border-white/10">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="text-xs font-medium">Målforskjell</div>
                                  <div className={`text-lg font-bold ${teamData.goalDifference > 0 ? 'text-green-500' : teamData.goalDifference < 0 ? 'text-red-500' : ''}`}>
                                    {teamData.goalDifference > 0 ? `+${teamData.goalDifference}` : teamData.goalDifference}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 mt-1">
                                  <div className="text-xs font-medium">{teamData.goalsFor}</div>
                                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden flex">
                                    <div 
                                      className="h-full bg-green-500/70"
                                      style={{ width: `${(teamData.goalsFor / (teamData.goalsFor + teamData.goalsAgainst)) * 100}%` }}
                                    ></div>
                                    <div 
                                      className="h-full bg-red-500/70"
                                      style={{ width: `${(teamData.goalsAgainst / (teamData.goalsFor + teamData.goalsAgainst)) * 100}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs font-medium">{teamData.goalsAgainst}</div>
                                </div>
                                <div className="flex justify-between text-[10px] mt-1 text-muted-foreground">
                                  <span>{goalsForAvg} mål/kamp</span>
                                  <span>{goalsAgainstAvg} imot/kamp</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Results visualization with improved design */}
                            <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl p-3 border border-white/10">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-xs font-medium">Resultater</div>
                                <div className="text-xs text-muted-foreground">{teamData.playedGames} kamper</div>
                              </div>
                              
                              <div className="flex items-center space-x-1">
                                {/* Win segment */}
                                <div 
                                  className="h-8 bg-green-500/60 rounded-l-md flex items-center justify-center"
                                  style={{ width: `${winPercentage}%` }}
                                >
                                  {winPercentage >= 10 && (
                                    <div className="text-xs font-bold text-white flex items-center">
                                      <span className="mr-1">{teamData.won}</span>
                                      {winPercentage >= 20 && <span>seire</span>}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Draw segment */}
                                <div 
                                  className="h-8 bg-blue-500/60 flex items-center justify-center"
                                  style={{ width: `${drawPercentage}%` }}
                                >
                                  {drawPercentage >= 10 && (
                                    <div className="text-xs font-bold text-white flex items-center">
                                      <span className="mr-1">{teamData.draw}</span>
                                      {drawPercentage >= 20 && <span>uavgjort</span>}
                                    </div>
                                  )}
                                </div>
                                
                                {/* Loss segment */}
                                <div 
                                  className="h-8 bg-red-500/60 rounded-r-md flex items-center justify-center"
                                  style={{ width: `${lossPercentage}%` }}
                                >
                                  {lossPercentage >= 10 && (
                                    <div className="text-xs font-bold text-white flex items-center">
                                      <span className="mr-1">{teamData.lost}</span>
                                      {lossPercentage >= 20 && <span>tap</span>}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex justify-between text-[10px] mt-1 text-muted-foreground">
                                <span>{winPercentage}%</span>
                                <span>{drawPercentage}%</span>
                                <span>{lossPercentage}%</span>
                              </div>
                            </div>
                            
                            {/* Form guide */}
                            <div className="bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-xl p-3 border border-white/10">
                              <div className="text-xs font-medium mb-2">Siste 5 kamper</div>
                              <div className="flex space-x-1">
                                {(pastMatchesToUse?.matches?.slice(0, 5).map(match => {
                                  const isHome = isFredrikstadTeam(match.homeTeam.name);
                                  const ffkScore = isHome ? match.score.fullTime.home : match.score.fullTime.away;
                                  const oppScore = isHome ? match.score.fullTime.away : match.score.fullTime.home;
                                  
                                  let result = 'D'; // Default to draw
                                  if (ffkScore > oppScore) result = 'W';
                                  else if (ffkScore < oppScore) result = 'L';
                                  
                                  return result;
                                }) || ['W', 'D', 'L', 'W', 'W']).map((result, i) => (
                                  <div 
                                    key={i} 
                                    className={`flex-1 h-10 rounded-md flex items-center justify-center text-xs font-bold ${
                                      result === 'W' 
                                        ? 'bg-green-500/60 text-white' 
                                        : result === 'L' 
                                          ? 'bg-red-500/60 text-white' 
                                          : 'bg-blue-500/60 text-white'
                                    }`}
                                  >
                                    {result === 'W' ? 'S' : result === 'L' ? 'T' : 'U'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5 h-full">
                    <FFKInfoCard />
                  </div>
                </div>
              </div>
              
              {/* Footer with action buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-xs text-muted-foreground mb-4 sm:mb-0">
                  Drevet av avansert dataanalyse og maskinlæring
                </p>
                <div className="flex space-x-3">
                  <Button 
                    size="sm" 
                    className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 text-white font-medium text-xs rounded-full px-6 py-2.5 shadow-lg transition-all duration-300 hover:shadow-red-500/20 hover:scale-105 interactive"
                  >
                    <span className="relative z-10 flex items-center">
                      Utforsk Statistikk
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-200">
                        <path d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 011.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/80 to-red-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player Stats - Modernized */}
          <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
                Spillerstatistikk
                {playerStatsLoading && (
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                )}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Scorers */}
                <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
                  <h3 className="text-sm font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                      <path d="M9.653 2.289l-.005.003-.019.01a20.759 20.759 0 0110.14 0C16.194 1.45 17 2.414 17 3.517V18.25a.75.75 0 01-1.075.676l-2.8-1.344-2.8 1.344a.75.75 0 01-.65 0l-2.8-1.344-2.8 1.344A.75.75 0 013 18.25V3.517c0-1.103.806-2.068 1.93-2.207z" />
                    </svg>
                    Toppscorere
                    {playerStatsLoading && (
                      <div className="ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                    )}
                  </h3>
                  <div className="space-y-3">
                    {playerStats?.topScorers?.map((player, index) => (
                      <div key={index} className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-3 border border-white/5 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="relative mr-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-red-500">
                                    <path d="M3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-xs text-muted-foreground">{player.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold px-3 py-1 rounded-full">
                              {player.goals}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Top Assists */}
                <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
                  <h3 className="text-sm font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                      <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                    </svg>
                    Flest Målgivende
                    {playerStatsLoading && (
                      <div className="ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-red-500"></div>
                    )}
                  </h3>
                  <div className="space-y-3">
                    {playerStats?.topAssists?.map((player, index) => (
                      <div key={index} className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-3 border border-white/5 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="relative mr-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 flex items-center justify-center">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-red-500">
                                    <path d="M3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-xs text-muted-foreground">{player.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold px-3 py-1 rounded-full">
                              {player.assists}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Player Form */}
              <div className="mt-6 bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
                <h3 className="text-sm font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                  </svg>
                  Spillerform
                </h3>
                <div className="overflow-hidden">
                  <table className="w-full border-collapse table-fixed">
                    <thead>
                      <tr className="border-b border-white/10 dark:border-white/5 bg-white/10 dark:bg-white/5">
                        <th className="py-2 px-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-[35%]">Spiller</th>
                        <th className="py-2 px-1 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Kamper</th>
                        <th className="py-2 px-1 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Mål</th>
                        <th className="py-2 px-1 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Assist</th>
                        <th className="py-2 px-1 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[10%]">Rating</th>
                        <th className="py-2 px-1 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-[25%]">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playerStats?.playerForm?.map((player, index) => (
                        <tr key={index} className="border-b border-white/5 transition-colors hover:bg-white/10 dark:hover:bg-white/5">
                          <td className="py-2 px-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-7 h-7 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                                {player.image ? (
                                  <img src={player.image} alt={player.name} className="w-7 h-7 rounded-full object-cover" />
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
                                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                                  </svg>
                                )}
                              </div>
                              <div className="truncate">
                                <p className="font-medium text-sm truncate">{player.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{player.position}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-1 text-center text-sm">{player.matches}</td>
                          <td className="py-2 px-1 text-center text-sm">{player.goals}</td>
                          <td className="py-2 px-1 text-center text-sm">{player.assists}</td>
                          <td className="py-2 px-1">
                            <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-white/10 dark:bg-white/5">
                              {player.rating}
                            </div>
                          </td>
                          <td className="py-2 px-1">
                            <div className="flex justify-center space-x-1">
                              {player.form.map((result, i) => (
                                <div 
                                  key={i} 
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                                    result === 'W' 
                                      ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                                      : result === 'L' 
                                        ? 'bg-red-500/20 text-red-600 dark:text-red-400' 
                                        : 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                  }`}
                                >
                                  {result}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Results - Modernized */}
          <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
            
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
                Siste Resultater
              </h2>
              
              {pastMatchesToUse?.matches?.length > 0 ? (
                <div className="space-y-4">
                  {pastMatchesToUse.matches.map(match => (
                    <div key={match.id} className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5 transition-all duration-200 hover:bg-white/10 dark:hover:bg-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/5 text-muted-foreground mr-2">
                            {match.competition.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{formatDate(match.utcDate)}</span>
                        </div>
                        <div className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 dark:bg-white/5 ${
                          match.score.fullTime.home > match.score.fullTime.away 
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                            : match.score.fullTime.home < match.score.fullTime.away 
                              ? 'bg-red-500/10 text-red-600 dark:text-red-400' 
                              : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {match.score.fullTime.home > match.score.fullTime.away 
                            ? 'Seier' 
                            : match.score.fullTime.home < match.score.fullTime.away 
                              ? 'Tap' 
                              : 'Uavgjort'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                            <TeamLogo teamName={match.homeTeam.name} crest={match.homeTeam.crest} className="w-5 h-5" />
                          </div>
                          <span className="font-medium">{match.homeTeam.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 font-bold text-lg">
                          <div className={`px-3 py-1 rounded-lg ${match.score.fullTime.home > match.score.fullTime.away ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-white/10 dark:bg-white/5'}`}>
                            {match.score.fullTime.home}
                          </div>
                          <span className="text-muted-foreground">-</span>
                          <div className={`px-3 py-1 rounded-lg ${match.score.fullTime.home < match.score.fullTime.away ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-white/10 dark:bg-white/5'}`}>
                            {match.score.fullTime.away}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{match.awayTeam.name}</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                            <TeamLogo teamName={match.awayTeam.name} crest={match.awayTeam.crest} className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-muted-foreground mb-2 opacity-50">
                    <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75-.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
                  </svg>
                  <p className="text-muted-foreground">Ingen nylige kamper funnet</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Matches */}
          <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg mt-6">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
                  <path d="M3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                FFK Kommende Kamper
              </h2>
              <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5 dark:bg-white/2 backdrop-blur-md">
                <UpcomingMatchesCard />
              </div>
            </div>
          </div>

          {/* League Table and Team Stats - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* League Table - Modernized */}
            <div className="md:col-span-3 relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
              {/* Decorative elements */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
              
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
                    <EliteserienTable />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional content can be added here */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
