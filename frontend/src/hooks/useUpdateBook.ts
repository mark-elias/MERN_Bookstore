import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormData } from "../pages/EditBook";

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
    }) =>
      axios
        .put(`http://localhost:5555/books/${id}`, formData)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      navigate("/");
    },
  });
}

export default useUpdateBook;
