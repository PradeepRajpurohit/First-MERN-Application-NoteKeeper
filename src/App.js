import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About'
import NoteState from './context/note/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';


function App() {
  const [alert,setAlert] = useState(null);

  const showAlert = (type,msg)=>{
    setAlert({
      type:type,
      msg:msg
    })
    setInterval(() => {
      setAlert(null);
    }, 5000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>
          <Routes>
            <Route exact path='/' element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path='/about' element={<About />}></Route>
            <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
