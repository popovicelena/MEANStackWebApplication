import express from 'express'


import { UcenikController } from '../controllers/ucenik.controller';



const ucenikRouter = express.Router();

ucenikRouter.route("/addScheduledClasses").post(
    (req,res)=> new UcenikController().addScheduledClass(req,res)
)

ucenikRouter.route("/addCommGrade").post(
    (req,res)=> new UcenikController().addCommGrade(req,res)
)




export default ucenikRouter