import React from 'react';
import { isFredrikstadTeam } from '../lib/teamUtils';
import useApi from '../hooks/useApi';
import { getTeamTransfers } from '../services/sportsDbApi';
import { Button } from './ui/button';

/**
 * Component to display Fredrikstad FK transfers in a card with site-matching design
 * @returns {JSX.Element} TransfersCard component
 */
function TransfersCard() {
  // Use the API hook to fetch transfer data with useMockData set to false
  const { data, loading, error, refetch } = useApi(getTeamTransfers, [], [], false);
  
  // Log the data for debugging
  console.log('Transfer data:', data);
  
  // If data is available, filter transfers to only include those involving Fredrikstad FK
  const fredrikstadTransfers = data?.transfers ? data.transfers.filter(transfer => 
    isFredrikstadTeam(transfer.fromTeam) || isFredrikstadTeam(transfer.toTeam)
  ) : [];

  // Determine if a transfer is incoming or outgoing for Fredrikstad
  const isIncomingTransfer = (transfer) => {
    return isFredrikstadTeam(transfer.toTeam);
  };

  // Group transfers by season
  const groupedTransfers = fredrikstadTransfers.reduce((acc, transfer) => {
    const season = transfer.season || 'Unknown';
    if (!acc[season]) {
      acc[season] = [];
    }
    acc[season].push(transfer);
    return acc;
  }, {});

  // Sort seasons in descending order (newest first)
  const sortedSeasons = Object.keys(groupedTransfers).sort().reverse();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-white/10 dark:border-white/5 pb-2">
        <span className="text-xs font-medium text-red-500/80 dark:text-red-400/80">SISTE OVERGANGER</span>
        <span className="text-xs font-medium">Fredrikstad FK</span>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground mt-2">Laster overganger...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-red-500/50 mb-2">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
          <p className="text-muted-foreground">Kunne ikke laste overganger: {error.message}</p>
          <Button 
            onClick={refetch} 
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Prøv igjen
          </Button>
        </div>
      ) : fredrikstadTransfers.length > 0 ? (
        <div className="space-y-4">
          {sortedSeasons.map(season => (
            <div key={season} className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{season}</h3>
              {groupedTransfers[season].map(transfer => (
                <div key={transfer.id} className="flex items-center space-x-3 p-2 bg-white/5 dark:bg-white/2 rounded-lg">
                  <div className={`flex-shrink-0 w-8 h-8 ${isIncomingTransfer(transfer) ? 'bg-green-500/10' : 'bg-red-500/10'} rounded-full flex items-center justify-center`}>
                    {isIncomingTransfer(transfer) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{transfer.playerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {isIncomingTransfer(transfer) 
                        ? `Fra ${transfer.fromTeam}` 
                        : `Til ${transfer.toTeam}`}
                      {transfer.transferType === 'lån' && ' (Lån)'}
                    </p>
                  </div>
                  <div className={`text-xs font-medium ${isIncomingTransfer(transfer) ? 'text-green-500' : 'text-red-500'}`}>
                    {isIncomingTransfer(transfer) ? 'INN' : 'UT'}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-muted-foreground mb-2 opacity-50">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clipRule="evenodd" />
          </svg>
          <p className="text-muted-foreground">Ingen overganger funnet for Fredrikstad FK</p>
          <Button 
            onClick={refetch} 
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Oppdater
          </Button>
        </div>
      )}
    </div>
  );
}

export default TransfersCard;
