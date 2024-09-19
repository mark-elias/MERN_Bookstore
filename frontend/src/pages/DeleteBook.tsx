import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useDeleteBook from "../hooks/useDeleteBook";

function DeleteBook() {
  // used for the mutation.mutate(id) function inside deleteHook
  // and not the delete hook itself
  const { id } = useParams<{ id: string }>();

  const mutation = useDeleteBook();

  return (
    <>
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
