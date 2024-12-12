import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from 'moment'
import Swal from 'sweetalert2'

function BookingScreen({match}) {
  const { roomId, fromDate, toDate } = useParams(); //Configuración del parametro para la versión actual de react-router-dom
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login"); // Redirige si no hay usuario
    } else {
      setIsUserValid(true); // Usuario válido
    }
  }, [navigate]);

  // const roomid = roomId;
  const fromdate = moment(fromDate, 'DD-MM-YYYY')
  const todate = moment(toDate, 'DD-MM-YYYY')

  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;

  const fetchData = async () => {
    
    
    try {
      const dataHome = (await axios.get("/api/users/home")).data;
    if(dataHome.message !== 'Success!'){
      navigate('/login');
    }
      setLoading(true);
      // El match.params.roomId ya no se utiliza en las versiones actuales de react-router-dom, entonces no se pasa tampoco como parametro
      const data = (await axios.post("/api/rooms/getRoomById", { roomId }))
        .data;
      setRoom(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function bookRoom(){
    const bookingDetails = {
      room, 
      userId: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromDate,
      toDate,
      totalDays,
    }

    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setLoading(false);
      Swal.fire('Felicidades', 'Tu reserva ha sido confirmada exitosamente. Hemos enviado un email a tu correo.', 'success').then(result => {
        window.location.href='/profile'
      });
    } catch (error) {
      setLoading(false);
      Swal.fire('Ups..', 'Algo salió mal con la reserva, por favor intentalo de nuevo.', 'error' )
    }

  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imgUrl[0]} alt="" className="big-img" />
            </div>
            <div className="col-md-6 text-end">
              <div>
                <h1>Detalles de la reserva</h1>
                <hr />
                <b>
                  <p>Nombre: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>Desde: {fromDate} </p>
                  <p>Hasta: {toDate} </p>
                  <p>Capacidad: {room.capacity}</p>
                  <p>Días totales: {totalDays} </p>
                </b>
              </div>
              <hr />
              <div style={{float:'right'}}>
                <button className="btn btn-primary" onClick={bookRoom}>Reservar Ahora</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default BookingScreen;
