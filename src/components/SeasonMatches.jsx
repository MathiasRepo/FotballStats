import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import TeamLogo from './TeamLogo';

// Placeholder data for matches
const placeholderMatches = {
  matches: [
    {
      id: 1,
      utcDate: '2024-04-01T18:00:00Z',
      status: 'FINISHED',
      matchday: 1,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Bodø/Glimt', crest: null },
      score: { fullTime: { home: 1, away: 2 } }
    },
    {
      id: 2,
      utcDate: '2024-04-07T15:00:00Z',
      status: 'FINISHED',
      matchday: 2,
      homeTeam: { name: 'Rosenborg BK', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 0, away: 1 } }
    },
    {
      id: 3,
      utcDate: '2024-04-14T17:00:00Z',
      status: 'FINISHED',
      matchday: 3,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Molde FK', crest: null },
      score: { fullTime: { home: 2, away: 2 } }
    },
    {
      id: 4,
      utcDate: '2024-04-21T19:00:00Z',
      status: 'FINISHED',
      matchday: 4,
      homeTeam: { name: 'Brann', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 1, away: 3 } }
    },
    {
      id: 5,
      utcDate: '2024-04-28T18:00:00Z',
      status: 'FINISHED',
      matchday: 5,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Viking FK', crest: null },
      score: { fullTime: { home: 2, away: 0 } }
    },
    {
      id: 6,
      utcDate: '2024-05-05T17:00:00Z',
      status: 'FINISHED',
      matchday: 6,
      homeTeam: { name: 'Vålerenga', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 1, away: 1 } }
    },
    {
      id: 7,
      utcDate: '2024-05-12T19:00:00Z',
      status: 'FINISHED',
      matchday: 7,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Lillestrøm', crest: null },
      score: { fullTime: { home: 3, away: 0 } }
    },
    {
      id: 8,
      utcDate: '2024-05-16T18:00:00Z',
      status: 'FINISHED',
      matchday: 8,
      homeTeam: { name: 'Strømsgodset', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 2, away: 2 } }
    },
    {
      id: 9,
      utcDate: '2024-05-19T17:00:00Z',
      status: 'FINISHED',
      matchday: 9,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Sarpsborg 08', crest: null },
      score: { fullTime: { home: 1, away: 0 } }
    },
    {
      id: 10,
      utcDate: '2024-05-26T19:00:00Z',
      status: 'FINISHED',
      matchday: 10,
      homeTeam: { name: 'Haugesund', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 0, away: 2 } }
    },
    {
      id: 11,
      utcDate: '2024-06-02T17:00:00Z',
      status: 'FINISHED',
      matchday: 11,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Tromsø', crest: null },
      score: { fullTime: { home: 2, away: 1 } }
    },
    {
      id: 12,
      utcDate: '2024-06-16T18:00:00Z',
      status: 'FINISHED',
      matchday: 12,
      homeTeam: { name: 'Sandefjord', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 1, away: 3 } }
    },
    {
      id: 13,
      utcDate: '2024-06-23T17:00:00Z',
      status: 'FINISHED',
      matchday: 13,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'HamKam', crest: null },
      score: { fullTime: { home: 4, away: 0 } }
    },
    {
      id: 14,
      utcDate: '2024-06-30T19:00:00Z',
      status: 'FINISHED',
      matchday: 14,
      homeTeam: { name: 'Bryne FK', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: 0, away: 1 } }
    },
    {
      id: 15,
      utcDate: '2024-07-07T17:00:00Z',
      status: 'FINISHED',
      matchday: 15,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Kristiansund BK', crest: null },
      score: { fullTime: { home: 2, away: 0 } }
    },
    {
      id: 16,
      utcDate: '2024-07-14T19:00:00Z',
      status: 'SCHEDULED',
      matchday: 16,
      homeTeam: { name: 'KFUM Oslo', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: null, away: null } }
    },
    {
      id: 17,
      utcDate: '2024-07-21T17:00:00Z',
      status: 'SCHEDULED',
      matchday: 17,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Bodø/Glimt', crest: null },
      score: { fullTime: { home: null, away: null } }
    },
    {
      id: 18,
      utcDate: '2024-07-28T17:00:00Z',
      status: 'SCHEDULED',
      matchday: 18,
      homeTeam: { name: 'Rosenborg BK', crest: null },
      awayTeam: { name: 'Fredrikstad FK', crest: null },
      score: { fullTime: { home: null, away: null } }
    },
    {
      id: 19,
      utcDate: '2024-08-04T17:00:00Z',
      status: 'SCHEDULED',
      matchday: 19,
      homeTeam: { name: 'Fredrikstad FK', crest: null },
      awayTeam: { name: 'Molde FK', crest: null },
      score: { fullTime: { home: null, away: null } }
    }
  ]
};

