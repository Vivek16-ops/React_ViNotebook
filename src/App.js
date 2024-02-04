import './App.css';
import Navbar from './cpmponents/Navbar';
import Home from './cpmponents/Home';
import About from './cpmponents/About';
import NoteState from './context/notes/NoteState';
import Login from './cpmponents/Login';
import SignUp from './cpmponents/SignUp';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Alert from './cpmponents/Alert';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null)

  const showAlert = (message, type) => {
      setalert({message:message,type:type})
      setTimeout(()=>{
        setalert(null)
      },1500)
  };
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/home" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signUp" element={<SignUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;