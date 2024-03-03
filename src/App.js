import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Emp from './components/Emp';
import State from './context/state';
import Alert from './components/Alert';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <State>
        <Router>
          <div style={{ minHeight: "100vh" }}>
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Dashboard showAlert={showAlert} />} />
              <Route exact path="/emp" element={<Emp showAlert={showAlert} />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </State>
    </>
  );
}

export default App;