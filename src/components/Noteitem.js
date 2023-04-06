import React, {useContext} from 'react'
import NoteContext from '../context/note/NoteContext'

export default function Noteitem(props) {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    const {note,updateNote,showAlert} = props;
    return (

        <div className="card mb-3">
            <div className="card-body d-flex justify-content-between">
                <div>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                </div>
                <div>
                <i className="fa-solid fa-pen-to-square mx-4" onClick={()=>{updateNote(note)}}></i>
                <i className="fa-solid fa-trash mx-4" onClick={()=>{deleteNote(note._id); showAlert("success","Deted Note Successfully")} }></i>
                </div>
            </div>
        </div>

    )
}
