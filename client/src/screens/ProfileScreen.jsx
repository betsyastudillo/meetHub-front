import { Tabs, Divider, Flex, Tag  } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
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
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => (
              <div className="bs">
                <h1>{booking.room}</h1>
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
                  {booking.status === 'cancelled' ? (<Tag color="red">CANCELADO</Tag>) : (<Tag color="green">CONFIRMADO</Tag>)}
                </p>

                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomId);
                      }}
                    >
                      CANCELAR RESERVA
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
    <div>
      <h1>Mis Perfil</h1>
      <br />

      <h1>Name: {user.name}</h1>
      <h1>Email: {user.email}</h1>
      <h1>Administrador: {user.isAdmin ? "Si" : "No "}</h1>
    </div>
  );
}
