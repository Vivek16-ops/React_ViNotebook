import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import Notesitem from './Notesitem'
import Addnote from './Addnote'

const Notes = () => {
    let context = useContext(noteContext)
    const { notes } = context
    return (
        <div className="container my-3">
            <div className="row my-3">
                <Addnote />
                <h1>Your Notes</h1>
                {notes.map((note) => {
                    return <Notesitem key={note._id} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
