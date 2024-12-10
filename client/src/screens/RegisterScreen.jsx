import {useState, useEffect} from 'react';
import axios from "axios";

function RegisterScreen() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  async function register () {
    if(password ==cpassword) {
      const user = {
        name, 
        email,
        password,
        cpassword
      }
      
      try {
        const result = await axios.post('/api/users/register', user).data
        
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('Las contraseñas no coinciden')
    }
  }
  return (
    <div>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <div className='bs'>
            <h2 className=''>Registrate</h2>
            <input type='text' className='form-control' placeholder='Nombre' value={name} onChange={(e) => {setName(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='Correo electrónico' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='Contraseña' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <input type='text' className='form-control' placeholder='Confirma la contraseña' value={cpassword} onChange={(e) => {setCpassword(e.target.value)}}/>

            <button className='btn btn-primary mt-3' onClick={register}> Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen