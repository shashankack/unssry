/**
 * Converts a string into a URL-friendly slug
 * @param {string} text - The text to slugify
 * @returns {string} - The slugified text
 */
export const slugify = (text) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Replace slashes with hyphens
    .replace(/\//g, '-')
    // Replace special characters with hyphens
    .replace(/[^\w\-]+/g, '-')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * Converts a slug back to a readable title (for reverse lookup if needed)
 * @param {string} slug - The slug to convert back
 * @returns {string} - The readable title
 */
export const unslugify = (slug) => {
  if (!slug) return '';
  
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
