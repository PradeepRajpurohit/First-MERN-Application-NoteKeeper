import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext'

export default function Signup(props) {

    const context = useContext(NoteContext);
    const {getUserDetail} = context;
    let navigate = useNavigate();
    const [cred, setCred] = useState({ name:"", email: "", password: "",cpassword:"" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(cred.password!==cred.cpassword){
            props.showAlert("danger","Password in both the field should be same.")
        }
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:cred.name, email: cred.email, password: cred.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save authtoken and redirect the page
            localStorage.setItem('token', json.authToken)
            getUserDetail();
            navigate("/");
            props.showAlert("success","Created a new accout succesfully")
        }
        else {
            props.showAlert("danger",json.error)
        }
    }

    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-2'>
            <h2 className='mb-4'>Create a new Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' value={cred.name} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emial" name='email' value={cred.email} aria-describedby="emailHelp" onChange={onchange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' value={cred.cpassword} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
