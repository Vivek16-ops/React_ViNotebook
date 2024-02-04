import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    let host = "http://localhost:5000"
    const [notes, setnotes] = useState([])
    const{showAlert} = props

    let getAllNotes = async () => {
        //Adding the API Call
        const response = await fetch(`${host}/api/notes/fetchnote`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYjVkNGI5MjViZTBjYjFiY2I5YWYzIn0sImlhdCI6MTcwNjc3OTM2Mn0.4d0vxNCfx4pALDp2AWFigs2s7HJfcRS-4cuRdQ8bokQ"
            }
        });

        //For FrontEnd update
        const json = await response.json()
        setnotes(json)
    }

    // Add a note
    let addNotes = async (title, description, tag) => {
        //Adding the API Call
        const response = await fetch(`${host}/api/notes/addingnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYjVkNGI5MjViZTBjYjFiY2I5YWYzIn0sImlhdCI6MTcwNjc3OTM2Mn0.4d0vxNCfx4pALDp2AWFigs2s7HJfcRS-4cuRdQ8bokQ"
            },
            body: JSON.stringify({ title, description, tag })
        });

        //For Frontend update
        const json = await response.json()
        setnotes(notes.concat(json))
        showAlert("Notes has been added","success")
    }

    //Delete a note
    let deleteNotes = async (id) => {
        //TODO - API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYjVkNGI5MjViZTBjYjFiY2I5YWYzIn0sImlhdCI6MTcwNjc3OTM2Mn0.4d0vxNCfx4pALDp2AWFigs2s7HJfcRS-4cuRdQ8bokQ"
            },
        });

        //For FrontEnd Update
        let newNote = notes.filter((note) => note._id !== id);
        setnotes(newNote)
        showAlert("Notes has been deleted","danger")
    }

    //Update a note
    let modifyNotes = async (id, title, description, tag) => {
        //Adding the API Call
        await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViYjVkNGI5MjViZTBjYjFiY2I5YWYzIn0sImlhdCI6MTcwNjc3OTM2Mn0.4d0vxNCfx4pALDp2AWFigs2s7HJfcRS-4cuRdQ8bokQ"
            },
            body: JSON.stringify({ title, description, tag })
        });

        //For FrontEnd Update
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag; 
                break; 
            }
        }
        setnotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, getAllNotes, addNotes, deleteNotes, modifyNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState