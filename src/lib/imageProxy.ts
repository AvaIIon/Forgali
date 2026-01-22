/**
 * Image proxy utility to handle CORS issues with external images
 * Uses a CORS proxy service to fetch images from bedsmart.ca
 */

/**
 * Get a proxied image URL that bypasses CORS restrictions
 * @param url - The original image URL
 * @returns Proxied URL that works cross-origin
 */
export const getProxiedImage = (url: string): string => {
  if (!url || !url.startsWith('http')) {
    return url || '/placeholder.svg';
  }

  // If it's already a local/relative URL, return as-is
  if (url.startsWith('/') || url.startsWith('./')) {
    return url;
  }

  // Use a CORS proxy service to bypass Cross-Origin-Resource-Policy restrictions
  try {
    const urlObj = new URL(url);
    
    // Only proxy bedsmart.ca images (or other external domains that might have CORS issues)
    if (urlObj.hostname.includes('bedsmart.ca') || urlObj.hostname.includes('myshopify.com')) {
      // Use images.weserv.nl as a CORS proxy
      // It automatically handles CORS headers and image optimization
      // Parameters:
      // - url: the image URL to proxy
      // - output: convert to webp for better performance
      // - il: ignore SSL certificate errors
      const proxyUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp&il`;
      return proxyUrl;
    }
    
    // For other domains, return original URL
    return url;
  } catch (error) {
    // If URL parsing fails, return original URL
    console.warn('Failed to parse image URL:', url, error);
    return url;
  }
};

/**
 * Get multiple proxied image URLs
 */
export const getProxiedImages = (urls: string[]): string[] => {
  return urls.map(url => getProxiedImage(url));
};
