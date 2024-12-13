import { Tabs, Divider, Flex, Tag  } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
// import Error from "../Components/Error";
import Swal from "sweetalert2";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Perfil",
    children: <MyProfile />,
  },
  {
    key: "2",
    label: "Reservas",
    children: <MyBookings />,
  },
];
const user = JSON.parse(localStorage.getItem("currentUser"));

function ProfileScreen() {
  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getBookingsByUserId", {
          userId: user._id,
        });
        const rooms = response.data; // Acceder a data correctamente
        console.log(rooms);
        setBookings(rooms);
        setLoading(false);

        // console.log(userId)
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    }

    fetchData();
  }, []);

  async function cancelBooking(bookingId, roomId) {
    try {
      setLoading(true);
      const result = (
        await axios.post("api/bookings/cancelBooking", { bookingId, roomId })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire(
        "Felicidades!",
        "La reserva ha sido cancelada correctamente.",
        "success"
      ).then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("Oops!", "Algo salió mal.", "error").then((result) => {
        window.location.reload();
      });
    }
  }

  return (
    <div>
      <div className="mt-5 ">
        <div className="row ml-5">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => (
              <div className="bs reservas m-2 col-md-5 px-5 py-4" style={{borderRadius: '10px'}}>
                <h2>{booking.room}</h2>
                <p>
                  <b>ID Reserva:</b> {booking._id}
                </p>
                <p>
                  <b>CheckIn:</b> {booking.fromDate}
                </p>
                <p>
                  <b>CheckOut:</b> {booking.toDate}
                </p>
                <p>
                  <b>Estado:</b>{" "}
                  {booking.status === 'Cancelada' ? (<Tag color="red">CANCELADA</Tag>) : (<Tag color="green">CONFIRMADA</Tag>)}
                </p>

                {booking.status !== "Cancelada" && (
                  <div className="text-right">
                    <button
                      className="btn m-3"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomId);
                      }}
                    >
                      Cancelar Reserva
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function MyProfile() {
  return (
    <div className="card bs col-md-6 m-5" style={{borderRadius: '10px', backgroundColor: '#8cbadd'}}>
      <div className="m-5 d-flex justify-content-between align-items-center">
        <div className="info">
          <h1>Mi Perfil</h1>
          <br />
          <h6>Name: {user.name}</h6>
          <h6>Email: {user.email}</h6>
          <h6>Administrador: {user.isAdmin ? "Si" : "No"}</h6>
        </div>

        <div className="avatar text-center">
          <img 
            src="/avatar.png"
            alt="avatar"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>

  );
}
