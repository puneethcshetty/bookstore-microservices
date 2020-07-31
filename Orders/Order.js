const mongoose = require("mongoose")

mongoose.model("Order", {
    customerId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    date:{
        type: String,
        require: true
    }
})