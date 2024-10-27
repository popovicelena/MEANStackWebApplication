import express from 'express'
import { UserController } from '../controllers/user.controller';
import { PredmetiController } from '../controllers/predmeti.controller';
import { UcenikController } from '../controllers/ucenik.controller';
import { NastavnikController } from '../controllers/nastavnik.controller';
import { CasController } from '../controllers/cas.controller';



const userRouter = express.Router();



userRouter.route('/login').post(
    (req,res)=> new UserController().login(req,res)
)

userRouter.route('/register').post(
    (req,res)=> new UserController().register(req,res)
)

userRouter.route('/emailcheck').post(
    (req,res)=> new UserController().emailcheck(req,res)
)

userRouter.route('/usernamecheck').post(
    (req,res)=> new UserController().usernamecheck(req,res)
)

userRouter.route('/uploadimage').post(
    
    (req,res)=> {
        new UserController().uploadimage(req,res)}
)

userRouter.route('/regucenik').post(
    (req,res)=> new UserController().regucenik(req,res)
)

userRouter.route('/regnastavnik').post(
    (req,res)=> new UserController().regnastavnik(req,res)
)

userRouter.route('/changepassword').post(
    (req,res)=> new UserController().changepassword(req,res)
)

userRouter.route('/numstudents').get(
    (req,res)=> new UserController().getStudentsNum(req,res)
)

userRouter.route('/numteachers').get(
    (req,res)=> new UserController().getTeachersNum(req,res)
)

userRouter.route('/getAllTeachers').get(
    (req,res)=> new UserController().getAllTeachers(req,res)
)
userRouter.route('/getActiveTeachers').get(
    (req,res)=> new UserController().getActiveTeachers(req,res)
)
userRouter.route('/getCV').post(
    (req,res)=> new UserController().getCV(req,res)
)

userRouter.route('/acceptUser').post(
    (req,res)=> new UserController().acceptUser(req,res)
)

userRouter.route('/addSubject').post(
    (req,res)=> new PredmetiController().addSubject(req,res)
)

userRouter.route('/getSubject').post(
    (req,res)=> new PredmetiController().getSubject(req,res)
)

userRouter.route('/getTeacher').post(
    (req,res)=> new NastavnikController().getTeacher(req,res)
)

userRouter.route('/getAllSubjects').get(
    (req,res)=> new PredmetiController().getAllSubjects(req,res)
)

userRouter.route('/getStudent').post(
    (req,res)=> new UcenikController().getStudent(req,res)
)

userRouter.route('/updateStudent').post(
    (req,res)=> new UcenikController().updateStudent(req,res)
)

userRouter.route('/updateGrade').post(
    (req,res)=> new UcenikController().updateGradeSchool(req,res)
)

userRouter.route('/edit').post(
    (req,res)=> new UserController().edit(req,res)
)


userRouter.route('/getTeachers').post(
    (req,res)=> new UcenikController().getTeachers(req,res)
)

userRouter.route('/countMaleStudents').get(
    (req,res)=> new UserController().countMaleStudents(req,res)
)

userRouter.route('/countFemaleStudents').get(
    (req,res)=> new UserController().countFemaleStudents(req,res)
)
userRouter.route('/countFemaleTeachers').get(
    (req,res)=> new UserController().countFemaleTeachers(req,res)
)
userRouter.route('/countMaleTeachers').get(
    (req,res)=> new UserController().countMaleTeachers(req,res)
)
userRouter.route('/deleteUser').post(
    (req,res)=> new UserController().deleteUser(req,res)
)
userRouter.route('/getAllStudents').get(
    (req,res)=> new UserController().getAllStudents(req,res)
)
userRouter.route('/getAllClasses').get(
    (req,res)=> new CasController().getAllClasses(req,res)
)





export default userRouter;