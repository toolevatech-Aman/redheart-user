import { Get } from "./axiosService";

/**
 * Fetch city page SEO data for a given category + slug.
 * Returns null if the city page is not found (404).
 *
 * @param {string} category  "Flowers" | "Cakes" | "Plants"
 * @param {string} slug      URL slug, e.g. "bangalore"
 */
export const getCityPage = async (category, slug) => {
  try {
    const res = await Get(`/city/page/${category}/${slug}`);
    return res.data;
  } catch (err) {
    if (err?.response?.status === 404) return null;
    throw err;
  }
};
