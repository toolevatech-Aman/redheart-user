import { useParams, Navigate } from 'react-router-dom';
import { getCategoryUrl, toSlug } from './seoUtils';

/**
 * Redirects old /product/:category URLs to new SEO-friendly category URLs
 */
export const CategoryRedirect = () => {
  const { category } = useParams();
  return <Navigate to={getCategoryUrl(category)} replace />;
};

/**
 * Redirects old /product/:category/:productSlug URLs to new /p/:categorySlug/:productSlug format
 */
export const ProductRedirect = () => {
  const { category, productSlug } = useParams();
  const newUrl = `/p/${toSlug(category)}/${toSlug(productSlug)}`;
  return <Navigate to={newUrl} replace />;
};

