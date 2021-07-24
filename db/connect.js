const mongoose = require('mongoose');

exports.connection = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
        useFindAndModify: false, 
        useCreateIndex: true
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}