import express from "express"
import { MongoDbURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors'
const app = express();

app.use(express.json());

//middleware for handeling cors policy 
//option 1: allow all origion with default of cors(*)
app.use(cors());

//option 2 : allow custom origins
// app.use(cors({
//     origin: "http:/localhost:3000",
//     methods: ['GET','POST','DELETE','PUT'],
//     allowedHeaders: ['Content-Type'],
// })
// )

app.get('/' , (req,res)=>{
    console.log(req);
    return res.status(234).send('welcome to mern develpoment')
})

app.use('/books',booksRoute);

mongoose.connect(MongoDbURL)
.then(()=>{
console.log("connected to database");
app.listen(PORT , ()=>{
    console.log(`app is listening to : ${PORT}`)
});
})
.catch((err)=>{
console.log(err);
})



