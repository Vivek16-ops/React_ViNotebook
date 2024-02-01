import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    let s1 = {
        name: "Vivek",
        profession: "Coder"
    }
    const [myVar, setMyVar] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setMyVar({
                name: "Vivek Raj",
                profession: "Pro-Coder"
            })
        }, 1500)
    }
    return (
        <NoteContext.Provider value={{myVar, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState