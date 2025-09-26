import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getImgUrl } from "../utils/getImgUrl";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(`/api/books?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setResults([]);
        setLoading(false);
      });
  }, [query]);

  if (!query) return <p className="p-4 text-lg">Please enter a search term.</p>;
  if (loading) return <p className="p-4 text-lg">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-600">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition group"
            >
              <img
                src={getImgUrl(book.coverImage) || "/fallback.jpg"}
                alt={book.title}
                className="h-48 w-full object-cover rounded-md mb-4 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-lg font-semibold line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{book.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
