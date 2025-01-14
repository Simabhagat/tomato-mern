import { food_items,food_category } from "../server.js";
import express from 'express'

const DisplayDataRouter = express.Router()

DisplayDataRouter.get('/foodData', (req, res) => {
    try {
        res.status(200).send([food_items,food_category])
    } catch(error){
        console.error(error.message)
        res.status(500).send("server error")
    }
})

export default DisplayDataRouter