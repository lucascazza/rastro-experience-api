const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: { 
        type: String
    },
    name: { 
        type: String, 
        required: true 
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        index: {
            global: true
        }
    },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('User', userSchema);