import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import CursorEffect from './components/ui/cursor-effect';
import HomePage from './pages/HomePage';
import SportsDbDemo from './pages/SportsDbDemo';
import HomePageWithAPI from './pages/HomePageWithAPI';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ffkstats-theme">
      <div className="min-h-screen bg-background text-foreground">
        <CursorEffect />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sportsdb-demo" element={<SportsDbDemo />} />
          <Route path="/api-home" element={<HomePageWithAPI />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
