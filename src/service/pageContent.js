import { Get, Post } from "./axiosService";



export const getPageContentApi = async (page) => {
  if (!page) throw new Error("Page is required");

  const response = await Get(`/page-content?page=${page}`);
  return response.data; // { success: true, htmlCode: "<div>...</div>" }
};