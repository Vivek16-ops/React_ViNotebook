import express from "express"
import { User } from "../models/User.js"
import { body, validationResult } from "express-validator"
const router = express.Router()

//Handles incoming json
router.use(express.json())

router.get('/', (req, res) => {
    res.send('User Authentication Home Page')
})

router.get('/about', (req, res) => {
    res.send('User Authentication About Page')
})

//Create a user using POST: /api/auth .
router.post('/', [
    body('user_name', 'The name is not valid').isLength({ min: 3 }),
    body('email', 'Invalid Email').isEmail(),
    body('password', 'To short password').isLength({ min: 5 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password
    }).then((user) => res.json(user)).catch((err) => {
        console.log("Same Email Used Again"), res.json(err)
    })
})

export default router;