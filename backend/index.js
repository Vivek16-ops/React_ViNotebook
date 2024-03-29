import express from 'express';
import mongoose from 'mongoose';
import auth from './routes/auth.js'
import notes from './routes/notes.js'
import cors from 'cors';
const app = express()
const port = 5000

//connecting to the mongoDb
await mongoose.connect('mongodb://127.0.0.1:27017/ViNotebook');

//Middleware that allow to connect with browser
app.use(cors())


//Available Routes
app.use('/api/auth', auth)
app.use('/api/notes', notes)

//This Middleware is the parser that parse request json and display in the req body
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`ViNotebook listening on port ${port}`)
})