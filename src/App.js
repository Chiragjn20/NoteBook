 import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { Home } from "./Component/Home";
import About from "./Component/About";
import NodeState from "./Context/Notes/NodeState";
import Alert from "./Component/Alert";

function App() {
  return (
    <NodeState>
      <Router>
        <Navbar />
        <Alert message ="kaakle"/>
        <div className="container">
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </NodeState>
  );
}

export default App;
