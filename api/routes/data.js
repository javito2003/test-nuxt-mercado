const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {checkAuth} = require('../middleware/authenticacion')

const User = require('../models/user')

//GET user
router.post('/data/:id',async(req,res) => {
    const _id = req.params.id

    try {
        
        const userDB = await User.findOne({_id})
        const toSend = {
            status: 'success',
            userData : userDB
        }
        res.json(toSend)

    } catch (error) {
        return res.status(400).json({
            message: "Can't get user",
            error: error
        })
    }
})

router.post('/user/:id',async(req,res) => {
    const _id = req.params.id

    var body = req.body
    
    if (body.password) {
        body.password = bcrypt.hashSync(req.body.password,10)
    }
    try {
        
        const userDB = await User.findByIdAndUpdate(_id,body, {new:true, runValidators: true})
        res.json(userDB)

    } catch (error) {
        return res.status(500).json({
            message: 'Ocurred an error',
            error: error
        })
    }
})

module.exports = router