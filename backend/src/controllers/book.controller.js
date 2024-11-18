import { Book } from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteImageFromCloudinary } from "../utils/deleteImageFromCloudinary.js";

//publishBook, delete book, update book detail
const getBooks = asyncHandler(async (req, res) => {
  // const { n } = req.params;

  // if (!n || typeof n !== 'number' || n <= 0) {
  //   throw new ApiError(400, "Please provide a valid number of books to fetch.");
  // }

  // try {
  //   const books = await Book.aggregate([
  //     { $sample: { size: n } } // Randomly select 'n' books
  //   ]);

  //   if (books.length === 0) {
  //     throw new ApiError(404, "No books found.");
  //   }

  //   return res
  //     .status(200)
  //     .json(new ApiResponse(200, books, `${n} random books fetched successfully.`));
  // } catch (error) {
  //   throw new ApiError(500, "Error fetching books.", error.message);
  // }

  const books = await Book.find();
  if (!books) {
    throw new ApiError(404, "No books found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, books, `Books fetched successfully.`)
    );
});

const addBook = asyncHandler(async (req, res) => {
  const { name, author, description, price, available } = req.body;
  console.log(req.body);
  
  if (!name || !author || !description || !price) {
     throw new ApiError(404, "Please fill all credentials.");
  }

  const bookImageFilePath = req.file?.path;
  console.log(req.file);
  if (!bookImageFilePath) {
    throw new ApiError(404, "Please provide image of book.");
  }

  const bookImage = await uploadOnCloudinary(bookImageFilePath);

  const existedBook = await Book.findOne({
    name,
  });
  if (existedBook) {
    throw new ApiError(404, "This book is Already exits.You can updat.");
  }

  const book = await Book.create({
    name,
    author,
    description,
    price,
    image: bookImage.url,
    available: !available && true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, book, "New book added to account."));
});

const updateBookDetails = asyncHandler(async (req, res) => {
  const { bookId } = req.params;
  const { name, description, price } = req.body;
  const newBookImagePath = req.file?.path;

  // Validate if at least one detail is provided
  if (!name && !description && !price && !newBookImagePath) {
    throw new ApiError(400, "Please provide at least one detail to update.");
  }

  // Find book by ID
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Book not found.");
  }

  // Handle new image upload if provided
  if (newBookImagePath) {
    try {
      const newBookImage = await uploadOnCloudinary(newBookImagePath);
      if (!newBookImage) {
        throw new ApiError(500, "Failed to upload book image to Cloudinary.");
      }

      const deletedBook = await deleteImageFromCloudinary(book.image);
      if (!deletedBook.success) {
        throw new ApiError(
          500,
          "Failed to delete old book image from Cloudinary."
        );
      }

      book.image = newBookImage.url;
    } catch (error) {
      throw new ApiError(500, "Image upload or deletion failed.");
    }
  }

  // Update only provided fields
  if (name !== undefined) book.name = name;
  if (description !== undefined) book.description = description;
  if (price !== undefined) book.price = price;

  await book.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book details updated successfully."));
});

const deleteBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(400, "Book not found.");
  }

  const deletedBookImage = await deleteImageFromCloudinary(book.image);
  if (!deletedBookImage.success) {
    throw new ApiError(500, "Failed to delete Book Image from cloudinary");
  }

  const result = await Book.deleteOne({ _id: bookId });
  console.log(result);
  if (result.deletedCount === 0) {
    throw new ApiError(404, "book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "book deleted Successfully."));
});

const getBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, "Invalid book id.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, book, "book fetched Succesfully."));
});

export { addBook, updateBookDetails, deleteBook, getBook, getBooks };
