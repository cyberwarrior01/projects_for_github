 const express = require("express")
 const dotenv = require("dotenv").config()
const connectToDatabase = require("./Config/conndb")
 const app = express()

//  connect database
connectToDatabase();

//  middlewares
app.use(express.json())


// routes
app.use("/api/contact", require("./Routes/contactRoutes"))

// listning the app
 const port = process.env.PORT
 app.listen(port , ()=>{
    console.log(`The server is on port ${port}`);
 })