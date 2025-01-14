import express from "express"
import orderModel from "../models/Order.js"
import mongoose from "mongoose"
const orderRouter = express.Router()


orderRouter.post("/orders", async (req, res) => {
    const  {eId } = req.body
    //orders is a list of objects, each object contain email, id, and a list of objects having date and ordered items
    try{
        const orders = await mongoose.connection.db.collection("orders").find({}).toArray()
        for(const userOrders of orders){
            if(userOrders.email === eId){
                let ordersList = {}
                let key          
                let order_data = userOrders.order_data
                for(let i=0; i<order_data.length; i++){
                    let ordersOfDate =[]
                    for(let j=1; j<order_data[i].length; j++){
                        ordersOfDate.push(order_data[i][j])
                    }
                    key = order_data[i][0].order_date
                    ordersList[key] = !ordersList[key]? ordersOfDate : ordersList[key].concat(ordersOfDate) 
                }
                return res.status(200).json({success: true, ordersList: ordersList})
            }
        }
    } catch(error){
        console.log(error)
        res.status(500).json({success: false})
    }
    return res.json(orders)
})

orderRouter.post("/createOrder", async (req, res) => {
    const {order_data, email, order_date} = req.body;
    order_data.splice(0, 0, {order_date: order_date})

    let eId = await orderModel.findOne({'email' : email})
    //create new documents for new users
    if(eId === null){
        try{
            await orderModel.create({
                email: email,
                order_data: [order_data]
            })
            return res.json({success: true})
        } catch(error){
            console.log(error.message)
            res.status(500).send("Server error creating orders")
        }
    } else{
        try{
            await orderModel.findOneAndUpdate({email: email},
            {$push: {order_data: order_data}})
            return res.json({success: true})
        } catch(error){
            console.log(error.message)
            res.send("Server error addding orders")
        }
    }
})

export default orderRouter