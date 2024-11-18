import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export const Book = model("Book", bookSchema);
