import { Get, Post } from "./axiosService";

const validTypes = ["Checkbox", "Radio", "Input", "Textarea", "Dropdown"];

/**
 * Get all questions (public).
 * API returns: { success: true, data: [{ _id, question, type, ... }] }
 * @returns {Promise<{ questions: Array<{ _id: string, question: string, type: string, options?: string[] }> }>}
 */
export const getQuestionsApi = async () => {
  const response = await Get("/questions");
  const raw = response.data?.data ?? response.data?.questions ?? response.data;
  const list = Array.isArray(raw) ? raw : [];
  const questions = list.filter((q) => q && validTypes.includes(q.type));
  return { questions };
};

/**
 * Submit answers. Creates Razorpay order for ₹499.
 * Body: [{ question: string, answer: string }]
 * @returns {Promise<{ razorpayOrderId: string, amount: number, key_id: string }>}
 */
export const submitAnswersApi = async (answers) => {
  const response = await Post("/questions/submit", answers);
  const data = response.data?.data ?? response.data;
  return {
    razorpayOrderId: data?.razorpayOrderId ?? data?.razorpay_order_id,
    amount: data?.amount ?? 499,
    key_id: data?.key_id ?? data?.keyId,
  };
};

/**
 * Verify Razorpay payment for internship submission.
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export const verifyQuestionsPaymentApi = async (payload) => {
  const response = await Post("/questions/verify-payment", payload);
  const data = response.data?.data ?? response.data;
  if (data?.success === false) {
    throw new Error(data?.message || "Payment verification failed");
  }
  return data;
};

export { validTypes };
