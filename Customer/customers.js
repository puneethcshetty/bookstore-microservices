//Load express
const express = require("express")
const app = express()

//Load body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.json());

//Load mongoose
const mongoose = require("mongoose")
mongoose.connect(/*URL for database*/"", () => {
    console.log("Customers DB is connected!!")
})

//import Customer model
require("./Customer")
const Customer = mongoose.model("Customer")

//GET endpoint to get all customers
app.get('/customers', (req, res) => {
    Customer.find().then( (customers) => {
        res.json(customers)
    }).catch((err) => {
        if(err)
            throw err
    })
})

//GET endpoint to get a customer for given ID
app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id).then( (customer) => {
        if(customer)
            res.json(customer)
        else
            res.send("Customer not found!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//POST endpoint to create a new customer
app.post('/customer', (req, res) => {
    var newCustomer = new Customer({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    })
    newCustomer.save().then( () => {
        res.send("New Customer creation successful!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//DELETE endpoint to delete a customer by its ID
app.delete('/customer/:id', (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then( () => {
        res.send("Customer removed successfully!!")
    }).catch((err) => {
        if(err)
            throw err
    })
})

//Create a port for the service to listen
app.listen(4045, () => {
    console.log("Customer service is up!!")
})