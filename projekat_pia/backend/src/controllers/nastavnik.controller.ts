import express, { response } from 'express'
import NastavnikModel from '../models/nastavnik'
import PredmetModel from '../models/predmet'
import PredloziModel from '../models/predlozi';


export class NastavnikController{

addTeacher = (req: express.Request, res: express.Response)=>{

    
    let subject=req.body.subject;
    let teacher = {
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        grade:req.body.grade
    }

    PredmetModel.updateOne({subject:subject},{$push:{professors:teacher}}).then(resp=>{
        res.json({"message":"ok"})
    }).catch((err)=>{
        console.log(err);
    })

}

searchTeacher = (req: express.Request, res: express.Response)=>{

    let searchParamName = req.body.searchParamName;
    let searchParamLastname = req.body.searchParamLastname;
    let searchParamSubject = req.body.searchParamSubject;


    NastavnikModel.find({firstname:{$regex:searchParamName},lastname:{$regex:searchParamLastname},subjects:{ $elemMatch: { $regex: searchParamSubject }}}).then(users=>{
        res.json(users)
    }).catch((err)=>{
        console.log(err);
    })
}

getTeacher = (req: express.Request, res: express.Response)=>{
    let username = req.body.username;

    NastavnikModel.findOne({username:username}).then((user)=>{
        res.json(user)
    }).catch((err)=>{
        console.log(err)
    })
}

addScheduledClass = (req: express.Request, res: express.Response)=>{

    let username = req.body.username;

    let schclass={

        idN:req.body.idN,
        subject:req.body.subject,
        studentusername:req.body.studentusername,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        time:req.body.time,
        doubleclass:req.body.doubleclass
    }

    NastavnikModel.updateOne({username:username},{$push:{scheduledClasses:schclass}}).then(resp=>{
        res.json({"message":"Class added to your schedule!"})
    }).catch((err)=>{
        console.log(err);
    })

}

updateTeacher  = (req: express.Request, res: express.Response)=>{

    let username=req.body.username;
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let grade=req.body.grade;

    

    NastavnikModel.updateOne({username:username},{$set:{firstname:firstname,lastname:lastname,grade:grade}}).then(resp=>{
        res.json({"message":"Changes saved!"})
    }).catch((err)=>{
        console.log(err);
    })

    

}

deleteSubject = (req: express.Request, res: express.Response)=>{

    let username=req.body.username;
    let s=req.body.s;

    NastavnikModel.updateOne({username:username},{$pull:{subjects:s}}).then(resp=>{
        res.json({"message":"ok"})
    }).catch((err)=>{
        console.log(err);
    })


}

addSubject = (req: express.Request, res: express.Response)=>{

    let username=req.body.username;
    let s=req.body.s;

    NastavnikModel.updateOne({username:username},{$push:{subjects:s}}).then(resp=>{
        res.json({"message":"ok"})
    }).catch((err)=>{
        console.log(err);
    })


}

addClassRequest = (req: express.Request, res: express.Response)=>{

    let username=req.body.username;
    let s={
        
        idN:req.body.idN,
        subject:req.body.cas,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        themes:req.body.themes,
        avg:req.body.avg,
        begin:req.body.begin,
        end:req.body.end,
        doubleClass:req.body.doubleClass,
        studentusername:req.body.studentusername
    }

    NastavnikModel.updateOne({username:username},{$push:{classRequests:s}}).then(resp=>{
        res.json({"message":"Class requet is sent to the teacher!"})
    }).catch((err)=>{
        console.log(err);
    })



}

removeClassRequest = (req: express.Request, res: express.Response)=>{

    let id = req.body.id;
    let username=req.body.username;

   
    NastavnikModel.updateOne({username:username},{$pull:{classRequests:{idN:id}}}).then(resp=>{
        res.json({"message":"Accepted!"})
    }).catch((err)=>{
        console.log(err);
    })
}

getAllTeachers = (req: express.Request, res: express.Response)=>{

    NastavnikModel.find({}).then(tech=>{
        res.json(tech);
    }).catch((err)=>{
        console.log(err);
    })
}

rejecetTeacher =  (req: express.Request, res: express.Response)=>{

    
    let username = req.body.username;

    NastavnikModel.deleteOne({username:username}).then(resp=>{
        res.json({"message":"rejected"})
    }).then((err)=>{
        console.log(err);
    })
}

addPredlog = (req: express.Request, res: express.Response)=>{

    let predlog = new PredloziModel({
        subject:req.body.subject,
        prof:req.body.prof
    })

     predlog.save().then(resp=>{
            res.json({"message":"Your registration request has been sent!"})
        }).catch((err)=>{
            console.log(err)
        })
}

denyPredlog = (req: express.Request, res: express.Response)=>{

    let subj = req.body.subj;

    PredloziModel.deleteOne({subject:subj}).then(resp=>{
        res.json({"message":"ok"})
    }).catch((err)=>{
        console.log(err);
    })
}

getPending = (req: express.Request, res: express.Response)=>{

NastavnikModel.find({status:"pending"}).then(usr=>{
    res.json(usr)
}).catch((err)=>{
    console.log(err);
})

}

accept = (req: express.Request, res: express.Response)=>{

    let username=req.body.username;
    

    NastavnikModel.updateOne({username:username},{$set:{status:"accepted"}}).then(resp=>{
        res.json({"message":"ok"})
    }).catch((err)=>{
        console.log(err);
    })
}





}