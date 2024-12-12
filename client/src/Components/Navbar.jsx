import React from "react";

function Navbar() {

  const user = JSON.parse(localStorage.getItem('currentUser'));

  function logout (){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/home">
          <img
            className="img-logo"
              src="/logo-meethub.png"
              width="60"
              alt="logo"
              style={{
                borderRadius: '50%',
            }}
          />
          MeetHub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-bars" style={{color: 'white'}}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
          {user ? (
            <>
            <div className="dropdown ">
              <button 
                className="btn btn-secondary dropdown-toggle d-flex align-items-center justify-content-between" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false" 
                style={{ fontSize: '16px', width: '100%' }}>
                <div className="d-flex align-items-center">
                  <i className="fa fa-user mr-3" style={{ fontSize: '24px' }}></i>
                </div>
                <div className="text-center" style={{ flexGrow: 1 }}>
                  <div>{user.name}</div>
                  <div style={{ fontSize: '12px', color: '#ccc' }}>{user.isAdmin ? 'Admin' : 'Cliente'}</div>
                </div>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/profile">Perfil</a>
                </li>
                {user.isAdmin === true &&(
                  <li>
                    <a className="dropdown-item" href="/admin">Administrador</a>
                  </li>
                )}
                <li><a className="dropdown-item" href="/" onClick={logout}>Cerrar sesión</a></li>
                
              </ul>
            </div>
            </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Registrarse
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
