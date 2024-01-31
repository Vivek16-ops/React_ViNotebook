import express from "express"
import fetchuser from '../middleware/Fetchuser.js'
import { Notes } from "../models/Notes.js"
import { body, validationResult } from "express-validator"
import bodyParser from 'body-parser';
const router = express.Router()

// Use built-in JSON parsing as well
router.use(express.json());

// Ensure body-parser is configured
router.use(bodyParser.json()); 

// Router 1: Create a route for fetch notes using GET
router.get('/fetchnote', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error notes.js" })
    }
})


// Routes 2: Adding a notes endpoints using POST 
router.post('/addingnotes', fetchuser, [
    body('title', 'Title is short to handle').isLength({ min: 3 }),
    body('description', 'Discription too short').isLength({ min: 5 }),
    body('tag', 'Tag is soo small').isLength({ min: 5 }),
], async (req, res) => {

    //If there are error with validation of above credential, return bad request and error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({ user: req.user.id, title, description, tag });
        let savedNotes = await notes.save()
        res.json(savedNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error notes.js" })
    }
})


export default router;