import { Tabs } from "antd";
import Loader from "../Components/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="mt-3 mx-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        Panel Administrativo
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
    <div className="row m-5">
      <div className="col-md-12">
        {loading && <Loader />}
        {bookings.length && (
          <h5 className="mb-5">Hay un total de: {bookings.length} reservas</h5>
        )}

        <table className="table table-bordered">
          <thead className="bs" style={{ backgroundColor: "#88A9C3" }}>
            <tr>
              <th className="text-center">ID Reserva </th>
              <th className="text-center">Cliente</th>
              <th className="text-center">Salas</th>
              <th className="text-center">Desde</th>
              <th className="text-center">Hasta</th>
              <th className="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 &&
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td> {/* reservas id  = roomId */}
                  <td>{booking.userId}</td>
                  <td className="text-center">{booking.room}</td>
                  <td className="text-center">{booking.fromDate}</td>
                  <td className="text-center">{booking.toDate}</td>
                  <td className="text-center">{booking.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
  //Editar sala
  const updateRoom = async (id) => {
    Swal.fire({
      title: "Actualizar sala",
      input: "text",
      inputPlaceholder: "Nombre de la sala",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      confirmButtonColor: "#5DA9E9",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`/api/rooms/updateRoom/${id}`, { name: result.value })
          .then(() => {
            Swal.fire("Sala actualizada!", "", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error updating room", error);
            Swal.fire(
              "Error!",
              "Hubo un error al actualizar la sala.",
              "error"
            );
          });
      }
    });
  };
  // Eliminar sala
  const deleteRoom = async (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/rooms/deleteRoom/${id}`)
          .then(() => {
            Swal.fire("Sala eliminada!", "", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting room", error);
            Swal.fire("Error!", "Hubo un error al eliminar la sala.", "error");
          });
      }
    });
  };

  return (
    <div className="row m-5">
      <div className="col-md-8">
        {loading && <Loader />}
        {rooms.length && (
          <h5 className="mb-5">Hay un total de: {rooms.length} salas</h5>
        )}

        <table className="table table-bordered">
          <thead className="bs" style={{ backgroundColor: "#88A9C3" }}>
            <tr>
              <th className="text-center">ID Sala</th>
              <th className="text-center">Nombre Sala</th>
              <th className="text-center">Capacidad</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room,index) => {
                return (
                  <tr key={index}>
                    <td>{room._id}</td>
                    <td className="text-center">{room.name}</td>
                    <td className="text-center">{room.capacity}</td>
                    <td className="text-center ">
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteRoom(room._id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => updateRoom(room._id)}
                      >
                        Modificar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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
    <div className="row mt-3 ml-5">
      <div className="col-md-8">
        {loading && <loader />}

        <table className="table table-bordered">
          <thead style={{ backgroundColor: "#88A9C3" }}>
            <tr>
              <th className="text-center">ID Usuario</th>
              <th className="text-center">Nombre</th>
              <th className="text-center">Correo electronico</th>
              <th className="text-center">Rol</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td className="text-center">{user.name}</td>
                    <td>{user.email}</td>
                    <td className="text-center">
                      {user.isAdmin ? "Administrador" : "Cliente"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Panel Administrador */
export function Addroom() {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState();
  const [location, setLocation] = useState("");
  const [imgUrl1, setImgUrl1] = useState();
  const [imgUrl2, setImgUrl2] = useState();
  const [imgUrl3, setImgUrl3] = useState();

  async function addRoom() {
    const newroom = {
      name,
      capacity,
      location,
      imgUrl: [imgUrl1, imgUrl2, imgUrl3],
    };

    try {
      setLoading(true);

      const result = (await axios.post("/api/rooms/addroom", newroom)).data;
      setLoading(false);

      Swal.fire("Felicidades", "La sala se creo exitosamente", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire(
        "Ups",
        "Algo ha salido mal, por favor intenta de nuevo.",
        "error"
      );
    }
  }

  return (
    <div className="row m-5">
      <h3 className="m-3">Crear Sala</h3>
      <div className="col-md-3">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control"
          placeholder="Nombre sala"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Capacidad"
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Locacion"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>

      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Imagen url 1"
          value={imgUrl1}
          onChange={(e) => {
            setImgUrl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Imagen url 2"
          value={imgUrl2}
          onChange={(e) => {
            setImgUrl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Imagen url 3"
          value={imgUrl3}
          onChange={(e) => {
            setImgUrl3(e.target.value);
          }}
        />

        <div className="text-right">
          <button className="btn mt-5" onClick={addRoom}>
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}
