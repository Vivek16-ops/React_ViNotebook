import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    let initialNotes =
        [
            {
                "_id": "65bd14a591c3eec42653f0ae",
                "user": "65bb5d4b925be0cb1bcb9af3",
                "title": "Hrsh Choudhary",
                "description": "Heyy this is Harsh Notes",
                "tag": "Harsh123",
                "date": "2024-02-02T16:13:25.233Z",
                "__v": 0
            },
            {
                "_id": "65bd14b091c3eec42653f0b0",
                "user": "65bb5d4b925be0cb1bcb9af3",
                "title": "Hrsh Choudhary 2",
                "description": "Heyy this is Harsh Notes 2",
                "tag": "Harsh146346",
                "date": "2024-02-02T16:13:36.472Z",
                "__v": 0
            },
            {
                "_id": "65bd14c691c3eec42653f0b2",
                "user": "65bb5d4b925be0cb1bcb9af3",
                "title": "Hrsh Choudhary 3",
                "description": "Heyy this is Harsh Notes 3",
                "tag": "6758685965",
                "date": "2024-02-02T16:13:58.753Z",
                "__v": 0
            }
        ]

    const [notes, setnotes] = useState(initialNotes)
    return (
        <NoteContext.Provider value={{notes, setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState