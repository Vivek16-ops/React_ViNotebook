import express from "express"
const router = express.Router()


router.get('/', (req, res) => {
    res.send('User Notes Home Page')
})

router.get('/about', (req, res) => {
    res.send('User Notes About Page')
})

export default router;