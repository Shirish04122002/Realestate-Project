
const cn=require('../db')

class Records
{
     Add_User(req,res)
     {
        if(req.method=='GET')
        {
             res.render('signup')
             res.end()
        }
        else 
        {
               cn.getConnection((err,myconnect)=>
               {
                  if(err)
                  {
                     res.send(err)
                     res.end()
                  }
                  else 
                  {
                       const username=req.body.username
                      
                       const email=req.body.email
                       const password=req.body.password
                       const q=`insert into user(name,email,password)values('${username}','${email}','${password}')`
                       myconnect.query(q,(err)=>
                       {
                           if(err)
                           {
                             res.send(err)
                             res.end()
                           }
                           else 
                           {
                               res.render('login',{message:'Signup Successfully'})
                               res.end()
                           }
                       })
                  }
               })
        }
     }

     Login_check(req,res)
     {
         cn.getConnection((err,myconnect)=>
         {
             if(err)
             {
                res.send(err)
                res.end()
             }
             else 
             {
               const email=req.body.email
               const password=req.body.password
               const q=`select * from user where email='${email}' and password='${password}'`
               myconnect.query(q,(err,result)=>
               {
                    if(err)
                    {
                      res.send(err)
                      res.end()
                    }
                    else 
                    {
                        if(result.length>0)
                        {
                           res.render('welcome',{user_mail:email})
                           res.end()
                       
                        }
                        else 
                        {
                           res.render('login',{message:'Invalid Login Details'})
                           res.end()
                        }
                    }
               })

             }
         })
     }

     getPropertyInfo(req,res)
     {
         cn.getConnection((err,myconnect)=>
         {
               if(err)
               {
                  res.send(err)
                  res.end()
               }
               else 
               {
                    const q=`select * from properties`
                    myconnect.query(q,(err,result)=>
                    {
                        if(err)
                        {
                           res.send(err)
                           res.end()
                        }
                        else 
                        {
                             res.render('Property_Data',{record:result,user_mail:"Test"})
                             res.end()
                        }
                    })
               }
         })
     }


     Logout(req,res)
     {
         res.render('login',{message:'logout successfully'})
         res.end()
     }
}


const obj=new Records()

module.exports=obj