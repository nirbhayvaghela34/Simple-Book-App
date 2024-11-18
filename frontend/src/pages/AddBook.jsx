import BookForm from '../components/BookForm.jsx';
import url from '../backendUrl.js';

const AddBook = () => {
  return (
    <div>
      <BookForm apiEndpoint={`${url}/books`} />
    </div>
  );
};

export default AddBook;
