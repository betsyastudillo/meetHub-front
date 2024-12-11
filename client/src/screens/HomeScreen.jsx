import axios from "axios";
import { useEffect, useState } from "react";
import Room from "../Components/Room";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRoooms, setDuplicateRooms] = useState([]);

  const [searchKey, setSearchKey] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllrooms")).data;
      setRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
      console.log("data", data);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function filterByDate(dates) {

    setFromDate(dates[0].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    const startDate = moment(dates[0].format("DD-MM-YYYY"), "DD-MM-YYYY");
    const endDate = moment(dates[1].format("DD-MM-YYYY"), "DD-MM-YYYY");

    const tempRooms = duplicateRoooms.filter((room) => {
      if (room.currentBookings.length === 0) {
        return true; 
      }

      const isAvailable = room.currentBookings.every((booking) => {
        const bookingFromDate = moment(booking.fromDate, "DD-MM-YYYY");
        const bookingToDate = moment(booking.toDate, "DD-MM-YYYY");

        return (
          endDate.isBefore(bookingFromDate, "day") || 
          startDate.isAfter(bookingToDate, "day") 
        );
      });

      return isAvailable; 
    });

    setRooms(tempRooms);
  }

  // Para deshabilitar días anteriores
  const disablePastDates = (current) => {
    return current && current < moment().startOf("day");
  };

  function filterBySearch () {
    const tempRooms = duplicateRoooms.filter(room => room.name.toLowerCase().includes(searchKey.toLowerCase())) 

    setRooms(tempRooms)
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div className="col-md-5">
          <RangePicker
            disabledDate={disablePastDates}
            format="DD-MM-YYYY"
            onChange={filterByDate}
          />
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Busca por salas" 
          value={searchKey} onChange={(e) =>{setSearchKey(e.target.value)}} onKeyUp={filterBySearch}
          />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room, index) => {
            return (
              <div key={index} className="col-md-9 mt-3">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
