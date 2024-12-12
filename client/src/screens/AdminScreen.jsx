import { Tabs } from "antd";
import Loader from "../Components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Reservas",
    children: <Bookings />,
  },
  {
    key: "2",
    label: "Salas",
    children: <Room />,
  },
  {
    key: "3",
    label: "Agregar Sala",
    children: <Addroom />,
  },
  {
    key: "4",
    label: "Usuarios",
    children: <User />,
  },
];
function AdminScreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = '/home'
    }
  }, []);

  return (
    <div className="mt-3 mx-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        Admin Panel
      </h2>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default AdminScreen;

/* Bookings = Reservas  */

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await axios.get("api/bookings/getAllBookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings", error);
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Reservas</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Reserva id </th>
              <th>Usuario id</th>
              <th>Salas</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length && (bookings.map(booking => {
              return <tr>
                <td>{booking._id}</td>  {/* reservas id  = roomId */}
                <td>{booking.userId}</td>
                <td>{booking.room}</td>
                <td>{booking.fromDate}</td>
                <td>{booking.toDate}</td>
                <td>{booking.status}</td>
              </tr>
            }))}
          </tbody>
        </table>

        {bookings.length && (
          <h1>Hay un total de: {bookings.length} reservas</h1>
        )}
      </div>
    </div>
  );
}

/* Salas  */
export function Room() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await axios.get("api/rooms/getAllrooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room", error);
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Salas</h1>
        {loading && <Loader />}

        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Salas id </th>
              <th>Nombre id</th>
              <th>Capacidad</th>

            </tr>
          </thead>
          <tbody>
            {rooms.length && (rooms.map(room => {
              return <tr>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.capacity}</td>
              </tr>
            }))}
          </tbody>
        </table>

        {rooms.length && (
          <h1>Hay un total de: {rooms.length} salas</h1>
        )}
      </div>
    </div>
  );
}

/* Usuario */

export function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = (await axios.get("api/users/getAllusers")).data;
        setUsers(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room", error);
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1> Users</h1>
        {loading && <loader />}

        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Usuario id</th>
              <th>Nombre</th>
              <th>Correo electronico</th>
              <th>Rol</th>
            </tr>
          </thead>

          <tbody>
            {users && (users.map(user => {
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'ADMIN' : 'USUARIO'}</td>
              </tr>
            }))}
          </tbody>

        </table>
      </div>
    </div>
  )

}


/* Panel Administrador */

export function Addroom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [name, setName] = useState('')
  const [capacity, setCapacity] = useState()
  const [location, setLocation] = useState('')
  const [imgUrl1, setImgUrl1] = useState()
  const [imgUrl2, setImgUrl2] = useState()
  const [imgUrl3, setImgUrl3] = useState()

  async function addRoom() {



    const newroom = {
      name,
      capacity,
      location,
      imgUrl: [imgUrl1, imgUrl2, imgUrl3]
    }

    try {

      setLoading(true);
      const result = (await axios.post('/api/rooms/addroom', newroom)).data
      console.log(result)
      setLoading(false)
      Swal.fire('Felicidades', 'La sala se creo exitosamente', 'success').then(result => {
        window.location.href = '/home'
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      Swal.fire('OOps', 'Something went wrong', 'error')
    }
  }

  return (
    <div className="row">


      <div className="col-md-5">
        {loading && <loader />}
        <input type="text" className="form-control" placeholder="Nombre sala"
          value={name} onChange={(e) => { setName(e.target.value) }}
        />

        <input type="text" className="form-control" placeholder="Capacidad"
          value={capacity} onChange={(e) => { setCapacity(e.target.value) }}
        />

        <input type="text" className="form-control" placeholder="Locacion"
          value={location} onChange={(e) => { setLocation(e.target.value) }} />
        {/* <input type="text"  className="form-control" placeholder="Estado"/> */}

      </div>

      {/* --------- */}

      <div className="col-md-5">
        <input type="text" className="form-control" placeholder="Imagen url 1"
          value={imgUrl1} onChange={(e) => { setImgUrl1(e.target.value) }}
        />
        <input type="text" className="form-control" placeholder="Imagen url 2"
          value={imgUrl2} onChange={(e) => { setImgUrl2(e.target.value) }}
        />
        <input type="text" className="form-control" placeholder="Imagen url 3"
          value={imgUrl3} onChange={(e) => { setImgUrl3(e.target.value) }}
        />

        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addRoom}>Agregar Sala</button>
        </div>
      </div>
    </div>
  )
}



