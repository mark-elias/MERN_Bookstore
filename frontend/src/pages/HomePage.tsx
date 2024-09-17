import useBooks, { Book } from "../hooks/useBooks";
import { IoInformationCircle } from "react-icons/io5";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();
  // const count = data?.count;
  // const books = data?.data;

  {
    console.log(books);
  }
  if (isLoading)
    return <span className="loading loading-ring loading-lg"></span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>HomePage</h1>
      <div className="flex justify-end mb-4">
        <Link to={`/books/create`}>
          <IoIosAddCircle className="text-[40px] text-customGreen" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto bg-white shadow-xl rounded-xl w-full md:w-[600px]">
          <table className="table w-full md:w-[600px]">
            <thead>
              <tr className="text-left bg-customDarkGreen">
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Published Year</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-black">
              {books?.map((b, index) => (
                <tr key={b._id} className="odd:bg-zinc-200">
                  <th>{index + 1}</th>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publishYear}</td>
                  <td className="px-2">
                    <Link to={`/books/details/${b._id}`}>
                      <IoInformationCircle className="text-2xl text-customGreen" />
                    </Link>
                  </td>
                  <td className="px-2">
                    <Link to={`/books/edit/${b._id}`}>
                      <MdModeEdit className="text-2xl text-customGreen" />
                    </Link>
                  </td>
                  <td className="px-2">
                    <Link to={`/books/delete/${b._id}`}>
                      <FaDeleteLeft className="text-2xl text-customGreen" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
