import { useState } from 'react';
import NoteContext from './notecontext';
const NoteState = (props) => {
    const host = "https://notebook-yqkm.onrender.com"
    const [notes, setNotes] = useState([]);
    const getNotes =async()=>{
        const response = await fetch(`${host}/api/note/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
        });
        const json = await response.json(); 
        setNotes(json)
        
    }
    const addNote = async(title, description, tag) => {
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }),
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/note/delete/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }


    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/note/update/${id}`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({ title, description, tag }),
        });
            
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i]
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
                }
             }
            setNotes(newNotes)
      };
    
    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
    }
 export default NoteState;