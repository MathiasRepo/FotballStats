import React from 'react';
import TeamLogo from './TeamLogo';

function TeamStats({ teamData }) {
  if (!teamData) return null;
  
  // Calculate percentages
  const winPercentage = Math.round((teamData.won / teamData.playedGames) * 100);
  const drawPercentage = Math.round((teamData.draw / teamData.playedGames) * 100);
  const lossPercentage = Math.round((teamData.lost / teamData.playedGames) * 100);
  
  // Calculate home/away points (mock data since we don't have actual home/away splits)
  const homePoints = Math.round(teamData.points * 0.6); // Assuming 60% of points from home games
  const awayPoints = teamData.points - homePoints;
  
  return (
    <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg h-full">
      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
      
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
            <path d="M15.5 2A1.5 1.5 0 0014 3.5v13a1.5 1.5 0 001.5 1.5h1a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0016.5 2h-1zM9.5 6A1.5 1.5 0 008 7.5v9A1.5 1.5 0 009.5 18h1a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 6h-1zM3.5 10A1.5 1.5 0 002 11.5v5A1.5 1.5 0 003.5 18h1A1.5 1.5 0 006 16.5v-5A1.5 1.5 0 004.5 10h-1z" />
          </svg>
          Lagsstatistikk
        </h2>
        
        {/* Team Statistics Content */}
        <div className="space-y-4">
          {/* Team Overview Card */}
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4">
                <TeamLogo teamName={teamData.team.name} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{teamData.team.name}</h3>
                <p className="text-sm text-muted-foreground">Eliteserien 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-2 border border-white/5">
                <p className="text-xs text-muted-foreground">Posisjon</p>
                <p className="text-xl font-bold">{teamData.position}</p>
              </div>
              <div className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-2 border border-white/5">
                <p className="text-xs text-muted-foreground">Poeng</p>
                <p className="text-xl font-bold">{teamData.points}</p>
              </div>
              <div className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-2 border border-white/5">
                <p className="text-xs text-muted-foreground">Målforskjell</p>
                <p className="text-xl font-bold">{teamData.goalDifference > 0 ? `+${teamData.goalDifference}` : teamData.goalDifference}</p>
              </div>
            </div>
          </div>
          
          {/* Results Breakdown */}
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                <path fillRule="evenodd" d="M1 2.75A.75.75 0 011.75 2h16.5a.75.75 0 010 1.5H18v8.75A2.75 2.75 0 0115.25 15h-1.072l.798 3.06a.75.75 0 01-1.452.38L13.41 15H6.59l-.114 3.44a.75.75 0 01-1.452-.38L5.823 15H4.75A2.75 2.75 0 012 12.25V3.5h-.25A.75.75 0 011 2.75zM7.373 15l-.391 1.5h6.037l-.392-1.5H7.373zM13.25 5a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5a.75.75 0 01.75-.75zm-6.5 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 016.75 9zm3.25-2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 7z" clipRule="evenodd" />
              </svg>
              Resultatfordeling
            </h3>
            
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm">Seire</div>
              <div className="flex-1 h-6 bg-white/5 dark:bg-white/2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500/50 flex items-center justify-end pr-2 text-xs font-bold"
                  style={{ width: `${winPercentage}%` }}
                >
                  {teamData.won}
                </div>
              </div>
              <div className="w-10 text-xs text-right">{winPercentage}%</div>
            </div>
            
            <div className="flex items-center mb-2">
              <div className="w-16 text-sm">Uavgjort</div>
              <div className="flex-1 h-6 bg-white/5 dark:bg-white/2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500/50 flex items-center justify-end pr-2 text-xs font-bold"
                  style={{ width: `${drawPercentage}%` }}
                >
                  {teamData.draw}
                </div>
              </div>
              <div className="w-10 text-xs text-right">{drawPercentage}%</div>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 text-sm">Tap</div>
              <div className="flex-1 h-6 bg-white/5 dark:bg-white/2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/50 flex items-center justify-end pr-2 text-xs font-bold"
                  style={{ width: `${lossPercentage}%` }}
                >
                  {teamData.lost}
                </div>
              </div>
              <div className="w-10 text-xs text-right">{lossPercentage}%</div>
            </div>
          </div>
          
          {/* Goals Analysis */}
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                <path d="M12.75 2a.75.75 0 00-.75.75v13.5a.75.75 0 001.5 0V2.75a.75.75 0 00-.75-.75zm-8.5 4a.75.75 0 00-.75.75v9.5a.75.75 0 001.5 0v-9.5a.75.75 0 00-.75-.75zm4.25-2a.75.75 0 00-.75.75v11.5a.75.75 0 001.5 0V4.75a.75.75 0 00-.75-.75z" />
              </svg>
              Målanalyse
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-3 border border-white/5 text-center">
                <p className="text-xs text-muted-foreground mb-1">Mål scoret</p>
                <p className="text-2xl font-bold text-green-500">{teamData.goalsFor}</p>
                <p className="text-xs text-muted-foreground">{(teamData.goalsFor / teamData.playedGames).toFixed(1)} per kamp</p>
              </div>
              <div className="bg-white/5 dark:bg-white/2 backdrop-blur-sm rounded-lg p-3 border border-white/5 text-center">
                <p className="text-xs text-muted-foreground mb-1">Mål sluppet inn</p>
                <p className="text-2xl font-bold text-red-500">{teamData.goalsAgainst}</p>
                <p className="text-xs text-muted-foreground">{(teamData.goalsAgainst / teamData.playedGames).toFixed(1)} per kamp</p>
              </div>
            </div>
          </div>
          
          {/* Home vs Away Performance */}
          <div className="bg-white/5 dark:bg-white/2 backdrop-blur-md rounded-xl p-4 border border-white/5">
            <h3 className="text-sm font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1 text-red-500">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              Hjemme vs. Borte
            </h3>
            
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">Hjemme</div>
              <div className="text-sm font-medium">Borte</div>
            </div>
            
            <div className="h-6 bg-white/5 dark:bg-white/2 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-gradient-to-r from-red-600/50 to-red-500/50 flex items-center justify-center text-xs font-bold"
                style={{ width: `${Math.round((homePoints / teamData.points) * 100)}%` }}
              >
                {homePoints} p
              </div>
              <div 
                className="h-full bg-gradient-to-r from-red-500/30 to-red-400/30 flex items-center justify-center text-xs font-bold"
                style={{ width: `${Math.round((awayPoints / teamData.points) * 100)}%` }}
              >
                {awayPoints} p
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamStats;
