import { Delete } from "lucide-react";
import * as axiosService from "./axiosService";


export const UpdateUser = async (payload) => {
  const response = await axiosService.Put("/user/profile", payload); // use PUT as backend route
  return response.data;
};
export const UpdateAddress = async (addressId, payload) => {
  const response = await axiosService.Put(`/user/address/${addressId}`, payload);
  return response.data;
};


export const DeleteAddress = async (addressId) => {
  const response = await axiosService.Delete(`/user/address/${addressId}`);
  return response.data;
};

export const GetUser = async () => {
  const response = await axiosService.Get("/user/me");
  return response.data;
};