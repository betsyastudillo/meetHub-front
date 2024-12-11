import axios from "axios";
import { useEffect, useState } from "react";
import Room from "../Components/Room";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from 'moment'
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function HomeScreen() {

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllrooms")).data;
      setRooms(data);
      setLoading(false);
      console.log("data",data)
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

    setFromDate((dates[0]).format('DD-MM-YYYY'))
    setToDate((dates[1]).format('DD-MM-YYYY'))
  }

  // Para deshabilitar las fechas anteriores
  const disablePastDates = (current) => {
    return current && current < moment().startOf("day"); 
  };

  return (
    <div className="container">
      <div className='row mt-5'>
        <div className='col-md-3'>
          <RangePicker 
          disabledDate={disablePastDates}
            format='DD-MM-YYYY' 
            onChange={filterByDate}/>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length>1 ? (
          rooms.map((room, index) => {
            return <div key={index} className="col-md-9 mt-3">
              <Room room={room} fromDate={fromDate} toDate={toDate}/>
            </div>
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
