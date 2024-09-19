import { Link, useParams } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useUpdateBook from "../hooks/useUpdateBook";

const schema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  publishYear: z.number().min(1000),
});

export type FormData = z.infer<typeof schema>;

function EditBook() {
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Fetch the book data with useQuery
  // const { data: book, error, isLoading } = useGetBooks(id);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <div>Error: {error.message}</div>;

  // Mutation to update the book
  const updateBookMutation = useUpdateBook();

  // Form submission handler
  function onUpdate(formData: FormData) {
    updateBookMutation.mutate({ id, formData });
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/">
          <IoArrowBackCircle className="text-[45px] hover:scale-110 duration-200 ease-in-out" />
        </Link>
      </div>
      <div className="flex justify-center">
        <form
          className="bg-white text-black p-3 flex flex-col gap-5 rounded shadow-2xl w-[500px]"
          onSubmit={handleSubmit(onUpdate)}
        >
          <div>
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="custom-input"
            />
            {errors.title && (
              <p className="error-message">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="author" className="block">
              Author
            </label>
            <input
              id="author"
              type="text"
              {...register("author")}
              className="custom-input"
            />
            {errors.author && (
              <p className="error-message">{errors.author.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="publishYear" className="block">
              Publish Year
            </label>
            <input
              id="publishYear"
              type="number"
              {...register("publishYear", { valueAsNumber: true })}
              className="custom-input"
            />
            {errors.publishYear && (
              <p className="error-message">{errors.publishYear.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-customGreen text-white px-2 py-1 rounded hover:scale-105 duration-200 ease-in-out"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditBook;
