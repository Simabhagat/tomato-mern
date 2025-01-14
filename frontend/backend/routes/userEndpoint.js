import express from 'express';
import userModel from "../models/user.js";
import { body, matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserRouter = express.Router();

const CreateEmailChain = () => {
    return (
        body('email')
            .notEmpty().withMessage('email is required')
            .isEmail().withMessage('Invalid email')
            .escape()
    )
}
const CreateNameChain = () => {
    return (
        body('name')
            .notEmpty().withMessage('name is required')
            .isAlpha().withMessage('name should be only alphabet')
            .isLength({ min: 4 }).withMessage('name should be minumum 4 characters long')
            .escape()
    )
}
const CreatePasswordChain = () => {
    return (
        body('password')
            .notEmpty().withMessage('password is required')
            .isLength({ min: 5 }).withMessage('password should be minumum 4 characters long')
            .escape()
    )
}
const CreateLocationChain = () => body('location', 'Location is required').notEmpty().escape();

//create route

UserRouter.post('/createUser',
    CreateEmailChain(),
    CreateNameChain(),
    CreatePasswordChain(),
    CreateLocationChain(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "errors": errors.array() })
        }

        const formData = matchedData(req);
        const salt = await bcrypt.genSalt(10);
        formData.password = await bcrypt.hash(formData.password, salt)
        
        // const user = {
        //     name: name,
        //     password: password,
        //     email: email,
        //     location: location,
        // }

        //add to collection user 
        try {
            const userData = await userModel.create(formData)
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,process.env.JWT_SECRET)
            return res.json({ success: true , authToken: authToken})
        } catch (error) {
            console.log('Error: ', error)
            return res.status(500).json({ success: false })
        }
    })

UserRouter.post('/login',
    CreateEmailChain(),
    CreatePasswordChain(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ "errors": errors.array() })
        }
        const { email, password } = req.body

        try {
            const userData = await userModel.findOne({ email: email })

            if (!userData) {
                return res.status(400).json({ success: false ,error: "Invalid email address" })
            }

            const passwordCompare = (await bcrypt.compare(password,userData.password))
            if (!passwordCompare) {
                return res.status(400).json({ success: false, error: "invalid password" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,process.env.JWT_SECRET)
            return res.json({ success: true , authToken: authToken})

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "server error logging user" })
        }
    })

export default UserRouter;