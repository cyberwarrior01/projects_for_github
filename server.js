 const express = require("express")
 const dotenv = require("dotenv").config()

 const app = express()

//  middlewares
app.use(express.json())


// routes
app.use("/api/contact", require("./Routes/contactRoutes"))

// listning the app
 const port = process.env.PORT
 app.listen(port , ()=>{
    console.log(`The server is on port ${port}`);
 })