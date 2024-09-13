import useBooks from "../hooks/useBooks";

function HomePage() {
  const { data: books, error, isLoading } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        {books?.map((b, index) => (
          <li key={b._id}>
            {index + 1} {b.title} {b.author} {b.publishYear}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
