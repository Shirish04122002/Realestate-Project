const express = require('express')
const router_path = require('./route')
const bodyparser=require('body-parser')
const app=express()

app.set('view engine','ejs')
app.use('/public',express.static(__dirname+'/public'))
const port = 4122
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/',router_path)
app.use('/signup',router_path)
app.use('/home',router_path)
app.use('/logout',router_path)
app.use('/Admin',router_path)
app.use('/logout_admin',router_path)
app.use('/addproperty',router_path)
app.use('/viewproperty',router_path)
app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
})