const{  genSaltSync } = require('bcryptjs')
const express = require('express')
const cors= require('cors')
const bcrypt= require('bcryptjs')
const app = express()
const db = require('../config/db')


app.use(cors({
  origin: true, 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json())
app.use(express.urlencoded({extended:true}))

let hashpass

app.get('/',(req,res)=>{
    res.send('working')
})

//login
app.post('/api/auth/login',async(req,res)=>{
   const {email,password}= req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

     const queryText = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(queryText, [email.toLowerCase().trim()]);

    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

const comparePass= bcrypt.compareSync(password, user.password)
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
app.post('/api/auth/register',async(req,res)=>{
 const {name,email,password} = req.body
  if (!email || !password || !name) {
      return res.status(400).json({ error: "Email and password are required" });
    }
 hashpass=bcrypt.hashSync(password,genSaltSync(10),process.env)

  const queryText = 'INSERT INTO users(email, password, username) VALUES(\$1, \$2, \$3) RETURNING id, email';
    const values = [email, hashpass, name];
    
 await db.query(queryText, values);

 res.status(201).json({
    success: true,
    messsage:"user is registered",
    
 })
})
module.exports= app