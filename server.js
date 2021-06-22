const express =require('express');

const fast=require('fast-two-sms');

require('dotenv').config();

const app=express();

const path=require('path');

app.use(express.urlencoded({extended:false}));//used to disable url encoded to use req.body

app.use('/public',express.static(path.join(__dirname,'public')))

app.set('view engine','ejs');

app.post('/send',async(req,res)=>{
    const {name,number}=req.body;
    const resp=await fast.sendMessage({authorization:process.env.API_KEY,message:`hi how are you ${name}`,numbers:[`${number}`]})
    res.redirect('/sent');
 })
app.get('/',(req,res)=>{
  res.render('index.ejs');
})
app.get('/sent',(req,res)=>{
    res.render('sent.ejs');
})
app.listen(3005,(err)=>{
    if(err)
    {
        console.log("server not running");
    }
    else
    {
        console.log(`server running in port 3005`);
    }
})

