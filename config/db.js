const mongoose = require('mongoose');
require('dotenv').config({path: 'var.env' });

const connectDB = async () => {
    try {
        console.log(process.env.DB_MONGO)
        await mongoose.connect(process.env.DB_MONGO,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Db connected')
    } catch (error) {
        console.log('Error db');
        console.log(error);
        process.exit(1);
    }
    
}

module.exports = connectDB;