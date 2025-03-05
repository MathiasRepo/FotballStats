import React, { useState } from 'react';
import { 
  getCompetitions, 
  getTeamsByCompetition, 
  getTeamInfo, 
  getLeagueTable 
} from '../services/api';

/**
 * Component for exploring the Football-Data.org API
 * Allows viewing available competitions, teams, and detailed data
 */
function ApiExplorer() {
  const [competitions, setCompetitions] = useState(null);
  const [teams, setTeams] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [leagueTable, setLeagueTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch all available competitions
  const fetchCompetitions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCompetitions();
      setCompetitions(data.competitions);
      setTeams(null);
      setTeamInfo(null);
      setLeagueTable(null);
      setSelectedCompetition(null);
      setSelectedTeam(null);
    } catch (err) {
      setError('Kunne ikke hente konkurranser: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch teams for a specific competition
  const fetchTeamsByCompetition = async (competitionId, competitionName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTeamsByCompetition(competitionId);
      setTeams(data.teams);
      setSelectedCompetition({ id: competitionId, name: competitionName });
      setTeamInfo(null);
      setSelectedTeam(null);
    } catch (err) {
      setError(`Kunne ikke hente lag for ${competitionName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed information for a specific team
  const fetchTeamInfo = async (teamId, teamName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTeamInfo(teamId);
      setTeamInfo(data);
      setSelectedTeam({ id: teamId, name: teamName });
    } catch (err) {
      setError(`Kunne ikke hente informasjon for ${teamName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch league table for a competition
  const fetchLeagueTable = async (competitionId, competitionName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLeagueTable(competitionId);
      setLeagueTable(data);
    } catch (err) {
      setError(`Kunne ikke hente tabell for ${competitionName}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Reset all data
  const resetData = () => {
    setCompetitions(null);
    setTeams(null);
    setTeamInfo(null);
    setLeagueTable(null);
    setSelectedCompetition(null);
    setSelectedTeam(null);
    setError(null);
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#e11212] dark:border-[#e11212]/50">
      <h2 className="text-2xl font-bold mb-4">API Utforsker</h2>
      <p className="mb-4 text-muted-foreground">
        Bruk dette verktøyet for å utforske tilgjengelige data fra Football-Data.org API
      </p>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={fetchCompetitions}
          className="bg-[#e11212] text-white px-4 py-2 rounded-md hover:bg-[#e11212]/90"
        >
          Vis Konkurranser
        </button>
        <button
          onClick={resetData}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-black/80"
        >
          Tilbakestill
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e11212]"></div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/20 text-destructive p-4 rounded-md mb-4">
          <p>{typeof error === 'object' ? (error.message || 'Unknown error') : error}</p>
        </div>
      )}

      {competitions && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tilgjengelige Konkurranser</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {competitions.map(competition => (
              <div 
                key={competition.id} 
                className="border border-gray-200 dark:border-gray-800 p-3 rounded-md hover:bg-[#e11212]/5 dark:hover:bg-[#e11212]/10 cursor-pointer"
                onClick={() => fetchTeamsByCompetition(competition.code || competition.id, competition.name)}
              >
                <div className="flex items-center">
                  {competition.emblem && (
                    <img src={competition.emblem} alt={competition.name} className="w-6 h-6 mr-2" />
                  )}
                  <span>{competition.name}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Kode: {competition.code || 'N/A'}, ID: {competition.id}
                </div>
                <div className="text-sm text-muted-foreground">
                  {competition.area?.name || 'Ukjent område'}
                </div>
                <button 
                  className="text-xs bg-black text-white px-2 py-1 rounded mt-2 hover:bg-black/80"
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchLeagueTable(competition.code || competition.id, competition.name);
                  }}
                >
                  Vis Tabell
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {leagueTable && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {leagueTable.competition?.name || 'Liga'} Tabell
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-2">Pos</th>
                  <th className="text-left py-2">Lag</th>
                  <th className="text-center py-2">K</th>
                  <th className="text-center py-2">V</th>
                  <th className="text-center py-2">U</th>
                  <th className="text-center py-2">T</th>
                  <th className="text-center py-2">MF</th>
                  <th className="text-center py-2">MM</th>
                  <th className="text-center py-2">MÅD</th>
                  <th className="text-right py-2">P</th>
                </tr>
              </thead>
              <tbody>
                {leagueTable.standings?.[0]?.table.map(entry => (
                  <tr key={entry.team.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-[#e11212]/5 dark:hover:bg-[#e11212]/10">
                    <td className="py-2">{entry.position}</td>
                    <td className="py-2">
                      <div className="flex items-center">
                        {entry.team.crest && (
                          <img src={entry.team.crest} alt={entry.team.name} className="w-5 h-5 mr-2" />
                        )}
                        <span 
                          className="cursor-pointer hover:underline"
                          onClick={() => fetchTeamInfo(entry.team.id, entry.team.name)}
                        >
                          {entry.team.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 text-center">{entry.playedGames}</td>
                    <td className="py-2 text-center">{entry.won}</td>
                    <td className="py-2 text-center">{entry.draw}</td>
                    <td className="py-2 text-center">{entry.lost}</td>
                    <td className="py-2 text-center">{entry.goalsFor}</td>
                    <td className="py-2 text-center">{entry.goalsAgainst}</td>
                    <td className="py-2 text-center">{entry.goalDifference}</td>
                    <td className="py-2 text-right font-semibold">{entry.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {teams && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Lag i {selectedCompetition?.name || 'Konkurranse'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {teams.map(team => (
              <div 
                key={team.id} 
                className="border border-gray-200 dark:border-gray-800 p-3 rounded-md hover:bg-[#e11212]/5 dark:hover:bg-[#e11212]/10 cursor-pointer"
                onClick={() => fetchTeamInfo(team.id, team.name)}
              >
                <div className="flex items-center">
                  {team.crest && (
                    <img src={team.crest} alt={team.name} className="w-8 h-8 mr-2" />
                  )}
                  <span>{team.name}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {team.area?.name || 'Ukjent område'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {teamInfo && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            {teamInfo.name} Informasjon
          </h3>
          <div className="bg-[#e11212]/5 dark:bg-[#e11212]/10 p-4 rounded-md">
            <div className="flex items-center mb-4">
              {teamInfo.crest && (
                <img src={teamInfo.crest} alt={teamInfo.name} className="w-16 h-16 mr-4" />
              )}
              <div>
                <h4 className="text-lg font-semibold">{teamInfo.name}</h4>
                <p className="text-muted-foreground">{teamInfo.area?.name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Grunnlagt</p>
                <p>{teamInfo.founded || 'Ukjent'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stadion</p>
                <p>{teamInfo.venue || 'Ukjent'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Farger</p>
                <p>{teamInfo.clubColors || 'Ukjent'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nettside</p>
                <a 
                  href={teamInfo.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#e11212] hover:underline"
                >
                  {teamInfo.website || 'Ikke tilgjengelig'}
                </a>
              </div>
            </div>
            
            {teamInfo.squad && teamInfo.squad.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Spillerstall</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-2">Navn</th>
                        <th className="text-left py-2">Posisjon</th>
                        <th className="text-left py-2">Nasjonalitet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamInfo.squad.map(player => (
                        <tr key={player.id} className="border-b border-gray-200 dark:border-gray-800">
                          <td className="py-2">{player.name}</td>
                          <td className="py-2">{player.position || 'Ukjent'}</td>
                          <td className="py-2">{player.nationality}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiExplorer;
