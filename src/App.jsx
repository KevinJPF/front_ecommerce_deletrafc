import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewClient from "./pages/NewClient/NewClient";
import ClientsList from "./pages/ClientsList/ClientsList";

function App() {
  return (
    <>
      <div className="app_container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/clients" element={<ClientsList />} />
              <Route path="/new-client" element={<NewClient />} />
              <Route path="/new-client/:id" element={<NewClient />} />
            </Route>
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
