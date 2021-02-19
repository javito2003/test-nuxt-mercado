const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const User = require('../models/user')


//REGISTER USER

router.post('/register', async(req,res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const encryptedPassword = bcrypt.hashSync(password,10)
        const newUser= {
            name: name,
            email: email,
            password: encryptedPassword
        }
        
        var userDB = await User.create(newUser)
        console.log(userDB);
        res.status(201).json(userDB)
        
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Failed to create an user"
        })
    }
})

//LOGIN USER

router.post('/login',async(req,res) => {
    const email = req.body.email
    const password = req.body.password

    var userDB = await User.findOne({email:email})

    //if no email
    if (!userDB) {
        const toSend = {
            status: 'error',
            message: "Invalid credentials"
        }
        return res.status(401).json(toSend)
    }

    //if email and password ok
    if (bcrypt.compareSync(password, userDB.password)) {
        
        userDB.set('password',undefined,{strict:false})

        const token = jwt.sign({userData: userDB},"securePasswordHere", {
            expiresIn: 60*60*24*30
        })

        const toSend= {
            status: 'success',
            token: token,
            userData: userDB
        }
        console.log(toSend);
        return res.status(200).send(toSend)
    }
})

module.exports = router