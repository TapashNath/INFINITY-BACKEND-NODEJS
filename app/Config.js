const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURI = "mongodb+srv://tapash:Tapash@cluster0.bm86ba9.mongodb.net/?retryWrites=true&w=majority";
const mongoURI = process.env.MONGODB + process.env.DB;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));   
  
    
  