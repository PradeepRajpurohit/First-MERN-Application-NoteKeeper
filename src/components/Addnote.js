import React, {useContext,useState} from 'react'
import NoteContext from '../context/note/NoteContext'

export default function Addnote(props) {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:"default"});

    const handleClick = (e) =>{
        e.preventDefault();
            props.showAlert("success","New Note is Added.")
            addNote(note.title,note.description,note.tag);
    }
    const onchange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (

        <div className='container'>
            <h2 className='my-4'>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
            </form>

        </div>
    )
}
