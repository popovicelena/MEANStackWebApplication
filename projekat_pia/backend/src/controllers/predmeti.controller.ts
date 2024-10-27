import express, { response } from 'express'
import PredmetModel from '../models/predmet'
import PredlogModel from '../models/predlozi'


export class PredmetiController{

    addSubject = (req: express.Request, res: express.Response)=>{

        
        let subject = new PredmetModel({

            subject:req.body.subject
        })

        subject.save().then(resp=>{
            res.json({"message":"Subject added!"})
        }).catch((err)=>{
            console.log(err)
        })


    }

    getSubject = (req: express.Request, res: express.Response)=>{

        let name = req.body.name;
        PredmetModel.findOne({subject:name}).then((subj)=>{
            res.json(subj)
        }).catch((err)=>{
            console.log(err)
        })


    }

    getAllSubjects = (req: express.Request, res: express.Response)=>{

        PredmetModel.find({}).then((subj)=>{
            res.json(subj)
        }).catch((err)=>{
            console.log(err)
        })

    }

    removeProfessor = (req: express.Request, res: express.Response)=>{

        let s = req.body.s;

        let teacher={
             username:req.body.username,
             firstname:req.body.firstname,
             lastname:req.body.lastname
        }
        

        PredmetModel.updateOne({subject:s},{$pull:{professors:teacher}}).then((resp)=>{
            res.json({"message":"ok"})
        }).catch((err)=>{
            console.log(err)
        })

    }

    getAllPredloge = (req: express.Request, res: express.Response)=>{

        PredlogModel.find({}).then(pred=>{
            res.json(pred)
        }).catch((err)=>{
            console.log(err);
        })
    }

  

   

}