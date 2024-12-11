import { Tabs } from "antd";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import axios from "axios";
import { useEffect, useState } from "react";

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
    children: <h1>Salas</h1>,
  },
  {
    key: "3",
    label: "Agregar Sala",
    children: <h1>Agregar Sala</h1>,
  },
  {
    key: "4",
    label: "Usuarios",
    children: <h1>Usuarios</h1>,
  },
];
function AdminScreen() {
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
        {bookings.length && (
          <h1>Hay un total de: {bookings.length} reservas</h1>
        )}
      </div>
    </div>
  );
}
