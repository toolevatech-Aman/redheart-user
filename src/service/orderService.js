import { Get, Post } from "./axiosService";

export const createOrderApi = async (orderData) => {
  const response = await Post('/orders', orderData);
  return response.data;
};

// Get orders for the logged-in user
export const getUserOrdersApi = async () => {
  const response = await Get('/orders/user'); // no userId needed
  return response.data;
};

export const verifyPaymentApi = async (paymentData) => {
  try {
    const response = await Post(
      "orders/verify-payment", // adjust this to your backend route
      paymentData
    );

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message || "Payment verification failed");
    }
  } catch (error) {
    console.error("verifyPaymentApi error:", error);
    throw error;
  }
};