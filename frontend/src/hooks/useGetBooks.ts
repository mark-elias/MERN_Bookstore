import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Book } from "../interfaces/Book";

function useBooks(id?: string) {
  return useQuery<Book[] | Book, Error>({
    queryKey: id ? ["book", id] : ["books"], // Dynamic query key based on whether `id` is provided
    queryFn: () =>
      id
        ? axios
            .get<Book>(`http://localhost:5555/books/${id}`)
            .then((res) => res.data) // Fetch a single book
        : axios
            .get<Book[]>("http://localhost:5555/books")
            .then((res) => res.data), // Fetch all books
    staleTime: 10 * 1000, // Adjust as needed
  });
}

export default useBooks;
