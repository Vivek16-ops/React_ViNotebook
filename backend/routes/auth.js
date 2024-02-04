import express from "express"
import { User } from "../models/User.js"
import { body, validationResult } from "express-validator"
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/Fetchuser.js'
const router = express.Router()

//Handles incoming json
router.use(express.json())

//Secret Key For Tokens
let privateKey = "VivekIsGoodBoy"

router.get('/', (req, res) => {
    res.send('User Authentication Home Page')
})

router.get('/about', (req, res) => {
    res.send('User Authentication About Page')
})

//Router 1: Create a user using POST request: /api/auth/createuser .
router.post('/createuser', [
    // Express Validator Implementation and Syntax 
    body('user_name', 'The name is not valid').isLength({ min: 3 }),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'To short password').isLength({ min: 5 }),
], async (req, res) => {

    let success = false
    //If there are error with validation of above credential, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        // check whether the user with same email exist already 
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "User already exist with this email" })
        }
        else {

            //Applying Encrypting technique for preventing hacking
            // Generate salt
            const salt = await bcrypt.genSalt(10);
            // Hash plaintext password with the generated salt
            const secretkey = await bcrypt.hash(req.body.password, salt);


            // create new user and adding intp data base using create function
            user = await User.create({
                user_name: req.body.user_name,
                email: req.body.email,
                password: secretkey
            })

            //Create Tokens for secured & easy communication between client and server 
            let data = {
                user: {
                    id: user.id
                }
            }
            success = true
            let authtoken = jwt.sign(data, privateKey)
            res.send({success, authtoken })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Server Error auth.js" })
    }
})

//Router 2:Login a user using user crednetials
router.post('/login', [
    // Express Validator Implementation and Syntax 
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;

    //If there are error with validation of email and password, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        // Fetching email and password from the request 
        const { email, password } = req.body

        // Finding if user exist in the database or not
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Please Enter Valid Credential" })
        }

        //Comparing password with the hash key : It returns either true or false
        const comparepassword = await bcrypt.compare(password, user.password)

        if (!comparepassword) {
            success = false
            return res.status(400).json({ success, error: "Please Enter Valid Credential" })
        }

        // Lastly send JWT Tokens
        let data = {
            user: {
                id: user.id
            }
        }
        success = true
        let authtoken = jwt.sign(data, privateKey)
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error auth.js" })
    }
})

// Router 3: Getting the user detail with help of the middleware and tokens
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let user_id = req.user.id;
        const user = await User.findById(user_id).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error auth.js" })
    }
})


export default router;