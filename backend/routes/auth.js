import express from "express"
import { User } from "../models/User.js"
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
router.post('/', (req, res) => {
    console.log(req.body)
    let user = new User(req.body)
    user.save()
    res.send(req.body)
})

export default router;