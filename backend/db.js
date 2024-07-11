const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://shailesh:d2Ps0UQEnEcmUUkM@cluster0.b5xkmr9.mongodb.net/Paytm_Project_Clone');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 25,
        trim: true,
        unique: true,
        lowercase: true,
        required: true,
    },
    
    password: {
        type: String,
        minLength: 6,
        maxLength: 15,
        required: true,
    },
    
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    }
})

const accountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    balance: {
        type: Number,
        required: true,
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account,
}