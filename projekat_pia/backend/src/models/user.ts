import mongoose from "mongoose";

const Schema = mongoose.Schema

let  User = new Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    },
    school: {
        type: String
    },
    safetyquestion: {
        type: String
    },
    safetyresponse: {
        type: String
    },
    avatar:{
        type: String
    },
    active:{
        type: Boolean
    }
    

})

export default mongoose.model('UserModel',User,'users')