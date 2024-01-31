import express from "express"
import fetchuser from '../middleware/Fetchuser.js'
import { Notes } from "../models/Notes.js"
import { body, validationResult } from "express-validator"
const router = express.Router()

// Use built-in JSON parsing as well
router.use(express.json());

// Router 1: Create a route for fetch notes using GET
router.get('/fetchnote', fetchuser, async (req, res) => {
    try {
        //Finding if the notes is available with help of tokens and display it
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
        //Adding notes and if user has wrong token then request get rejected by the middleware fetchuser before it appear here 
        const { title, description, tag } = req.body;
        const notes = new Notes({ user: req.user.id, title, description, tag });
        let savedNotes = await notes.save()
        res.json(savedNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error notes.js" })
    }
})


// Routes 3: Creating the Endpoint for updating the notes
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    let newNotes = {}

    if (title !== undefined) { newNotes.title = title }
    if (description !== undefined) { newNotes.description = description }
    if (tag !== undefined) { newNotes.tag = tag }

    try {
        //Finding Notes 
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        //cheking if the user is aunthentic or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // update the existing note into newNode
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Internal Sever Error notes.js" })
    }
})


// ROUTE 4: Delete an existing Note using: DELETE
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

export default router;