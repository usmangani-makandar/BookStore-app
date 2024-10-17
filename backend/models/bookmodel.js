import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,  // Correct spelling
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
   
  },
  {
    timestamps:true, 
   }

);

  export const Book = mongoose.model('Book', bookSchema); 