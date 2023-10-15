const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());
//MongoDB connection
const dbConfig = require('./config/Database.config');
const mongoose = require('mongoose');

mongoose.connect(dbConfig.url, {
    useNewUrlParser:true
}).then(()=>console.log("OK: Database connection")).catch(err =>{
    console.log("ERROR: Database connection", err);
})

app.get('/', (req, res)=>{
    res.json({
        "message": "Welcome to DressStore application."

    })
})

require('./app/routes/users')(app)

app.listen(8080, ()=> {
    console.log('server is running!!')
})