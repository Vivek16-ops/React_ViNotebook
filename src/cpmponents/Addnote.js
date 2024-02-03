import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'


const Addnote = () => {
    const context = useContext(noteContext)
    const { addNotes } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();//As using state the component usually re-render but this function stops the page for re-rendering
        addNotes(note.title, note.description, note.tag)
    }
    const onchange = (e) => {
        //Here first we load the value entered into the name section then overite in the same structure as a note has been created
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add Notes</h1>
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="titlehelp" placeholder="Enter Title" name='title' onChange={onchange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" placeholder="Enter Description" name="description"  onChange={onchange} />
                </div>

                <div className="form-group">
                    <label htmlFor="tag">Tags</label>
                    <input type="text" className="form-control" id="tag" placeholder="Specify Tag" name="tag"  onChange={onchange} />
                </div>
                
                <button type="submit" className="btn btn-primary mt-2" onClick={handleclick}>Add Note</button>
            </form>
        </>
    )
}

export default Addnote
