import express, { response } from 'express'
import UserModel from '../models/user'
import UcenikModel from '../models/ucenik'
import NastavnikModel from '../models/nastavnik'
import PredmetModel from '../models/predmet'



export class UserController{

    login = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
       
        

        
        UserModel.findOne({username: usernameP}).then((user)=>{
           
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        })
    }

    register = (req: express.Request, res: express.Response)=>{

        let user = new UserModel({
            username:req.body.username,
            password:req.body.password,
            safetyquestion:req.body.pitanje,
            firstname:req.body.ime,
            lastname:req.body.prezime,
            gender:req.body.pol,
            address:req.body.adresa,
            phone:req.body.kontakt,
            email:req.body.email,
            safetyresponse:req.body.odgovor,
            type:req.body.type,
            avatar:req.body.slika,
            active:req.body.active
        })

        user.save().then(resp=>{
            res.json({"message":"Uspesna registracija!"})
        }).catch((err)=>{
            console.log(err)
        })
    }

    emailcheck = (req: express.Request, res: express.Response)=>{

        let email = req.body.email;

        UserModel.findOne({email: email}).then((user)=>{
               
                res.json(user)
            }).catch((err)=>{
                console.log(err)
            })

    }

    usernamecheck = (req: express.Request, res: express.Response)=>{
        

        let username = req.body.username;

        UserModel.findOne({username: username}).then((user)=>{
               
                res.json(user)
            }).catch((err)=>{
                console.log(err)
            })

    }


    uploadimage = (req: express.Request, res: express.Response)=>{

        let slika = req.body.slika;
        let username=req.body.username;
       

        UserModel.updateOne({username:username},{$set:{avatar:slika}}).then(resp=>{
            
            res.json({"message":"ok"})
        }).catch((err)=>{
            
            console.log(err)
        })

    }

    regucenik = (req: express.Request, res: express.Response)=>{

        let user = new UcenikModel({
            username:req.body.username,
            school:req.body.skola,
            grade:req.body.razred,
            scheduledClasses:req.body.scheduledClasses
            
        })

        user.save().then(resp=>{
            res.json({"message":"You are registerd!!"})
        }).catch((err)=>{
            console.log(err)
        })
        

    }


    regnastavnik = (req: express.Request, res: express.Response)=>{

        let user = new NastavnikModel({

            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            subjects:req.body.subjects,
            grade:req.body.grade,
            question:req.body.question,
            cv:req.body.cv,
            scheduledClasses:req.body.scheduledclasses,
            status:req.body.status
            
        })

        user.save().then(resp=>{
            res.json({"message":"Your registration request has been sent!"})
        }).catch((err)=>{
            console.log(err)
        })
        

    }

    changepassword = (req: express.Request, res: express.Response)=>{

        let newpassword = req.body.newpassword;
        let username=req.body.username;
       

        UserModel.updateOne({username:username},{$set:{password:newpassword}}).then(resp=>{
            
            res.json({"message":"Password changed!"})
        }).catch((err)=>{
            
            console.log(err)
        })

    }

    getStudentsNum = (req: express.Request, res: express.Response)=>{

        UserModel.countDocuments({'type':'ucenik'}).then((num)=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })

    }
    getTeachersNum = (req: express.Request, res: express.Response)=>{

        UserModel.countDocuments({type:'nastavnik',active:true}).then((num)=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })

    }

    getAllTeachers = (req: express.Request, res: express.Response)=>{

        UserModel.find({type:'nastavnik',active:false}).then((users)=>{
            res.json(users);
        }).catch((err)=>{
            console.log(err);
        })

    }

    getActiveTeachers = (req: express.Request, res: express.Response)=>{

        UserModel.find({type:'nastavnik',active:true}).then((users)=>{
            res.json(users);
        }).catch((err)=>{
            console.log(err);
        })

    }

    getCV = (req: express.Request, res: express.Response)=>{

        let username=req.body.username;

        NastavnikModel.findOne({username:username}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err);
        })

    }

    uploadPdf = (req: express.Request, res: express.Response)=>{

        

    }

    acceptUser = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;

        UserModel.updateOne({username:username},{$set:{active:true}}).then(resp=>{
            res.json({"message":"Accepted"})
        }).catch((err)=>{
            console.log(err);
        })

    }





    edit  = (req: express.Request, res: express.Response)=>{

        let username = req.body.username;
        let firstname=req.body.firstname;
        let lastname=req.body.lastname;
        let address=req.body.address;
        let email=req.body.email;
        let phone=req.body.phone;
        let avatar=req.body.avatar;
        
        UserModel.updateOne({username:username},{$set:{firstname:firstname,lastname:lastname,address:address,email:email,phone:phone,avatar:avatar}}).then(resp=>{
            res.json({"message":"ok"})
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    countMaleStudents = (req: express.Request, res: express.Response)=>{

        UserModel.find({gender:'muski',type:'ucenik'}).then(num=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })

    }

    countFemaleStudents = (req: express.Request, res: express.Response)=>{

        UserModel.find({gender:'zenski',type:'ucenik'}).then(num=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    
    countFemaleTeachers = (req: express.Request, res: express.Response)=>{

        UserModel.find({gender:'zenski',type:'nastavnik'}).then(num=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })
        
    }
    countMaleTeachers = (req: express.Request, res: express.Response)=>{

        UserModel.find({gender:'muski',type:'nastavnik'}).then(num=>{
            res.json(num);
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    deleteUser = (req: express.Request, res: express.Response)=>{

        let username=req.body.username;

        UserModel.deleteOne({username:username}).then(resp=>{
            res.json({"message":"ok"})
        }).catch((err)=>{
            console.log(err);
        })
    } 


    getAllStudents = (req: express.Request, res: express.Response)=>{

        UserModel.find({type:'ucenik'}).then(user=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err);
        })
    }
    




}