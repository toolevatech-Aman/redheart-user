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