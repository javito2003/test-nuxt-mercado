const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const roles = {
    values: ['ADMIN','USER'],
    message: '{VALUE} not a valid role'
}

const userSchema = new Schema({
    name: {type: String, required: [true, 'name is required']},
    surname: {type: String, required: [true, "surname is required"]},
    email: {type: String,required: [true,'email is required'], unique: true},
    password: {type: String,required: [true, 'Password is required']},
    rol: {type: String, default: 'USER', enum: roles},
    date: {type: Date, default: Date.now}
})

userSchema.plugin(uniqueValidator,{message: "Error, email already exists"})
userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    return obj
}

const User = mongoose.model('User',userSchema)

module.exports = User