import axios from "axios";
import React, { useEffect, useState } from "react";
import Room from "../Components/Room";
function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllrooms")).data;
      setRooms(data);
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
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>Cargando...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room, index) => {
            return <div key={index} className="col-md-9 mt-2">
              <Room room={room}/>
            </div>
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
