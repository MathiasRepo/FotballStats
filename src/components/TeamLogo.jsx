import React, { useState } from 'react';

/**
 * Normalizes team names for consistent handling
 * @param {string} teamName - The team name to normalize
 * @returns {string} - Normalized team name
 */
function normalizeTeamName(teamName) {
  if (!teamName) return '';
  
  return teamName
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/\./g, '')
    .trim();
}

/**
 * Gets initials from a team name
 * @param {string} teamName - The team name
 * @returns {string} - Team initials (up to 3 characters)
 */
function getInitials(teamName) {
  if (!teamName) return '';
  
  // Special case for teams with slashes like Bodø/Glimt
  if (teamName.includes('/')) {
    const parts = teamName.split('/');
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  
  // For teams with multiple words, get first letter of each word
  const words = teamName.split(' ');
  if (words.length > 1) {
    return words.map(word => word[0]).join('').toUpperCase().substring(0, 3);
  }
  
  // For single word teams, return first 3 letters
  return teamName.substring(0, 3).toUpperCase();
}

/**
 * Gets a color based on team name
 * @param {string} teamName - The team name
 * @returns {string} - CSS color class
 */
function getTeamColor(teamName) {
  if (!teamName) return 'bg-gray-500';
  
  const normalizedName = normalizeTeamName(teamName);
  
  // Color mapping for Norwegian teams
  const teamColors = {
    'fredrikstad': 'bg-red-600',
    'rosenborg': 'bg-black',
    'molde': 'bg-blue-600',
    'bodoe-glimt': 'bg-yellow-500',
    'brann': 'bg-red-700',
    'lillestroem': 'bg-yellow-600',
    'viking': 'bg-blue-800',
    'valerenga': 'bg-blue-700',
    'stromsgodset': 'bg-blue-500',
    'odd': 'bg-white',
    'sarpsborg': 'bg-blue-400',
    'haugesund': 'bg-white',
    'tromso': 'bg-red-500',
    'sandefjord': 'bg-blue-300',
    'kristiansund': 'bg-red-800',
    'hamkam': 'bg-green-600',
    'kfum-kameratene-oslo': 'bg-red-400',
    'mjondalen': 'bg-brown-500',
    'start': 'bg-yellow-400',
    'aalesund': 'bg-orange-500',
    'stabaek': 'bg-blue-900',
    'sogndal': 'bg-green-700',
    'ranheim': 'bg-blue-200',
    'ull-kisa': 'bg-yellow-300',
    'jerv': 'bg-yellow-800',
    'hoedd': 'bg-blue-100',
    'sandnes-ulf': 'bg-blue-400',
    'kongsvinger': 'bg-red-300',
    'raufoss': 'bg-yellow-700',
    'grorud': 'bg-green-500',
    'asane': 'bg-green-400',
    'stjordals-blink': 'bg-red-200',
    'strommen': 'bg-yellow-200',
    'arsenal': 'bg-red-600',
    'manchester-city': 'bg-blue-500',
    'liverpool': 'bg-red-700',
    'manchester-united': 'bg-red-800',
    'chelsea': 'bg-blue-700',
    'tottenham': 'bg-indigo-100',
    'newcastle': 'bg-black',
    'aston-villa': 'bg-purple-900',
    'brighton': 'bg-blue-400',
    'west-ham': 'bg-purple-700',
    'crystal-palace': 'bg-blue-600',
    'brentford': 'bg-red-500',
    'fulham': 'bg-white',
    'wolves': 'bg-yellow-600',
    'bournemouth': 'bg-red-600',
    'nottingham-forest': 'bg-red-700',
    'everton': 'bg-blue-800',
    'leicester': 'bg-blue-500',
    'leeds': 'bg-white',
    'southampton': 'bg-red-600',
  };
  
  return teamColors[normalizedName] || 'bg-gray-500';
}

/**
 * Maps a team name to its logo filename
 * @param {string} teamName - The team name
 * @returns {string} - Logo filename
 */
function getTeamLogoFilename(teamName) {
  if (!teamName) return '';
  
  // Special cases for team names that need specific mapping
  const specialCases = {
    'Bodø/Glimt': 'bodo-glimt.png',
    'Bodoe/Glimt': 'bodo-glimt.png',
    'Fredrikstad FK': 'fredrikstad.png',
    'Fredrikstad': 'fredrikstad.png',
    'Rosenborg BK': 'rosenborg.png',
    'Rosenborg': 'rosenborg.png',
    'Molde FK': 'molde.png',
    'Molde': 'molde.png',
    'SK Brann': 'brann.png',
    'Brann': 'brann.png',
    'Viking FK': 'viking.png',
    'Viking': 'viking.png',
    'Vålerenga': 'valerenga.png',
    'Valerenga': 'valerenga.png',
    'Lillestrøm SK': 'lillestrom.png',
    'Lillestrøm': 'lillestrom.png',
    'Lillestrom': 'lillestrom.png',
    'Strømsgodset': 'stromsgodset.png',
    'Stromsgodset': 'stromsgodset.png',
    'Odd BK': 'odd.png',
    'Odd': 'odd.png',
    'Sarpsborg 08': 'sarpsborg.png',
    'Sarpsborg': 'sarpsborg.png',
    'FK Haugesund': 'haugesund.png',
    'Haugesund': 'haugesund.png',
    'Tromsø IL': 'tromso.png',
    'Tromsø': 'tromso.png',
    'Tromso': 'tromso.png',
    'Sandefjord': 'sandefjord.png',
    'Kristiansund BK': 'kristiansund-bk-seeklogo.png',
    'Kristiansund': 'kristiansund-bk-seeklogo.png',
    'HamKam': 'hamkam.png',
    'Hamarkameratene': 'hamkam.png',
    'KFUM Oslo': 'kfum-kameratene-oslo-seeklogo.png',
    'KFUM': 'kfum-kameratene-oslo-seeklogo.png',
    'Aalesund': 'aalesund.png',
    'Aalesunds FK': 'aalesund.png',
    'Bryne FK': 'bryne-seeklogo.png',
    'Bryne': 'bryne-seeklogo.png',
  };
  
  // Return the special case if it exists
  if (specialCases[teamName]) {
    return specialCases[teamName];
  }
  
  // Otherwise normalize the name and add .png
  return normalizeTeamName(teamName) + '.png';
}

/**
 * TeamLogo component displays a team's logo with fallback to initials
 * @param {Object} props - Component props
 * @param {string} props.teamName - Name of the team
 * @param {string} props.crest - URL to team crest image (optional)
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Rendered component
 */
function TeamLogo({ teamName, crest, className = 'w-6 h-6' }) {
  const [imageError, setImageError] = useState(false);
  
  // If no team name or previous image error, show initials
  if (!teamName || imageError) {
    const initials = getInitials(teamName || '');
    const bgColor = getTeamColor(teamName || '');
    
    return (
      <div className={`flex items-center justify-center rounded-full text-white text-xs font-bold ${bgColor} ${className}`}>
        {initials}
      </div>
    );
  }
  
  // Try to load local image from public directory
  const logoFilename = getTeamLogoFilename(teamName);
  const logoPath = `/images/teams/${logoFilename}`;
  
  console.log(`Attempting to load local logo for ${teamName}:`, logoPath);
  
  return (
    <img 
      src={logoPath}
      alt={`${teamName} logo`}
      className={className}
      onError={(e) => {
        console.error('Error loading local image:', e.target.src);
        setImageError(true);
      }}
    />
  );
}

export default TeamLogo;
