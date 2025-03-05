import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import CursorEffect from './components/ui/cursor-effect';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ffkstats-theme">
      <div className="min-h-screen bg-background text-foreground">
        <CursorEffect />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
