import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/theme-toggle';
import { Button } from '../components/ui/button';
import TeamInfoCard from '../components/TeamInfoCard';
import RecentResultsCard from '../components/RecentResultsCard';
import LeagueTableCard from '../components/LeagueTableCard';

/**
 * HomePage component using TheSportsDB API
 * @returns {JSX.Element} HomePage component
 */
function HomePageWithAPI() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            FFKStats
          </h1>
          <p className="text-muted-foreground mt-1">
            Fredrikstad FK Statistikk og Analyse <span className="text-red-500 font-medium">(Live API Data)</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/">
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            >
              Tilbake til Mockdata
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - 2/3 width on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero section */}
          <div className="relative overflow-hidden backdrop-blur-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-white/5 dark:to-white/2 border border-white/10 dark:border-white/5 rounded-2xl shadow-lg">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
            
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-700/50 via-red-500/50 to-red-700/50"></div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-3xl font-bold tracking-tight">
                    Velkommen til FFKStats
                  </h1>
                  <p className="text-muted-foreground mt-2 max-w-2xl">
                    Din ultimate kilde for statistikk, analyser og innsikt om Fredrikstad FK. 
                    Utforsk lagets prestasjoner, spillerstatistikk og kommende kamper.
                  </p>
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
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 011.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/80 to-red-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Team Info Card */}
          <TeamInfoCard />
          
          {/* Recent Results Card */}
          <RecentResultsCard />
        </div>
        
        {/* Right column - 1/3 width on large screens */}
        <div className="space-y-8">
          {/* League Table Card */}
          <LeagueTableCard />
        </div>
      </div>
    </div>
  );
}

export default HomePageWithAPI;
