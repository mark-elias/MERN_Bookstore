import { useQuery } from "@tanstack/react-query";
import { Book } from "../interfaces/Book";
import apiClient from "../services/api-client";

function useBooks(id?: string) {
  return useQuery<Book[] | Book, Error>({
    queryKey: id ? ["book", id] : ["books"], // Dynamic query key based on whether `id` is provided
    queryFn: () =>
      id
        ? apiClient.get<Book>(`/${id}`).then((res) => res.data) // Fetch a single book
        : apiClient.get<Book[]>("/").then((res) => res.data), // Fetch all books
    staleTime: 1 * 60 * 1000, // Adjust as needed
  });
}

export default useBooks;
