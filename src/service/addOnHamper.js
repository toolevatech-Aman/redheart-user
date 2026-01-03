import * as axiosService from "./axiosService";



export const getHamperProduct = async (category) => {
  const response = await axiosService.Get(`/addOn/category/${category}`);
  return response.data;
};
