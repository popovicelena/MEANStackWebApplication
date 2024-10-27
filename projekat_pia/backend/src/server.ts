import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import nastavnikRouter from './routers/nastavnik.routes';
import casRouter from './routers/cas.routes';
import ucenikRouter from './routers/ucenik.routes';




const app = express();
app.use(cors())
app.use(express.json({limit: '3mb'}))




mongoose.connect('mongodb://localhost:27017/probaDB')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})




const router = express.Router();
router.use('/users', userRouter)
router.use('/nastavnici', nastavnikRouter)
router.use('/ucenici', ucenikRouter)
router.use('/cas', casRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));