
import axios from "axios";
import { Post ,Get} from "./axiosService";
import * as axiosService from "./axiosService";



export const getProduct = async (payload) => {

  const queryString = new URLSearchParams(payload).toString();
  const response = await axiosService.Get(`/products?${queryString}`);
  return response.data;
};

export const getProductById = async (id) => {
 
  const response = await axiosService.Get(`/products/${id}`);
  return response.data;
};
