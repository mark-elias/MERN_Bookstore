import { Link, useParams } from "react-router-dom";
import useBooks, { Book } from "../hooks/useBooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoArrowBackCircle } from "react-icons/io5";

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

  console.log(id);

  // const { data: book, error, isLoading } = useBooks(id);

  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;
  if (error) return <div>Error: {error.message}</div>;

  // Debugging output to check if 'created' and 'updated' are returned
  // console.log("Book data:", book);
  // console.log("Created:", book?.createdAt);
  // console.log("Updated:", book?.updatedAt);
  // Format the 'createdAt' and 'updatedAt' date fields
  const formattedCreated = book?.createdAt
    ? new Date(book.createdAt).toLocaleDateString()
    : "N/A";
  const formattedUpdated = book?.updatedAt
    ? new Date(book.updatedAt).toLocaleDateString()
    : "N/A";

  return (
    <div>
      <div className="mb-4">
        <Link to="/">
          <IoArrowBackCircle className="text-[45px] hover:scale-110 duration-200 ease-in-out" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="w-[400px] p-5 rounded shadow-2xl bg-white text-black text-center">
          <div className="text-center font-bold text-2xl border-b-2 border-customGreen">
            {book?.title}
          </div>
          <div className="my-3">
            <div>
              <span className="font-bold text-customGreen">Author: </span>
              {book?.author}
            </div>
            <div>
              <span className="font-bold text-customGreen">Publish Year: </span>
              {book?.publishYear}
            </div>
          </div>
          <div className="my-3">
            <div>
              <span className="font-bold text-customGreen">Created: </span>
              {formattedCreated}
            </div>
            <div>
              <span className="font-bold text-customGreen">Updated: </span>
              {formattedUpdated}
            </div>
          </div>
          <div>
            <span className="font-bold text-customGreen">ID: </span>
            {book?._id}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;
