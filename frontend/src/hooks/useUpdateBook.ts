import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormData } from "../pages/EditBook";
import apiClient from "../services/api-client";

function useUpdateBook() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string | undefined;
      formData: FormData;
    }) => apiClient.put(`/books/${id}`, formData).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/");
    },
  });
}

export default useUpdateBook;
