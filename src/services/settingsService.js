import axiosInstance from "../api/api";

export const getSettings = async () => {
  const response = await axiosInstance.get("/settings");
  return response.data;
};
