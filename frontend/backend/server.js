import express from 'express'
import dotenv from 'dotenv'
import {connectDB} from './db.js'
import UserRouter from './routes/userEndpoint.js'
import orderRouter from './routes/orderRouter.js'
import DisplayDataRouter from './routes/DisplayData.js'
import cors from 'cors'

dotenv.config()
export const {food_items, food_category} = await connectDB();


const app = express()
//setting up cors

const corsOptions = {
    origin: '*',
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true,
}

app.use(cors(corsOptions))

//for parsing json
app.use(express.json())

app.use('/api', UserRouter)
app.use('/api', DisplayDataRouter)
app.use('/api', orderRouter)

app.get('/', (req, res) => {
    return res.send("hello world")
})

app.listen(process.env.PORT, () => {
    console.log(`server is listening on port: ${process.env.PORT}`)
})