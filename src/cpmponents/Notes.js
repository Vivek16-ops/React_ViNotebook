import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import Notesitem from './Notesitem'

const Notes = () => {
    let context = useContext(noteContext)
    const { notes, setnotes } = context
    return (
        <div className="row my-3">
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Notesitem key={note._id} note={note} />
            })}
        </div>
    )
}

export default Notes
