import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    password:{
        type: String,
        required: true,
    },
    birthday:{
        type: Date, 
        required:true,
    },
    gender:{
        type: String,
        enum:["male","female","other"],
        required: true,
    },
    description:{
        type: String, 
    }

})

const User = mongoose.model("User", userSchema);
export default User;