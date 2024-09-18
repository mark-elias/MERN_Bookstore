import useBooks from "../hooks/useBooks";
import { IoInformationCircle } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
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
      <div className="flex justify-end mb-4">
        <Link to={`/books/create`}>
          <IoIosAddCircle className="text-[45px] hover:scale-110 duration-200 ease-in-out" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="overflow-x-auto bg-white shadow-xl rounded w-full md:w-[600px]">
          <table className="table w-full md:w-[600px]">
            <thead>
              <tr className="text-left bg-customGreen h-[40px]">
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
                <tr key={b._id} className="odd:bg-zinc-200 h-[35px]">
                  <th className="w-[30px]">{index + 1}</th>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.publishYear}</td>
                  <td className="px-1">
                    <Link to={`/books/details/${b._id}`}>
                      <IoInformationCircle className="text-2xl text-zinc-700 hover:scale-110 duration-200 ease-in-out" />
                    </Link>
                  </td>
                  <td className="px-1">
                    <Link to={`/books/edit/${b._id}`}>
                      <MdModeEdit className="text-2xl text-zinc-700 hover:scale-110 duration-200 ease-in-out" />
                    </Link>
                  </td>
                  <td className="px-1">
                    <Link to={`/books/delete/${b._id}`}>
                      <MdDelete className="text-2xl text-zinc-700 hover:scale-110 duration-200 ease-in-out" />
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
