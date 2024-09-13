import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Book {
  _id: number;
  title: string;
  author: string;
  publishYear: number;
}

function useBooks() {
  return useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: () =>
      axios
        .get<{ count: number; data: Book[] }>("http://localhost:5555/books")
        .then((res) => res.data.data),
    staleTime: 10 * 1000,
  });
}

export default useBooks;
