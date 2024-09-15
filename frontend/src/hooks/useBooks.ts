import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Book {
  _id: string; // Changed to string to match MongoDB ObjectId
  title: string;
  author: string;
  publishYear: number;
  created: string;
  updated: string;
}
export interface BooksResponse {
  count: number;
  data: Book[];
}

function useBooks(id?: string) {
  return useQuery<BooksResponse, Error>({
    queryKey: id ? ["book", id] : ["books"],
    queryFn: () =>
      axios
        .get<BooksResponse>("http://localhost:5555/books", {
          params: {
            id: id,
          },
        })
        .then((res) => res.data),
    staleTime: 10 * 1000,
  });
}

export default useBooks;
