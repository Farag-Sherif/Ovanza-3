import axiosInstance from "../api/api";

export const getItems = async () => {
  const response = await axiosInstance.get("/items");
  return response.data || [];
};

export const getItemById = async (id) => {
  const response = await axiosInstance.get(`/item/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axiosInstance.get("/cafes");
  return response.data || [];
};

export const findCategoryById = async (id) => {
  const response = await axiosInstance.post("/cafes/find", { id });
  return response.data;
};

export const getSubCategories = async () => {
  const response = await axiosInstance.get("/sub-cafes");
  return response.data || [];
};

export const findSubCategoryByCategoryId = async (id) => {
  const response = await axiosInstance.post("/sub_cafes/find", { id });
  return response.data || [];
};

export const getItemsBySubCategory = async (subCategoryId) => {
  const response = await axiosInstance.post("/items/sub_cafes", { id: subCategoryId });
  return response.data?.data || response.data || [];
};
