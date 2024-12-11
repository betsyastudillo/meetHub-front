import { Tabs } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'Perfil',
    children: <MyProfile />
  },
  {
    key: '2',
    label: 'Reservas',
    children: <MyBookings />
  },
];
const user = JSON.parse(localStorage.getItem('currentUser'))

function ProfileScreen() {


  useEffect(() => {
    if(!user){
      window.location.href='/'
    }
  }, [])

  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </div>
  )
}

export default ProfileScreen


export function MyBookings() {

  useEffect(()=>{
    async function fetchData() {
      
      const response = await axios.post('/api/bookings/getBookingsByUserId', { userId: user._id });
      const rooms = response.data; // Acceder a data correctamente
      console.log(rooms)
      console.log(user)
      console.log(user._id)
      // console.log(userId)
    }
    // try {
    // } catch (error) {
    //   console.log(error)
    // }
    fetchData();
  }, [])
  return (
    <div>
      <h1>Mis reservas</h1>
    </div>
  )
}

export function MyProfile() {
  return (
    <div>
      <h1>Mis Perfil</h1>
      <br />

      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Administrador: {user.isAdmin ? 'Si' : 'No '}</h1>
    </div>
  )
}