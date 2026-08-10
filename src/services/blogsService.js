import axiosInstance from "../api/api";

export const getBlogs = async () => {
  const response = await axiosInstance.get("/blogs");
  return response.data?.data || response.data || [];
};

export const getBlogById = async (id) => {
  const response = await axiosInstance.get(`/blog/${id}`);
  return response.data;
};
