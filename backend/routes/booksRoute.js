import express, { Router } from 'express'
import {Book} from '../models/bookmodel.js'
import mongoose from 'mongoose';

const router = express.Router();
//route for new book

router.post('/',async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newBook = {
            title: req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book =await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// routes to get all books
 
router.get('/' , async(req,res)=>{
    try {
        const books = await Book.find({})

        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

// routes to get 1 book details by ID

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        // Find the book by ID
        const book = await Book.findById(id);

        // If the book doesn't exist, return a 404 error
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Return the book if found
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// route to update a book

router.put('/:id' , async(req,res)=>{
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields',
            });
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id,req.body);

        if(!result){
            return res.status(404).json({message: 'book not found'})
        }
       
            return res.status(200).send({message : 'book updated sucessfully'})
        

    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
        
    }
})

//route to delete the book

router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'book not found'})
        }
        return res.status(200).send({message: 'book deleted successfully'})
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})


export default router