import express, { response } from 'express'
import NastavnikModel from '../models/nastavnik'
import PredmetModel from '../models/predmet'
import CasModel from '../models/cas'


export class CasController{

    addClass = (req: express.Request, res: express.Response)=>{

        
        let cas = new CasModel({

            idN:req.body.idN,
            teacher:req.body.teacher,
            student:req.body.student,
            themes:req.body.themes,
            datetime:req.body.datetime,
            subject:req.body.subject,
            doubleclass:req.body.doubleclass,
            comment:req.body.comment,
            rating:req.body.rating,
            canceled:""

        })

        cas.save().then(resp=>{
            res.json({"message":"Class added to your schedule!"})
        }).catch((err)=>{
            console.log(err)
        })
    
    
    
    }


    getObj = (req:express.Request,res:express.Response)=>{
        CasModel.findOne({}).sort({'idN':-1}).limit(1).then(cas=>{
            res.json(cas);
        }).catch((err)=>{
            console.log(err);
        })
    }

    getCas = (req:express.Request,res:express.Response)=>{

        let id = req.body.id;

        CasModel.findOne({idN:id}).then(cas=>{
            res.json(cas);
        }).catch((err)=>{
            console.log(err);
        })

    }

    addComment = (req:express.Request,res:express.Response)=>{

        let comm=req.body.comm;
        let id = req.body.id;
        let rating = req.body.rating;

        CasModel.updateOne({idN:id},{$set:{comment:comm,rating:rating}}).then(resp=>{
            res.json({"message":"ok"})
        }).then((err)=>{
            console.log(err);
        })
    }

    denyClass = (req:express.Request,res:express.Response)=>{

        let id = req.body.id;
        let comm=req.body.comm;

        CasModel.updateOne({idN:id},{$set:{canceled:comm}}).then(resp=>{
            res.json({"message":"ok"})
        }).then((err)=>{
            console.log(err);
        })
    }

    getTeachersClass = (req:express.Request,res:express.Response)=>{

        let teacher= req.body.teacher;
        CasModel.find({teacher:teacher}).then(cas=>{
            res.json(cas)
        }).catch((err)=>{
            console.log(err);
        })

    }

    getAllClasses = (req:express.Request,res:express.Response)=>{

        CasModel.find({}).then(cas=>{
            res.json(cas)
        }).catch((err)=>{
            console.log(err);
        })
    }
}
