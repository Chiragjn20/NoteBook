 import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { Home } from "./Component/Home";
import About from "./Component/About";
import NodeState from "./Context/Notes/NodeState";
import Login from "./Component/Login";
import SIgnup from "./Component/Signup";

function App() {
  return (
    <NodeState>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SIgnup />} />
          </Routes>
        </div>
      </Router>
    </NodeState>
  );
}

export default App;
