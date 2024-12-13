import {useState, useEffect} from 'react';
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import Success from '../Components/Success';


function RegisterScreen() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSucces] = useState();

  async function register (e) {
    e.preventDefault();
    if(password === cpassword) {
      const user = {
        name, 
        email,
        password,
        cpassword
      }
      
      try {
        setLoading(true);
        const result = await axios.post('/api/users/register', user).data
        setLoading(false);
        setSucces(true);

        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');

      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Las contraseñas no coinciden')
    }
  }
  return (
    <div>
      {loading && (<Loader />)}
      {error && (<Error />)}
      <div className='row justify-content-center  text-center mt-5'>
        <div className='col-md-5 mt-5'>
        {success && (<Success message="Registro exitoso" />)}
          <form className='bs p-4 register-form' onSubmit={(e) => register(e)}>
            <h2 className=''>Registrate</h2>
            <input type='text' className='form-control' placeholder='Nombre' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <input type='email' className='form-control' placeholder='Correo electrónico' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='Contraseña' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <input type='text' className='form-control mb-2' placeholder='Confirma la contraseña' value={cpassword} onChange={(e) => {setCpassword(e.target.value)}}/>

            <button className='btn btn-primary mt-4 px-3 py-2' > Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen