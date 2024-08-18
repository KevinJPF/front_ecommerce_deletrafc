import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app_container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/new-client" element={<NewLivro />} /> */}
          </Routes>
        </Router>
      </div>
      {/* <div className="footer-site">
        <p>Ver. 1.0.0</p>
        <p>Desenvolvido por: Kevin Juliano Pires Francisco</p>
      </div> */}
    </>
  );
}

export default App;
