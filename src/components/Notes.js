import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext'
import Notesitem from "./Notesitem";
import AddNotes from './AddNote';
import { useNavigate } from 'react-router-dom';
const Note = (props) => {
    
    document.body.style.backgroundColor="#b8b8db"

    const navigate=useNavigate()
    const context = useContext(noteContext)     
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        const token=localStorage.getItem('token')
        
        if(!token){
            navigate('/login')
        }
        else{
            getNotes()
        }
    }, [getNotes,navigate]);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNotes) => {
        ref.current.click()
        setNote({ id: currentNotes._id, etitle: currentNotes.title, edescription: currentNotes.description, etag: currentNotes.tag })
    }
    const onClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert('Note updated successfully','success')
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (<>
        <AddNotes showAlert={props.showAlert}/>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label" >description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">tag</label>
                                <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 3} className="btn btn-primary" onClick={onClick}>Update Notes</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="row my-3">
            <h2>Your Notes</h2>
            <div className="container mx-1">{notes.length === 0 && "No Notes are added to display"}
            </div>

            {notes.map((notes) => {
                return <Notesitem key={notes._id} updateNote={updateNote} notes={notes} showAlert={props.showAlert} />
            })}
        </div>
    </>
    )
}

export default Note;