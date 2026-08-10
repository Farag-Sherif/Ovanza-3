import { useMutation } from "@tanstack/react-query";
import { sendContactMessage } from "../../services/contactService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useContactMutation(options = {}) {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: sendContactMessage,
    onMutate: async (newContactData) => {
      // Snapshot the previous value or state if applicable
      return { previousData: newContactData };
    },
    onError: (error, variables, context) => {
      console.error("Contact mutation failed:", error);
      toast.error(t("failed_to_send") || "Failed to send message. Please try again.");
      if (options.onError) {
        options.onError(error, variables, context);
      }
    },
    onSuccess: (data, variables, context) => {
      toast.success(t("message_sent_successfully") || "Your message has been sent successfully!");
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
}
