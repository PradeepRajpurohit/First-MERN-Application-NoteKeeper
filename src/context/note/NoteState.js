import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initial = []

    const [notes, setNotes] = useState(initial);
    const [user,setUser] = useState({});
    const [show,setShow] = useState("d-none");

    //Get all Note
    const getNotes = async () => {

        //Api call for addNote
        const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a Note
    const addNote = async (title, description, tag) => {

        //Api call for addNote
        const response = await fetch(`${host}/api/note/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json();
        console.log(json)

        //Logic for addNote
        const note = {
            "_id": {
                "$oid": "6429dfa6dd9b3ac44b06b3716"
            },
            "title": title,
            "description": description,
            "tag": tag,
            "date": {
                "$date": "2023-04-02T20:03:50.954Z"
            },
            "__v": 0
        }
        setNotes(notes.concat(note))

    }

    //Delete a Note
    const deleteNote = async (id) => {

        //Api call for deleteNote
        const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const json = response.json();
        console.log(json)

        //Logic to deleteNote
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) => {

        //API call for editNote
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = response.json();
        console.log(json)
        getNotes();
    }


        //Get userDetails
        const getUserDetail = async () => {

            //Api call for addNote
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            setUser(json);
        }
    


    return (
        <NoteContext.Provider value={{show,user, notes,setShow, addNote, deleteNote, editNote, getNotes, getUserDetail }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;