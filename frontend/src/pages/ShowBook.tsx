import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import useGetBooks from "../hooks/useGetBooks";

function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: book, error, isLoading } = useGetBooks(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if `book` is an array or a single object
  if (Array.isArray(book)) {
    return <div>No book found</div>;
  }

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
