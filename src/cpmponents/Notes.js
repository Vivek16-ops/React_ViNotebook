import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Notesitem from './Notesitem'
import Addnote from './Addnote'

const Notes = () => {
    let context = useContext(noteContext)
    const { notes, getAllNotes, modifyNotes } = context
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)

    const updatesNotes = (currentNote) => {
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        ref.current.click()
    }

    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value });
    }

    const handleClick = (e) => {
        ref.current.click()
        modifyNotes(note.id, note.etitle, note.edescription, note.etag)
    }


    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="container my-3">
                <div className="row my-3">
                    <Addnote />
                    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="my-3">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button disabled={note.etitle.length<=5 || note.edescription.length<=5 || note.etag.length<=3} ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={handleClick} type="button" className="btn btn-primary" >Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <h1>Your Notes</h1>
                        {notes.length <= 0 && <span>No Notes To Preview</span>}
                    </div>
                    {notes.map((note) => {
                        return <Notesitem key={note._id} updateNotes={updatesNotes} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
