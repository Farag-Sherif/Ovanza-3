import axiosInstance from "../api/api";

export const getSocials = async () => {
  const response = await axiosInstance.get("/socails");
  return response.data || [];
};
