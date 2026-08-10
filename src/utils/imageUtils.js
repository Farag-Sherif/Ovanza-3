/**
 * Utility functions to normalize and reliably resolve image URLs from the Ovanza backend API.
 * Ensures direct HTTP 200 OK responses by avoiding the Apache 302 redirect on /images/ -> /ar/images/.
 */

const BASE_URL = "https://admin.ovanzacosmetics.com";
const DIRECT_IMAGES_PATH = "https://admin.ovanzacosmetics.com/ar/images/";
const FALLBACK_IMAGES_PATH = "https://admin.ovanzacosmetics.com/images/";

/**
 * Elegant dark luxury cosmetic placeholder (SVG Data URI) for true 404s.
 */
export const LUXURY_PRODUCT_PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600' fill='none'%3E%3Crect width='600' height='600' rx='24' fill='%23141414'/%3E%3Ccircle cx='300' cy='300' r='180' fill='%231a1a1a' stroke='%23333333' stroke-width='2' stroke-dasharray='4 4'/%3E%3Cpath d='M260 210H340V240H260V210Z' fill='%23444444' rx='4'/%3E%3Cpath d='M240 240H360C371 240 380 249 380 260V410C380 421 371 430 360 430H240C229 430 220 421 220 410V260C220 249 229 240 240 240Z' fill='%23222222' stroke='%23555555' stroke-width='2'/%3E%3Ccircle cx='300' cy='330' r='40' fill='%232a2a2a' stroke='%23666666' stroke-width='1.5'/%3E%3Ctext x='300' y='465' text-anchor='middle' fill='%23888888' font-family='sans-serif' font-size='14' letter-spacing='4'%3EOVANZA%3C/text%3E%3C/svg%3E";

/**
 * Normalizes any image URL or file name from the API to use the direct /ar/images/ path.
 *
 * @param {string} path - The raw image path or filename from the API
 * @returns {string} The fully qualified direct image URL
 */
export function normalizeImageUrl(path) {
  if (!path || typeof path !== "string") return "";

  let clean = path.trim();
  if (!clean) return "";

  // Upgrade insecure HTTP to HTTPS
  if (clean.startsWith("http://admin.ovanzacosmetics.com")) {
    clean = clean.replace("http://admin.ovanzacosmetics.com", "https://admin.ovanzacosmetics.com");
  }

  // If it points to the redirecting /images/ endpoint, point directly to /ar/images/
  if (clean.includes("admin.ovanzacosmetics.com/images/")) {
    return clean.replace("admin.ovanzacosmetics.com/images/", "admin.ovanzacosmetics.com/ar/images/");
  }

  // Already points to /ar/images/
  if (clean.includes("admin.ovanzacosmetics.com/ar/images/")) {
    return clean;
  }

  // If it's a full URL on another domain
  if (clean.startsWith("http://") || clean.startsWith("https://")) {
    return clean;
  }

  // If it starts with /ar/images/
  if (clean.startsWith("/ar/images/")) {
    return `${BASE_URL}${clean}`;
  }

  // If it starts with /images/
  if (clean.startsWith("/images/")) {
    return `${DIRECT_IMAGES_PATH}${clean.replace(/^\/images\//, "")}`;
  }

  // If it's just the filename (e.g. "1781174525939268068b807ae13.png")
  const fileName = clean.split("/").pop();
  return `${DIRECT_IMAGES_PATH}${fileName}`;
}

/**
 * Gets the primary or hovered display image for a product.
 *
 * @param {Object} product - The product item from the API
 * @param {boolean} isHovered - Whether the product card is currently hovered
 * @returns {string} Direct URL for the product image
 */
export function getProductImageUrl(product, isHovered = false) {
  if (!product) return LUXURY_PRODUCT_PLACEHOLDER;

  if (isHovered && Array.isArray(product.media) && product.media.length > 0 && product.media[0]?.image) {
    return normalizeImageUrl(product.media[0].image);
  }

  const primaryPath = product.image_path || product.image;
  if (primaryPath) {
    return normalizeImageUrl(primaryPath);
  }

  if (Array.isArray(product.media) && product.media.length > 0 && product.media[0]?.image) {
    return normalizeImageUrl(product.media[0].image);
  }

  return LUXURY_PRODUCT_PLACEHOLDER;
}

/**
 * Smart image error recovery handler that attempts alternative endpoints before fallback.
 *
 * @param {Event} e - Image onError synthetic event
 * @param {Object} [product] - Optional product data to attempt secondary image recovery
 */
export function handleImageError(e, product = null) {
  const img = e.target;
  const currentSrc = img.src || "";
  const retryCount = parseInt(img.dataset.retryCount || "0", 10);

  img.dataset.retryCount = String(retryCount + 1);

  // Retry 1: Try without /ar/ if /ar/ failed, or vice versa
  if (retryCount === 0) {
    if (currentSrc.includes("/ar/images/")) {
      img.src = currentSrc.replace("/ar/images/", "/images/");
      return;
    } else if (currentSrc.includes("/images/")) {
      img.src = currentSrc.replace("/images/", "/ar/images/");
      return;
    }
  }

  // Retry 2: If product has alternative media images, try the first media image
  if (retryCount === 1 && product?.media && product.media.length > 0) {
    const mediaImg = product.media[0]?.image;
    if (mediaImg) {
      const altUrl = normalizeImageUrl(mediaImg);
      if (altUrl && altUrl !== currentSrc) {
        img.src = altUrl;
        return;
      }
    }
  }

  // Final fallback: Luxury dark cosmetic silhouette SVG placeholder (no external third-party images)
  img.onerror = null;
  img.src = LUXURY_PRODUCT_PLACEHOLDER;
}
