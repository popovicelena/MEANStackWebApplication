import mongoose from "mongoose";

const Schema = mongoose.Schema

let  Cas = new Schema({

    idN:{
        type: Number
    },
    subject: {
        type: String
    },
    teacher: {
        type: String
    },
    student: {
        type: String
    },
    themes:{
        type: String
    },
    datetime:{
        type: String
    },
    doubleclass:{
        type:Boolean
    },
    comment:{
        type:String
    },
    rating:{
        type:Number
    },
    canceled:{
        type:String
    }
    
})

export default mongoose.model('CasModel',Cas,'casovi')