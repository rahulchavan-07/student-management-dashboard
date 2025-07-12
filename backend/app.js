const express = require("express");

const app = express();

const cors = require("cors")

app.use(express.json())

require("dotenv").config();

// const path=require('path');

const connection = require('../backend/connection');

const studentRoutes=require('../backend/routes/stud')


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes : 

app.use("/api", studentRoutes);


// connect to mongoDB :

connection();

// port

const PORT = process.env.PORT || 5000;



// server started :

app.listen(PORT,()=>{

    console.log(`Server started at port ${PORT}`);
})