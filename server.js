require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel")
const app = express();
const dbUrl = process.env.DATABASE_URL;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

app.get("/products",async(req,res)=>{
  try {
    const products = await Product.find({})
    res.status(200).json(products)    
  } catch (error) {
    console.log("error in get /products", error.message)
    res.status(500).json({message:error.message});
    
  }
})

app.get("/products/:name", async(req,res)=>{
  try {
    const name=req.params.name
    const products = await Product.find({ "name": { $regex: `${name}`, $options: "i" } })
    res.status(200).json(products) 
    console.log("params ", name)
  } catch (error) {
    console.log("error in get /products/:name", error.message)
    res.status(500).json({message:error.message});    
  }
})

app.post("/products", async (req,res) =>{
    try {
        const product = await Product.create(req.body);     
        res.status(200).json(product);   
    } catch (error) {
        console.log("error in /product ",error.message)
        res.status(500).json({message: error.message})        
    }
})

app.put("/products/:id",async (req,res)=>{
  try {
    const id=req.params.id
    const product = await Product.findByIdAndUpdate(id,req.body);
    if(!product){
      res.status(400).json({message : `Product with id ${id} not found.`})
    }
    const newProduct = await Product.findById(id);
    res.status(200).json(newProduct) 
    console.log("params ", id)
  } catch (error) {
    console.log("error in put /products/:id", error.message)
    res.status(500).json({message:error.message});    
  }
})

app.delete("/products/:id", async (req,res)=>{
  try {
    const id=req.params.id
    const product = await Product.findByIdAndDelete(id,req.body); 
    if(!product){
      res.status(400).json({message : `Product with id ${id} not found.`})
    }
    res.status(200).json({status: 200, message: `Product with id ${id} deleted.`}) 
  } catch (error) {
    console.log("error in delete /products/:id", error.message)
    res.status(500).json({message:error.message});    
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
