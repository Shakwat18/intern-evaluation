const{  genSaltSync } = require('bcryptjs')
const express = require('express')
const cors= require('cors')
const bcrypt= require('bcryptjs')
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let hashpass


//login
app.post('/api/auth/login',(req,res)=>{
   const {email,password}= req.body

const comparePass= bcrypt.compareSync(password, hashpass)
if(!comparePass){
    res.status(404).json({
        success:false,
        messsage: 'invalid email or pass'
    })
}else{
 res.status(201).json({
    success: true,
    messsage:"user is loged in",
    user:{
        email,
        comparePass
    }
 })}
})


// register
app.post('/api/auth/register',(req,res)=>{
 const {name,email,password} = req.body
 
 hashpass=bcrypt.hashSync(password,genSaltSync(10),process.env)

 res.status(201).json({
    success: true,
    messsage:"user is registered",
    user:{
        name,
        email,
        hashpass
    }
 })
})
module.exports= app