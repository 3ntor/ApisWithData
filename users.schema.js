const mongoose =require('mongoose')
const Schema =mongoose.Schema

const userSchema = new Schema({
    name: String,
    age: Number,
    phone: {type: String , unique: true}
})
module.exports = mongoose.model('Users', userSchema)