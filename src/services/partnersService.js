import axiosInstance from "../api/api";

export const getPartners = async () => {
  const response = await axiosInstance.get("/partners");
  return response.data || [];
};