function SeasonMatches() {
  // State declarations
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 10;
  
  // Use placeholder data directly
  const data = placeholderMatches;

  // Group matches by month
  const groupedMatches = useMemo(() => {
    if (!data || !data.matches) {
      return {};
    }
    
    return data.matches.reduce((acc, match) => {
      const month = format(new Date(match.utcDate), 'MMMM yyyy');
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(match);
      return acc;
    }, {});
  }, [data]);

  // Sort matches by date
  const sortedMatches = useMemo(() => {
    const sorted = Object.values(groupedMatches).flat().sort((a, b) => {
      const dateA = new Date(a.utcDate);
      const dateB = new Date(b.utcDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  }, [groupedMatches, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedMatches.length / matchesPerPage);
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = sortedMatches.slice(indexOfFirstMatch, indexOfLastMatch);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
      {/* Decorative elements */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
      
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold tracking-tight flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-red-500">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            Sesongen 2025 Kamper
          </h2>
          <div className="flex items-center">
            <button 
              onClick={toggleSortOrder} 
              className="text-xs font-medium bg-white/5 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 dark:border-white/5 hover:bg-white/10 dark:hover:bg-white/15 transition-colors flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
                <path fillRule="evenodd" d="M2.24 6.8a.75.75 0 001.06-.04l1.95-2.1v8.59a.75.75 0 001.5 0V4.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0L2.2 5.74a.75.75 0 00.04 1.06zm8 6.4a.75.75 0 00-.04 1.06l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V6.75a.75.75 0 00-1.5 0v8.59l-1.95-2.1a.75.75 0 00-1.06-.04z" clipRule="evenodd" />
              </svg>
              <span>{sortOrder === 'asc' ? 'Eldste først' : 'Nyeste først'}</span>
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/5 bg-white/5 dark:bg-white/2 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10 dark:border-white/5 bg-white/10 dark:bg-white/5">
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Dato</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Hjemmelag</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12"></th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Bortelag</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Resultat</th>
                </tr>
              </thead>
              <tbody>
                {currentMatches.map((match) => (
                  <tr key={match.id} className="border-b border-white/5 transition-colors hover:bg-white/10 dark:hover:bg-white/5">
                    <td className="py-3 px-4 text-sm">
                      <div className="flex flex-col">
                        <span className="font-medium">{format(new Date(match.utcDate), 'dd MMM yyyy')}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(match.utcDate), 'HH:mm')}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end">
                        <span className={`font-medium truncate text-right ${match.homeTeam.name.includes('Fredrikstad') ? 'text-red-500 dark:text-red-400' : ''}`}>
                          {match.homeTeam.name.replace(' FK', '')}
                        </span>
                        <div className="w-8 h-8 ml-2 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                          <TeamLogo 
                            teamName={match.homeTeam.name} 
                            crest={match.homeTeam.crest}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-muted-foreground">vs</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
                          <TeamLogo 
                            teamName={match.awayTeam.name} 
                            crest={match.awayTeam.crest}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                        <span className={`font-medium truncate ${match.awayTeam.name.includes('Fredrikstad') ? 'text-red-500 dark:text-red-400' : ''}`}>
                          {match.awayTeam.name.replace(' FK', '')}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {match.status === 'FINISHED' ? (
                        <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-sm">
                          <span className={match.homeTeam.name.includes('Fredrikstad') && match.score.fullTime.home > match.score.fullTime.away ? 'text-green-500 dark:text-green-400 font-bold' : ''}>
                            {match.score.fullTime.home}
                          </span>
                          <span className="mx-1">-</span>
                          <span className={match.awayTeam.name.includes('Fredrikstad') && match.score.fullTime.home < match.score.fullTime.away ? 'text-green-500 dark:text-green-400 font-bold' : ''}>
                            {match.score.fullTime.away}
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium">
                          {match.status === 'SCHEDULED' ? 'PLANLAGT' : match.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => paginate(1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${
                currentPage === 1
                  ? 'border-white/5 bg-white/5 text-muted-foreground cursor-not-allowed'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 transition-colors'
              }`}
              aria-label="First page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border ${
                currentPage === 1
                  ? 'border-white/5 bg-white/5 text-muted-foreground cursor-not-allowed'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 transition-colors'
              }`}
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="flex items-center px-3 py-2 rounded-lg border border-white/10 bg-white/5">
              <span className="text-xs font-medium">
                {currentPage} / {totalPages}
              </span>
            </div>
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${
                currentPage === totalPages
                  ? 'border-white/5 bg-white/5 text-muted-foreground cursor-not-allowed'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 transition-colors'
              }`}
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => paginate(totalPages)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border ${
                currentPage === totalPages
                  ? 'border-white/5 bg-white/5 text-muted-foreground cursor-not-allowed'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 transition-colors'
              }`}
              aria-label="Last page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02zm6 0a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SeasonMatches;
