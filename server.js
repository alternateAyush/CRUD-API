const express = require("express");
const mongoose = require("mongoose");
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/blog", (req, res) => {
  res.send("Hello Blog");
});

mongoose
  .connect(
    "mongodb+srv://admin:012345Admin@crudapi.zqugxvj.mongodb.net/Crud-API?retryWrites=true&w=majority"
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
