import {useState, useEffect} from 'react';
import axios from "axios";

function LoginScreen() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login () {
      const user = {
        email,
        password,
      }
      
      try {
        const result = await axios.post('/api/users/login', user).data
      } catch (error) {
        console.log(error)
      }
      
  }
  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <div className='bs'>
            <h2 className=''>Iniciar sesión</h2>
            <input type='text' className='form-control' placeholder='Correo electrónico' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='Contraseña' value={password} onChange={(e) => {setPassword(e.target.value)}}/>

            <button className='btn btn-primary mt-3' onClick={login}> Ingresar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen