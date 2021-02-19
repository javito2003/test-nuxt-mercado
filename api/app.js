//Requires
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const mongoose = require('mongoose')


//Instances
const app = express()

//express.config
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())

//ROUTES
app.use('/api',require('./routes/users'))
app.use('/api',require('./routes/data'))
app.use('/api',require('./routes/products'))

const uri = 'mongodb://localhost:27017/mercadito-test'
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin"
};

mongoose.connect(uri,options).then(
    () => {
        console.log("\n");
        console.log("*******************************".green);
        console.log("✔ Mongo Successfully Connected!".green);
        console.log("*******************************".green);
        console.log("\n");
    },
    err => {
        console.log("\n");
        console.log("*******************************".red);
        console.log("    Mongo Connection Failed    ".red);
        console.log("*******************************".red);
        console.log("\n");
        console.log(err);
    }
)

module.exports = app