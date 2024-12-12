import React from "react";
import { Link } from "react-router-dom";

function LandingScreen() {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-12 text-center">
        <h2 className="titulo" style={{ fontSize: "200px" }}>
          MeetHub
        </h2>
        <h1 style={{ color: "#88A9C3", fontSize: "30px" }}>
          Gestiona tus salas, maximiza tu tiempo
        </h1>

        <Link to="/home">
          <button className="btn landing-btn mt-5" style={{ color: "black", fontSize:'20px', fontWeight: 'bold' }}>
            Ingresar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingScreen;
