const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./database/connection');
const errorHandler = require('./middleware/ErrorHandle');
const cookieParser = require('cookie-parser');


const cors = require('cors');
app.use(cors({credentials:true ,origin:'http://localhost:3000'}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Welcome to Home Page');
})


const PORT = process.env.PORT || 8000;
const userRoute = require('./routes/userRoute');

app.use("/user",userRoute);
app.use(errorHandler) ;


const main = async () =>{
    try {
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

main();