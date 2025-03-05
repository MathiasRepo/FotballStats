/**
 * Combines multiple class names into a single string
 * @param {string[]} inputs - Class names to combine
 * @returns {string} Combined class names
 */
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Formats a date to a readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options
  };
  
  return new Date(date).toLocaleDateString(undefined, defaultOptions);
}

/**
 * Formats a time to a readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted time string
 */
function formatTime(date) {
  return new Date(date).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export { cn, formatDate, formatTime };
