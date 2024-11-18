import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";
import useAxios from "../hook/useAxios";
import url from '../backendUrl.js';

function BookUpdate() {
  const [book, setBook] = useState(null); // Initially set to null
  const { id } = useParams();
  const { fetchData } = useAxios();

  useEffect(() => {
    fetchData(`${url}/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, id]);

  // Only render BookForm once the data is fetched
  if (!book) {
    return <p>Loading...</p>; // Optionally show a loading indicator
  }

  return (
    <div>
      <BookForm initialData={book} apiEndpoint={`${url}/books/${id}`} httpMethod="PATCH" />
    </div>
  );
}

export default BookUpdate;
