// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/rastro-db', {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })
//     .then(db => console.log('DB is connected'))
//     .catch(err => console.log(err))



require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://rastrouser:${process.env.DBPASS}@cluster-rastro.hbgco.mongodb.net/rastrodb?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))