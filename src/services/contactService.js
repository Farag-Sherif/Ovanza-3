import axiosInstance from "../api/api";

export const sendContactMessage = async ({ formData, language = "en" }) => {
  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("email", formData.email);
  payload.append("subject", formData.subject);
  payload.append("message", formData.message);

  const response = await axiosInstance.post("/contact", payload, {
    headers: {
      "X-localization": language,
    },
  });

  return response.data;
};
