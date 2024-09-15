import { useParams } from "react-router-dom";
import useBooks, { Book, BooksResponse } from "../hooks/useBooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function BookDetailsPage() {
  const { id } = useParams<{ id: string | undefined }>();

  const {
    data: book,
    error,
    isLoading,
  } = useQuery<Book, Error>({
    queryKey: ["book", id],
    queryFn: () =>
      axios
        .get<Book>(`http://localhost:5555/books/${id}`)
        .then((res) => res.data),
    staleTime: 10 * 1000,
  });

  // const { data, error, isLoading } = useBooks(id);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Book Details</h1>
      <ul>
        <li>{book?._id}</li>
        <li>{book?.title}</li>
        <li>{book?.author}</li>
        <li>{book?.publishYear}</li>
        <li>{book?.created}</li>
        <li>{book?.updated}</li>
      </ul>
    </div>
  );
}

export default BookDetailsPage;
