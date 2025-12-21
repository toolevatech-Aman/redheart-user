// searchField → Search in name, description, slug, color

// color → Filter by product color

// subcategory_name → Filter by subcategory

// category_name → Filter by category

// festival_tags → Comma separated, e.g., Valentine's Day,Anniversary

// occasion_tags → Comma separated, e.g., Birthday,Get Well

// type → e.g., Arrangement relationship page limit

import axios from "axios";
import { Post ,Get} from "./axiosService";
import * as axiosService from "./axiosService";

// export const GetAllProducts = async () => {
//   try {

//     return response.data;
//   } catch (error) {

//     throw error;
//   }
// };

export const getProduct = async (payload) => {
  // Convert payload object to query string
  const queryString = new URLSearchParams(payload).toString();
  const response = await axiosService.Get(`/products?${queryString}`);
  return response.data;
};
