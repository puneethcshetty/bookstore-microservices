//Load express
const express = require("express")
const app = express()

//Load body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose")
mongoose.connect(/*URL for database*/"", () => {
    console.log("Orders DB is connected!!")
})

//import Order model
require("./Order")
const Order = mongoose.model("Order")

//Load axios
const axios = require("axios")

//GET endpoint to get all orders
app.get('/orders', (req, res) => {
    Order.find().then( (orders) => {
        res.json(orders)
    }).catch((err) => {
        if(err)
            throw err
    })
})

//GET endpoint to get a 0rder for given ID
app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id).then( (order) => {
        if(order){
            axios.get("http://localhost:4045/customer/" + order.customerId).then( (customer) => {
                axios.get("http://localhost:4045/book/" + order.bookId).then( (book) => {
                    res.json({ customerName: customer.data.name, bookTitle: book.data.title})
                }).catch((err) => {
                    if(err)
                        throw err
                })
            }).catch((err) => {
                if(err)
                    throw err
            })
        }
        else
            res.send("Order not found!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//POST endpoint to create a new order
app.post('/order', (req, res) => {
    var newOrder = new Order({
        customerId: mongoose.Types.ObjectId(req.body.customerId),
        bookId: mongoose.Types.ObjectId(req.body.bookId),
        date: req.body.date
    })
    newOrder.save().then( () => {
        res.send("New Order creation successful!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//DELETE endpoint to delete a order by its ID
app.delete('/order/:id', (req, res) => {
    Order.findByIdAndDelete(req.params.id).then( () => {
        res.send("Order removed successfully!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//Create a port for the service to listen
app.listen(4050, () => {
    console.log("Order service is up!!")
})