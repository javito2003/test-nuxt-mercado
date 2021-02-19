const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, default: "The seller don't add a description"},
    price: {type: Number, required: true},
    photo: {type: String, default: "http://static.cmsi-id.com/product/01032016/pt-cahayatiara-mustika-scientific-indonesia_5tqwe_244.png"},
    date: {type: Date, default: Date.now},
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product