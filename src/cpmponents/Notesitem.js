import React , {useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const Notesitem = (props) => {
    const { note , updateNotes} = props
    const context = useContext(noteContext)
    const {deleteNotes} = context
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }} >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNotes(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNotes(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
