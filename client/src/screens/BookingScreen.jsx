import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import Error from "../Components/Error";

function BookingScreen() {
  const { roomId } = useParams(); //Configuración del parametro para la versión actual de react-router-dom
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
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
                  <p>Nombre: </p>
                  <p>Fecha: </p>
                  <p>Capacidad: {room.capacity}</p>
                </b>
              </div>
              <hr />
              <div style={{float:'right'}}>
                <button className="btn btn-primary">Reservar Ahora</button>
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
