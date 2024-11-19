import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hook/useAxios.js";

const BookForm = ({ initialData = {}, apiEndpoint, httpMethod = "POST" }) => {
  const [book, setBook] = useState({
    name: initialData.name || "",
    author: initialData.author || "",
    description: initialData.description || "",
    price: initialData.price || "",
    image: initialData.image || "",
    available: initialData.available || false,
  });

  const [imagePreview, setImagePreview] = useState(initialData.image || "");
  const { fetchData, loading, error } = useAxios();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setBook({ ...book, image: file });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBook({
        ...book,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(book).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(book);
    
    try {
      await fetchData(apiEndpoint, httpMethod, formData);
      navigate("/"); // Redirect on success
    } catch (err) {
      console.error("Submission failed:", err); // Optionally log for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 bg-white rounded shadow-md my-5">
      <h2 className="text-2xl mb-4 text-center">{httpMethod === "POST" ? "Add a New Book" : "Edit Book"}</h2>

      {/* Book Name */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Book Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          value={book.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Author */}
      {!initialData?.name && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="description"
          value={book.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          required
        />
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image Upload
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      {imagePreview && (
        <div className="mb-4">
          <img
            src={imagePreview}
            alt="Image Preview"
            className="w-full h-48 object-cover rounded border"
          />
        </div>
      )}

      {/* Available */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="available"
            checked={book.available}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Available</span>
        </label>
      </div>

      {loading && <h3 className="text-black">Submitting...</h3>}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error.message}
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
        type="submit"
      >
        {httpMethod === "POST" ? "Submit" : "Update"}
      </button>
    </form>
  );
};

export default BookForm;
