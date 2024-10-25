require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const Database = process.env.MONGO_URI
mongoose.connect(Database)

.then(()=>{console.log('Connected to database !!')})
.catch((error)=>{console.log(error)});
// Import routes
const routes = require('./routes/routes');
// Use routes
app.use('/', routes);

app.listen(port,()=>{
    console.log("server is running on","http://localhost:"+port)
})

