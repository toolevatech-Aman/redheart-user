import { Get } from "./axiosService";

/**
 * Fetch city page SEO data for a given category + slug.
 * Returns null if the city page is not found (404).
 *
 * @param {string} category  "Flowers" | "Cakes" | "Plants"
 * @param {string} slug      URL slug, e.g. "bangalore"
 */
/**
 * Fetch all city pages for a given category (for delivery-cities page).
 * @param {string} category  "Flowers" | "Cakes" | "Plants"
 */
export const getCitiesByCategory = async (category) => {
  try {
    const res = await Get(`/city/public/${category}`);
    return res.data || [];
  } catch (err) {
    return [];
  }
};

export const getCityPage = async (category, slug) => {
  try {
    const res = await Get(`/city/page/${category}/${slug}`);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
};
