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

  // Debugging output to check if 'created' and 'updated' are returned
  console.log("Book data:", book);
  console.log("Created:", book?.createdAt);
  console.log("Updated:", book?.updatedAt);
  // Format the 'createdAt' and 'updatedAt' date fields
  const formattedCreated = book?.createdAt
    ? new Date(book.createdAt).toLocaleDateString()
    : "N/A";
  const formattedUpdated = book?.updatedAt
    ? new Date(book.updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <div>
      <h1>Book Details</h1>
      <ul className="bg-customGreen w-[400px] p-2 rounded-2xl shadow-2xl">
        <li>ID: {book?._id}</li>
        <li>Title: {book?.title}</li>
        <li>Author: {book?.author}</li>
        <li>Publish Year: {book?.publishYear}</li>
        <li>Created: {formattedCreated}</li>
        <li>Updated: {formattedUpdated}</li>
      </ul>
    </div>
  );
}

export default BookDetailsPage;
