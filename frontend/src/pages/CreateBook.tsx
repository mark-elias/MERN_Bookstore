import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

const schema = z.object({
  title: z.string().min(3),
  author: z.string().min(3),
  publishYear: z.number().min(1000),
});

type FormData = z.infer<typeof schema>;

function CreateBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <>
      <div>CreateBook</div>
      <div className="flex justify-center">
        <form
          className="bg-white text-black p-3 flex flex-col gap-5 rounded shadow-2xl w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              className="block ring-1 ring-zinc-300 w-full rounded px-3 py-2"
            ></input>
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
              className="block ring-1 ring-zinc-300 w-full rounded px-3 py-2"
            ></input>
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
              className="block ring-1 ring-zinc-300 w-full rounded px-3 py-2"
            ></input>
            {errors.publishYear && (
              <p className="error-message">{errors.publishYear.message}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="bg-customGreen text-white px-2 py-1 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBook;
