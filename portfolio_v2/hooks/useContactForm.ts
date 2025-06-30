/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export function useContactForm() {
  return useMutation({
    mutationFn: async (formData: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      const res = await axios.post("/api/contact", formData);
      return res.data;
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error || "Failed to submit contact form"
      );
      throw new Error(
        error.response?.data?.error || "Failed to submit contact form"
      );
    },
  });
}
