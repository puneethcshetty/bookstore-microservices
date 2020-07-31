//Load express
const express = require("express")
const app = express()

//Load body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose")
mongoose.connect(/*URL for database*/"", () => {
    console.log("Books DB is connected!!")
})

//import Book model
require("./Book")
const Book = mongoose.model("Book")

//GET endpoint to get all books
app.get('/books', (req, res) => {
    Book.find().then( (books) => {
        res.json(books)
    }).catch((err) => {
        if(err)
            throw err
    })
})

//GET endpoint to get a book for given ID
app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id).then( (book) => {
        if(book)
            res.json(book)
        else
            res.send("Book not found!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//POST endpoint to create a new book
app.post('/book', (req, res) => {
    var newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
    })
    newBook.save().then( () => {
        res.send("New Book creation successful!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//DELETE endpoint to delete a book by its ID
app.delete('/book/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id).then( () => {
        res.send("Book removed successfully!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//Create a port for the service to listen
app.listen(4040, () => {
    console.log("Book service is up!!")
})