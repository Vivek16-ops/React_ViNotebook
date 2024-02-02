import './App.css';
import Navbar from './cpmponents/Navbar';
import Home from './cpmponents/Home';
import About from './cpmponents/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Alert from './cpmponents/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message={"This is very good website"}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;