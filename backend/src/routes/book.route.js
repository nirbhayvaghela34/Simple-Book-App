import express from "express";
import {
  addBook,
  updateBookDetails,
  deleteBook,
  getBook,
  getBooks
} from "../controllers/book.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getBooks)
  .post(upload.single("image"), addBook); 

router
  .route("/:bookId")
  .get(getBook)
  .patch(upload.single("image"), updateBookDetails)
  .delete(deleteBook);

    
export default router;
