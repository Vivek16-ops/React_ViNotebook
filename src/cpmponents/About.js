import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
    let a = useContext(noteContext)
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <h1>This is About Page</h1>
            <h2>My name is {a.myVar.name} and my profession is {a.myVar.profession}</h2>
        </div>
    )
}

export default About
