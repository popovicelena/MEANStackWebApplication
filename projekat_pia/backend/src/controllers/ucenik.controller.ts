import express, { response } from 'express'
import UserModel from '../models/user'
import UcenikModel from '../models/ucenik'
import NastavnikModel from '../models/nastavnik'



export class UcenikController{


    getStudent = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        UcenikModel.findOne({username:username}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })

    }

    updateStudent = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let param = req.body.param;
        

        let updateObject: any = {};
        updateObject[param] = req.body.change;

        UserModel.updateOne({username:username},{$set:updateObject}).then(resp=>{
            
            res.json({"message":"Changes saved!"})
        }).catch((err)=>{
            
            console.log(err)
        })

    }

    updateGradeSchool = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let grade = req.body.grade;
        let school=req.body.school

        UcenikModel.updateOne({username:username},{$set:{grade:grade,school:school}}).then(resp=>{
            
            res.json({"message":"Changes saved!"})
        }).catch((err)=>{
            
            console.log(err)
        })

    }

    getTeachers = (req: express.Request, res: express.Response)=>{

        let grade=req.body.grade;

        NastavnikModel.find({grade:grade}).then((teachers)=>{
            res.json(teachers)
        }).catch((err)=>{
            console.log(err)
        })

    }

    addScheduledClass = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
    
        let schclass={

            idN:req.body.idN,
            subject:req.body.subject,
            dateBegin:req.body.begin,
            dateEnd:req.body.end,
            teacherFirstname:req.body.firstname,
            teacherLastname:req.body.lastname,
            teacherComment:req.body.comment,
            teacherusername:req.body.teacherusername,
            theme:req.body.theme,
            teachersgrade:0
           
        }
    
        UcenikModel.updateOne({username:username},{$push:{scheduledClasses:schclass}}).then(resp=>{
            res.json({"message":"Class added to your schedule!"})
        }).catch((err)=>{
            console.log(err);
        })
    
    }

    addCommGrade = (req: express.Request, res: express.Response)=>{

        let username  = req.body.username;
        let id=req.body.id;
        let techcomm=req.body.techcomm;
        let techgrade = req.body.techgrade;

        UcenikModel.updateOne({username:username,"scheduledClasses.idN":id}, { $set: { "scheduledClasses.$.teacherComment" : techcomm,"scheduledClasses.$.teachersgrade" : techgrade, }}).then(resp=>{
            res.json({"message":"Submited!"})
        }).catch((err)=>{
            console.log(err);
        })



    }

     



}