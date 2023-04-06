import React, { useEffect,useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext';

export default function Navbar(props) {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const {user,setShow,show} = context;
    const handleLogout = () => {
        props.showAlert("success", "Logged out successfully.")
        localStorage.removeItem('token');
        navigate('/login');
        setShow("d-none")
    }
    let location = useLocation();
    useEffect(() => {

    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className={`dropdown ${show}`}>
                    <button className="btn btn-secondary toggle rounded-circle mx-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-user"></i>
                    </button>
                    <div className="dropdown-menu text-center p-2" aria-labelledby="dropdownMenuButton1">
                        <h4>User Details</h4>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
                        </li>
                    </ul>



                    {!localStorage.getItem('token') ? <div>
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
                    </div> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                </div>
            </div>

        </nav>
    )
}
