import React, { useState } from 'react';

/**
 * TeamLogo component displays a team's logo or a fallback with initials
 * @param {Object} props - Component props
 * @param {string} props.teamName - Name of the team
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.crest - URL to the team's crest image (not used when we have local images)
 * @returns {JSX.Element} - Rendered component
 */
function TeamLogo({ teamName, className = '', crest }) {
  const [imageError, setImageError] = useState(false);

  // Normalize team name to handle variations
  const normalizeTeamName = (name) => {
    // Handle specific team name variations
    if (name === 'Tromsø IL') return 'Tromsø';
    if (name === 'Hamarkameratene') return 'HamKam';
    return name;
  };

  const normalizedTeamName = normalizeTeamName(teamName);

  // Extract initials from team name for fallback
  const getInitials = (name) => {
    // Handle special cases
    if (name === 'Bodø/Glimt') return 'BG';
    if (name === 'KFUM Oslo') return 'KO';
    if (name === 'Hamarkameratene') return 'HK';
    
    // For other teams, get first letter of each word
    const words = name.split(' ');
    if (words.length === 1) {
      // For single word names, return first two letters
      return name.substring(0, 2).toUpperCase();
    }
    
    // For multi-word names, return first letter of each word (up to 2)
    return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
  };
  
  // Generate a consistent color based on the team name
  const getTeamColor = (name) => {
    // Normalize the name first
    const normalizedName = normalizeTeamName(name);
    
    // Specific team colors
    const teamColors = {
      'Fredrikstad FK': '#e11212', // Red
      'Bodø/Glimt': '#FDE900', // Yellow
      'Molde FK': '#0A2CFA', // Blue
      'Rosenborg BK': '#000000', // Black
      'Brann': '#FF0000', // Red
      'Viking FK': '#003399', // Dark Blue
      'Vålerenga': '#0033A0', // Blue
      'Lillestrøm': '#FFF200', // Yellow
      'Strømsgodset': '#0C2340', // Navy Blue
      'Sarpsborg 08': '#0046AD', // Blue
      'Haugesund': '#FFFFFF', // White
      'Odd': '#000000', // Black
      'Tromsø': '#FF0000', // Red
      'Sandefjord': '#0046AD', // Blue
      'HamKam': '#006633', // Green
      'Aalesund': '#FF5900', // Orange
      'Bryne FK': '#FF0000', // Red
      'Kristiansund BK': '#0046AD', // Blue
      'KFUM Oslo': '#003399', // Dark Blue
    };
    
    // Return specific team color or fallback to generated color
    if (teamColors[normalizedName]) {
      return teamColors[normalizedName];
    }
    
    // Fallback colors for any other teams
    const colors = [
      '#1e40af', '#b91c1c', '#4d7c0f', '#7e22ce', '#0e7490', 
      '#b45309', '#0f766e', '#be185d', '#4338ca', '#a16207'
    ];
    
    // Use a hash function to get a consistent index
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };
  
  // Get text color based on background color brightness
  const getTextColor = (bgColor) => {
    // For known light colors, use black text
    if (bgColor === '#FDE900' || bgColor === '#FFF200' || bgColor === '#FFFFFF') {
      return '#000000';
    }
    return '#FFFFFF'; // Default to white text
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
  
  const initials = getInitials(teamName);
  const bgColor = getTeamColor(teamName);
  
  // Use public directory for logos
  if (!imageError) {
    const logoPath = `/images/teams/${getTeamLogoFilename(teamName)}`;
    
    return (
      <img 
        src={logoPath}
        alt={`${teamName} logo`}
        className={`${className} w-5 h-5 object-contain`}
        onError={() => setImageError(true)}
      />
    );
  }
  
  // Fallback to colored circle with initials
  return (
    <div 
      className={`flex items-center justify-center font-semibold text-xs ${className}`}
      style={{ 
        backgroundColor: bgColor,
        color: getTextColor(bgColor),
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        flexShrink: 0,
        border: bgColor === '#FFFFFF' ? '1px solid #ccc' : 'none'
      }}
    >
      {initials}
    </div>
  );
}

export default TeamLogo;
