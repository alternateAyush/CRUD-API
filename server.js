require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel")
const app = express();
const dbUrl = process.env.DATABASE_URL;

//middleware
app.use(express.json())

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.post("/product", async (req,res) =>{
    try {
        const product = await Product.create(req.body);     
        res.status(200).json(product);   
    } catch (error) {
        console.log("error in /product ",error.message)
        res.status(500).json({message: error.message})        
    }
})

mongoose
  .connect(
    `${dbUrl}`
  )
  .then(() => {
    console.log("Successfuly connected to mongoDb");
    app.listen(3000, () => {
      console.log("app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Failed to connect to mongoDb: ", error);
  });
