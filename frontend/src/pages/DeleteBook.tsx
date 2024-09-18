import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoArrowBackCircle } from "react-icons/io5";

function DeleteBook() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`http://localhost:5555/books/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refactor Needed
      navigate("/");
    },
    onError: (err) => console.log(err.message),
  });

  // Safeguard in case `id` is undefined
  if (!id) {
    return <p>No book ID found in the URL</p>;
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/">
          <IoArrowBackCircle className="text-[45px] hover:scale-110 duration-200 ease-in-out" />
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="bg-white text-black text-center p-3 rounded w-[350px] shadow-2xl flex flex-col items-center gap-5">
          <h2 className="text-xl">Are you sure you want to delete?</h2>
          <MdDelete
            onClick={() => mutation.mutate(id)}
            className="text-[35px] hover:cursor-pointer text-zinc-700 hover:scale-110 duration-200 ease-in-out"
          />
        </div>
      </div>
    </>
  );
}

export default DeleteBook;
