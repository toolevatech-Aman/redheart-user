// utils.js

/**
 * Format a date string into a readable format
 * e.g. "2026-01-10T12:34:56Z" => "Jan 10, 2026"
 * @param {string|Date} dateStr
 * @param {string} locale - optional, default "en-US"
 * @param {Object} options - optional Intl.DateTimeFormat options
 * @returns {string} formatted date
 */
export const formatDate = (dateStr, locale = "en-US", options) => {
  if (!dateStr) return "N/A";
  try {
    const date = new Date(dateStr);
    const defaultOptions = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(locale, options || defaultOptions);
  } catch (err) {
    console.error("Invalid date:", dateStr);
    return dateStr;
  }
};

/**
 * Return a CSS class for order status badges
 * e.g. status = "pending" => "bg-yellow-100 text-yellow-800"
 * @param {string} status
 * @returns {string} Tailwind CSS class string
 */
export const getOrderStatusColor = (status) => {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-grey-100 text-grey-800";
  }
};

/**
 * Capitalize the first letter of a string
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format currency
 * @param {number|string} amount
 * @param {string} locale
 * @param {string} currency
 * @returns {string}
 */
export const formatCurrency = (amount = 0, locale = "en-US", currency = "USD") => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }).format(Number(amount));
  } catch (err) {
    return amount;
  }
};
