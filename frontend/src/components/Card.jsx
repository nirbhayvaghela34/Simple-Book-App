import { useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios";
import url from "../backendUrl.js";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();
  const { fetchData, error, loading } = useAxios();

  function handleDelete() {
    fetchData(`${url}/books/${book._id}`, "DELETE")
      .then(() => {
        onDelete(book._id);
        console.log("Book Deleted Successfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdate() {
    navigate(`/books/${book._id}`);
  }

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200">
      {/* Book Image */}
      <div className="h-64 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={book.image}
          alt={book.title || "Book Image"}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image"; // Fallback image
          }}
        />
      </div>

      {/* Book Details */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-gray-900 font-bold text-xl sm:text-2xl mb-2 truncate">
          {book.name}
        </h2>

        {/* Author */}
        <p className="text-gray-700 text-sm sm:text-base mb-2">
          <strong>By:</strong> {book.author}
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 truncate">
          {book.description}
        </p>

        {/* Price */}
        <p className="text-green-600 font-semibold text-lg sm:text-xl mb-4">
          ₹{book.price}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white text-sm sm:text-base font-medium rounded hover:bg-red-600 transition duration-200 w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
      {loading && <p className="text-center text-blue-500 mt-2">Deleting...</p>}
      {error && (
        <p className="text-center text-red-500 mt-2">
          {error.message || "An error occurred"}
        </p>
      )}
    </div>
  );
};

export default BookCard;
