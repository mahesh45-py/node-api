const express = require('express');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;



database.on('error',(err)=>{
    console.log(err);
})

database.once('connected',()=>{
    console.log('Database Connected');
})

app.use(express.json());

const routes = require('./routes/routes');
app.use('/api',routes);


app.listen(3000,()=>{
    console.log(`Server started at ${3000}`);
})

module.exports = app