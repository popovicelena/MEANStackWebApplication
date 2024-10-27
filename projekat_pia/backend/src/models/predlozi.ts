import mongoose from "mongoose";

const Schema = mongoose.Schema

let  Predlog = new Schema({

    subject: {

        type: String
    },
    prof:{

        type:String
    }
    
})

export default mongoose.model('PredloziModel',Predlog,'predlozi')