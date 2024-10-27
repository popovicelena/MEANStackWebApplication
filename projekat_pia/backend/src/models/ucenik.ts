import mongoose from "mongoose";

const Schema = mongoose.Schema

let  Ucenik = new Schema({

    username: {
        type: String
    },
    school: {
        type: String
    },
    grade: {
        type: Number
    },
    scheduledClasses:{

        type:Array
    }
    
})

export default mongoose.model('UcenikModel',Ucenik,'ucenici')