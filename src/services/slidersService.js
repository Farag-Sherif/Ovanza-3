import axiosInstance from "../api/api";

export const getSliders = async () => {
  const response = await axiosInstance.get("/sliders");
  return response.data || [];
};
