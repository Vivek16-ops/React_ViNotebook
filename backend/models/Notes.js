import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    // creating User_info schema unique id as a foreign key in this collection 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User_info'
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "General" },
    date: { type: Date, default: Date.now }
});

const Notes = mongoose.model('notes', notesSchema);
export { Notes };