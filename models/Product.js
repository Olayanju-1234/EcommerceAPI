const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String
    },
    desc: {
        type: String,  
        required: true
    },
    categories: {
        type: Array
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)