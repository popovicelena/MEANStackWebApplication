import mongoose from "mongoose";

const Schema = mongoose.Schema

let  Nastavnik = new Schema({

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    subjects: {
        type: Array
    },
    grade: {
        type: String
    },
    question:{
        type: String
    },
    cv:{
        type: String
    },
    scheduledClasses:{

        type: Array
    },
    classRequests:{

        type:Array
    },
    status:{
        type: String
    }
    
})

export default mongoose.model('NastavnikModel',Nastavnik,'nastavnici')