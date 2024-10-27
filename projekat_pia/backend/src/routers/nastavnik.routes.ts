import express from 'express'

import { NastavnikController } from '../controllers/nastavnik.controller';
import { PredmetiController } from '../controllers/predmeti.controller';



const nastavnikRouter = express.Router();

nastavnikRouter.route("/addTeacher").post(
    (req,res)=> new NastavnikController().addTeacher(req,res)
)

nastavnikRouter.route("/searchTeacher").post(
    (req,res)=> new NastavnikController().searchTeacher(req,res)
)

nastavnikRouter.route("/addScheduledClasses").post(
    (req,res)=> new NastavnikController().addScheduledClass(req,res)
)
nastavnikRouter.route("/updateTeacher").post(
    (req,res)=> new NastavnikController().updateTeacher(req,res)
)

nastavnikRouter.route("/deleteSubject").post(
    (req,res)=> new NastavnikController().deleteSubject(req,res)
)

nastavnikRouter.route("/removeProfessor").post(
    (req,res)=> new PredmetiController().removeProfessor(req,res)
)

nastavnikRouter.route("/addSubject").post(
    (req,res)=> new NastavnikController().addSubject(req,res)
)

nastavnikRouter.route("/addClassRequest").post(
    (req,res)=> new NastavnikController().addClassRequest(req,res)
)

nastavnikRouter.route("/removeClassRequest").post(
    (req,res)=> new NastavnikController().removeClassRequest(req,res)
)


nastavnikRouter.route("/getAllTeachers").get(
    (req,res)=> new NastavnikController().getAllTeachers(req,res)
)
nastavnikRouter.route("/rejectTeacher").post(
    (req,res)=> new NastavnikController().rejecetTeacher(req,res)
)
nastavnikRouter.route("/addPredlog").post(
    (req,res)=> new NastavnikController().addPredlog(req,res)
)

nastavnikRouter.route("/getAllPredloge").get(
    (req,res)=> new PredmetiController().getAllPredloge(req,res)
)

nastavnikRouter.route("/denyPredlog").post(
    (req,res)=> new NastavnikController().denyPredlog(req,res)
)
nastavnikRouter.route("/getPending").get(
    (req,res)=> new NastavnikController().getPending(req,res)
)

nastavnikRouter.route("/accept").post(
    (req,res)=> new NastavnikController().accept(req,res)
)


export default nastavnikRouter