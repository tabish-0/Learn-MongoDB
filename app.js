const express = require('express')
const app = express()

const userModel = require('./usermodel')
const usermodel = require('./usermodel')

app.get('/', (req,res) => {
    res.send("hey")
})

app.get('/create', async (req,res) => {
    let createdUser =  await userModel.create({     // ye asynchronous code hai iske baad wala code pahle chal jayega
        name: "raj",
        email: "raj@gmail.com",
        username: "raj_0"
    })

    res.send(createdUser)
})

app.get('/read', async (req,res) => {
    // let users= await userModel.find()  // isse saare read ho jate hai
    let users= await userModel.find({username: "raj_0"})  // isse ek hi read hoga
    res.send(users)
})

app.get('/update', async (req,res) => {
    let updatedUser =  await userModel.findOneAndUpdate({username: "tabish_7"}, {name: "Md Tabish"}, {new: true})

    res.send(updatedUser)
})

app.get('/delete', async (req,res) => {
    let deleteUsers = await userModel.findOneAndDelete({username: "tabish_7"})
    res.send(deleteUsers)
})

app.listen(3000)