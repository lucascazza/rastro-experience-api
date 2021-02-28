require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://rastrouser:${process.env.DB_PASS}@cluster-rastro.hbgco.mongodb.net/rastrodb?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))