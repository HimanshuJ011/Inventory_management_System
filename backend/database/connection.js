const mongoose = require('mongoose');

const connectDB = () =>{
    try {
        console.log('Connected to DB');
        return mongoose.connect(process.env.DB,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;