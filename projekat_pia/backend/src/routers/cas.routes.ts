import express from 'express'

import { CasController } from '../controllers/cas.controller';



const casRouter = express.Router();

casRouter.route("/addClass").post(
    (req,res)=> new CasController().addClass(req,res)
)

casRouter.route("/getObj").get(
    (req,res)=> new CasController().getObj(req,res)
)
casRouter.route("/getCas").post(
    (req,res)=> new CasController().getCas(req,res)
)
casRouter.route("/addComment").post(
    (req,res)=> new CasController().addComment(req,res)
)

casRouter.route("/denyClass").post(
    (req,res)=> new CasController().denyClass(req,res)
)

casRouter.route("/getTeachersClass").post(
    (req,res)=> new CasController().getTeachersClass(req,res)
)

export default casRouter;