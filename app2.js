const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res) => {
    res.render("index")
})

app.get('/read', async (req,res) => {
    let users = await userModel.find()
    res.render("read", {users})
})

app.get('/edit/:userid', async (req,res) => {
    let user = await userModel.findOne({_id: req.params.userid})
    res.render("edit", {user})
})

app.post('/update/:userid', async (req,res) => {
    let {name,image,email} = req.body
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name,image,email}, {new:true})
    res.redirect("/read")
})

app.get('/delete/:_id', async (req,res) => {
    let users = await userModel.findOneAndDelete({id: req.params.id})
    res.redirect("/read")
})

app.post('/create', async (req,res) => {
    let {name,email,image} = req.body  // yaha destructuring kar rahe hai jisse baar-baar (req.body) na likhna pade

    let createdUser = await userModel.create({
        name,     // dono side same hai to aise bhi likh sakte hai
        email,
        image
    })
    res.redirect("/read")
})

app.listen(3000)