import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

axios.defaults.withCredentials = true;
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  // const navigate = useNavigate();

  async function login(e) {
    e.preventDefault(e);
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const result = (await axios.post("/api/users/login", user)).data;
      setLoading(false);

      console.log(result);

      localStorage.setItem("currentUser", JSON.stringify(result.user));
      // navigate("/home");
      // Forzar recarga de la página al redirigir
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  }
  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center text-center mt-5">
        <div className="col-md-5 mt-5">
          {error && (
            <Error message="Correo o contraseña incorrectos. Intente nuevamente" />
          )}
          <form className="bs" onSubmit={(e) => login(e)}>
            <h2 className="">Iniciar sesión</h2>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-4 px-3 py-2" >
              {" "}
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
