
const mysql=require('mysql')

var connection=mysql.createPool(
    {
        host:"localhost",
        user:'root',
        password:"",
        database:"realestate",
        multipleStatements:true
    }
)

module.exports=connection