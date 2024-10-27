import mongoose from "mongoose";

const Schema = mongoose.Schema

let  Predmet = new Schema({

    subject: {
        type: String
    },
    professors: {
        type: Array
    }
    
})

export default mongoose.model('PredmetModel',Predmet,'predmeti')