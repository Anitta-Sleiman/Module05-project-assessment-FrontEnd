import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes.jsx";
// import Navbar from "./components/Navbar.js";
// import Footer from "./components/Footer.js";

const App = () => {
  return (
    <BrowserRouter>
      <div className="body d-flex flex-column">
        <div>
          {/* <Navbar /> */}
        </div>
        <div className="App  d-flex flex-column">
          <AppRoutes />
        </div>
        {/* <Footer /> */}
      </div>
     
    </BrowserRouter>
  );
};

export default App;

