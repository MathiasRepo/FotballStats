/**
 * Utility functions for team-related operations
 */

/**
 * Checks if a team name represents Fredrikstad FK
 * @param {string} teamName - The team name to check
 * @returns {boolean} - True if the team is Fredrikstad FK, false otherwise
 */
function isFredrikstadTeam(teamName) {
  if (!teamName) return false;
  const name = teamName.toLowerCase();
  return name.includes('fredrikstad') || name === 'ffk' || name.includes('fredrikstad fk');
}

/**
 * Gets the position color based on league position
 * @param {number} position - The league position
 * @returns {string} - CSS class for the position color
 */
function getPositionColor(position) {
  if (position <= 2) return 'text-blue-500';
  if (position <= 4) return 'text-emerald-500';
  if (position === 14) return 'text-orange-500';
  if (position >= 15) return 'text-red-500';
  return '';
}

/**
 * Gets the position label based on league position
 * @param {number} position - The league position
 * @returns {string} - Label describing the position's significance
 */
function getPositionLabel(position) {
  if (position <= 2) return 'Champions League Kvalifisering';
  if (position <= 4) return 'Conference League Kvalifisering';
  if (position === 14) return 'Nedrykkskvalifikasjon';
  if (position >= 15) return 'Direkte Nedrykk';
  return '';
}

export { isFredrikstadTeam, getPositionColor, getPositionLabel };
