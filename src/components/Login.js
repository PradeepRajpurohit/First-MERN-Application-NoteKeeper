import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext'

export default function Login(props) {

    const context = useContext(NoteContext);
    const {getUserDetail} = context;
    let navigate = useNavigate();
    const[cred, setCred] = useState({email:"",password:""})
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:cred.email,password:cred.password}),
        });
        const json = await response.json();
        if(json.success){
            //save authtoken and redirect the page
            localStorage.setItem('token',json.authToken)
            getUserDetail();
            props.showAlert("success","successfully Login.")
            navigate("/");
        }
        else{
            props.showAlert("danger",json.error)
        }
    }


    const onchange = (e) =>{
        setCred({...cred,[e.target.name]:e.target.value})
    }

    return (
        <div className='container my-2'>
            <h2 className='mb-4'>Login to Continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emial" name='email' value={cred.email} aria-describedby="emailHelp" onChange={onchange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onchange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
