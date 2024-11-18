import { useEffect, useState } from 'react';
import BookCard from './Card';
import useAxios from '../hook/useAxios';
import url from '../backendUrl.js';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const { error, loading, fetchData } = useAxios();

  useEffect(() => {
    const fetchDataFromApi = () => {
      fetchData(`${url}/books`)
        .then((data) => {
          setBooks(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDataFromApi();
  }, [fetchData]);

  const removeBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  const errorMessage = error ? error.message || 'An unexpected error occurred' : '';

  return (
    <div className="min-h-screen py-8 px-4 md:px-8 lg:px-16 ">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-white mb-6">All Books</h1>

      {loading && <p className="text-white text-center text-xl">Fetching Books...</p>}
      {error && <p className="text-red-500 text-center text-xl">{errorMessage}</p>}
      {!loading && !error && books.length === 0 && (
        <p className="text-white text-center text-xl">No Books Available.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <li key={book._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <BookCard book={book} onDelete={removeBook}/>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllBooks;