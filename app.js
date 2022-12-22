const express = require("express")

require("dotenv").config({path:"./src/env/.env"})
const {connection}=  require("./src/database/db")
const app = express()
app.use(express.json())


app.use("/api",require("./src/routes/routes"))

app.listen(process.env.PORT,()=>{
    connection
    console.log("servidor corriendo", process.env.PORT);
})



