const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
const connectDB = require('./config/mongodb')

dotenv.config()

//options configurations for cors
const allowedOrigins = ['http://127.0.0.1:5500' , 'http://localhost:3000' ]
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) { //!origin  is written cuz localhost gives undefined as origin
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200

}

//built in middlewares
app.use(express.json())
app.use(cors( corsOptions ))
connectDB();

//make sure to import db connection function here and call it so that db is connected to backend

    //-----------------------------------//
    //add custom middleware and api below//
    //-----------------------------------//


app.get('/', (req , res) =>{
    res.send('Api is Up and Running')
})


app.listen(process.env.PORT , () => {
    console.log('Server is running on Port ' + process.env.PORT)
})