/**
 * Capitalizes the first letter of a word or sentence
 */
export const capitalize = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Converts a slug to a readable title (e.g., 'ancient-egypt' -> 'Ancient Egypt')
 */
export const slugToTitle = (slug) => {
  if (!slug) return '';
  return slug
    .split('-')
    .map(capitalize)
    .join(' ');
};

/**
 * Trims and sanitizes user input
 */
export const cleanInput = (text) => {
  return (text || '').trim();
};

/**
 * Format date to a readable string
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};
