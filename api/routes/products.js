const express = require('express')
const router = express.Router()
const {checkAuth,checkAdm} = require('../middleware/authenticacion')

const Product = require('../models/productos')


//Create a product

router.post('/new-product',[checkAuth,checkAdm],async(req,res) => {
    try {
        const title = req.body.title
        const price = req.body.price
        const description = req.body.description
        
        const newProduct = {
            title: title,
            price: price,
            description: description
        }
    
        const productDB = await Product.create(newProduct)
    
        res.json({
            status: 'success',
            product: productDB
        })
        console.log(productDB);
        
    } catch (error) {
        return res.status(500).json({
            status: 'Failed',
            message: "Error to create a product"
        })
    }
})


// Get products
router.post('/products',[checkAuth,checkAdm],async(req,res) => {
    try {
        const productDB = await Product.find()
        const toSend = {
            status: 'success',
            products: productDB
        }
        console.log(toSend.products);
        return res.json(toSend)
    
    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            message: error
        })
    }
})

// Get a product
router.post('/product/:id',[checkAuth,checkAdm],async(req,res) => {
    const _id = req.params.id
    try {
        const productDB = await Product.findOne({_id})
        const toSend = {
            status: 'success',
            product: productDB
        }
        console.log(toSend.product);
        return res.json(toSend)

    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            error: error
        })
    }
})


//Edit a product
router.post('/edit-product/:id',[checkAuth,checkAdm],async(req,res) => {
    const _id = req.params.id
    var body = req.body
    try {
        const productDB = await Product.findByIdAndUpdate(_id,body, {new: true, runValidators:true})

        const toSend = {
            status: 'success',
            product: productDB
        }
        return res.json(toSend)


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 'Failed',
            error: error
        })
    }
})


// Delete a product
router.post('/delete-product/:id',[checkAuth,checkAdm],async(req,res) => {
    const _id = req.params.id
    
    try {
        const productDB = await Product.findByIdAndDelete({_id})

        if (!productDB) {
            return res.status(400).json({
                message: 'Product not exists'
            })
        }
        console.log(productDB);
        return res.json({
            status: 'success',
            data: productDB
        })
        
    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            message: 'Error to delete product',
        })
    }
})

module.exports = router