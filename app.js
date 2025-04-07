const express = require('express')
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const userSchema =require('./users.schema')

const app = express()
app.use(bodyParser.json())

const port = 3300;
const uri ="mongodb+srv://Anter:ahmed123@anter.1cdaq.mongodb.net/?retryWrites=true&w=majority&appName=Anter";
const connectToDB = async () => {

    try{
        mongoose.set('strictQuery',false)
        mongoose.connect(uri)
        console.log("Connected to MongoDB");
    } catch(err){
        console.log("ConnectedToDB",err)
        process.exit()
    }
}
connectToDB()
// إنشاء مستخدم جديد
app.post('/api/users/register', async (req, res) => {
    try{
        const user = await userSchema.create(req.body)    
        res.json({ data: user, message: "User added successfully" })
    }
     catch(err){
        
        res.status(400).json({message:"dublicate phone number"})
    }
})

// قراءة جميع المستخدمين
app.get('/api/users', async (req, res) => {
    const users = await userSchema.find()    
    res.json({ data: users, message: "Done" })
})
//update user
app.put('/api/users/:id', async (req, res) => {
    try{
        let { id } = req.params
        let { name, age, phone } = req.body
        await userSchema.findByIdAndUpdate(id,{name,age,phone})
        res.json({ message: "User updated successfully" })
    } catch(err) {
        res.status(400).json({ message: "not found" })
    }
})

//delete user
app.delete('/api/users/:id', async (req, res) => {
    try{
        let { id } = req.params
        await userSchema.findByIdAndDelete(id)
        res.json({ message: "User deleted successfully" })
    } catch(err) {
        res.status(400).json({ message: "not found" })
    }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})