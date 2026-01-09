import * as axiosService from "./axiosService";



export const getHamperProduct = async (category) => {
  const response = await axiosService.Get(`/AddOn/category/${category}`);
  return response.data;
};

export const getAddOnProductExcept = async (category) => {
  const response = await axiosService.Get(`/AddOn/exclude/${category}`);
  return response.data;
};