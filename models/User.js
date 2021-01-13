const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
    },
    step: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: { 
        type: Number, 
        required: true 
    },
    updatedAt: { 
        type: Number, 
        required: true 
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);