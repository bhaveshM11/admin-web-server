require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const Database = process.env.MONGO_URI
mongoose.connect(Database)

.then(()=>{console.log('Connected to database !!')})
.catch((error)=>{console.log(error)});
// Import routes
const routes = require('./routes/routes');


app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies to be sent
  }));

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); 
// Use routes
app.use('/', routes);

app.listen(port,()=>{
    console.log("server is running on","http://localhost:"+port)
})

