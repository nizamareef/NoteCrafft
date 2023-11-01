import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext'

 const  Notesitem=(props)=> {
    const context=useContext(noteContext)
    const{deleteNote}=context
    const{notes,updateNote}=props
    
  return (
    <div className='col-md-4 '>
      <div className="card my-3 text-white bg-dark " >
  <div className="card-body text-muted ">
    <h5 className="card-title text-white bg-dark ">{notes.title}</h5>
    <p className="card-text text-white bg-dark">{notes.description} </p>
    <i className="far fa-trash-alt mx-2 text-white bg-dark" onClick={()=>{deleteNote(notes._id);props.showAlert('Note deleted successfully!','success')}}></i>
    <i className="far fa-edit mx-2 text-white bg-dark" onClick={()=>{updateNote(notes)}}></i>
  </div>
</div>
    </div>
  )
}
export default Notesitem;
