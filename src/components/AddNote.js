import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/notecontext'


const  AddNotes=(props)=>{
    document.body.style.backgroundColor="#b8b8db"
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert('Note Added Sucessfully','success')
       
    }                                                                       
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
        
    }

    return (
        <div>
            <h1 className='my-3'>Add Your Notes</h1>
            <div className='container my-3'>
                <form style={{margin:"10px" }}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5 &&  note.description.length<5} type="submit" className="btn btn-success" onClick={onClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes;

