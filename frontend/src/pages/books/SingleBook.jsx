import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  if (isLoading) return <div className="p-4 text-lg">Loading...</div>;
  if (isError || !book) return <div className="p-4 text-red-500">Failed to load book details.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Back to Results
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start bg-white shadow-lg p-6 rounded-lg">
        {/* Book Cover Image */}
        <div className="w-full md:w-[350px] flex-shrink-0">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book.category}
          </p>

          <p className="text-gray-700 mb-4">
            <strong>Price:</strong> INR {book.newPrice}
          </p>

          <p className="text-gray-700 mb-6">
            <strong>Description:</strong> {book.description}
          </p>

          <button
              onClick={() => handleAddToCart(book)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded flex items-center gap-2 transition"
            >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
