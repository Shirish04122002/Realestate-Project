const express = require('express')

const router = express.Router()
const user_obj = require('./controller/User')
const admin_obj=require('./controller/Admin')


const multer=require('multer') // Image Upload Realted Require
const path=require('path')  // Image Upload Realted Require 

//---------------Image Move  to Destination Folder And Given A Unique name to an Image----------------
var storage=multer.diskStorage(
    {
          destination:(req,file,callback)=>
          {
                 callback(null,'./public/Property_Images') // asign userdefine path where you want to move your Image
          },
          filename:(req,file,callback)=>
          {
                callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname)) // Asign Unique Name To An Image
          }

    }
)

var upload=multer(
   {
       storage:storage    // here we compresed Our Code 
   }
 )





router.get('/',(req,res)=>{
    res.render('login')
    res.end()
})

router.get('/signup',(req,res)=>{
    res.render('signup')
    res.end()
})


// router.use('/log-in',(req,res)=>{
//     if(req.method=='GET')
//     {
//         res.render('login')
//         res.end()
//     }
//     else{
//         var email=req.body.email
//         var pass = req.body.password
//         res.render('home')
//         res.end()
//     }
// })

router.use("/signup",(req,res)=>
{
    user_obj.Add_User(req,res)
})

router.use('/home',(req,res)=>
{
    user_obj.Login_check(req,res)
})
router.use('/logout',(req,res)=>
{
    user_obj.Logout(req,res)
})
router.use('/Admin',(req,res)=>
{
    admin_obj.Admin_login_(req,res)
})

router.use('/logout_admin',(req,res)=>
{
     admin_obj.Logout(req,res)
})
router.use('/addproperty',upload.single('pimage'),(req,res)=>
{
     admin_obj.Add_Property(req,res)
})

router.use('/viewproperty',(req,res)=>
{
    user_obj.getPropertyInfo(req,res)
})
module.exports = router