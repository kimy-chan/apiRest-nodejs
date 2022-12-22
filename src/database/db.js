
const mysql  = require("mysql")

const connection= mysql.createConnection({
        host:process.env.HOST,
        user:process.env.USER,
        password: process.env.PASSWORD,
        database:process.env.NAMEDB
    })
connection.connect((error)=>{
    if(error){
        console.log("error en la conexion de base de datos", error.sqlMessage)
    }else{
        console.log("conectada a la base de datos")
    }}
    )

module.exports={
    connection
}