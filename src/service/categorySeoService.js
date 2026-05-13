import { Get } from "./axiosService";

/**
 * Fetch SEO data for a category/subcategory page by its pageKey.
 * Returns null if not found.
 * @param {string} pageKey  e.g. "flowers/roses" or "flowers"
 */
export const getCategoryPageSeo = async (pageKey) => {
  try {
    const res = await Get(`/category-seo/page/${pageKey}`);
    return res.data?.data || null;
  } catch {
    return null;
  }
};
