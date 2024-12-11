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
  const [duplicateRoooms, setDuplicateRooms] = useState([]);


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getAllrooms")).data;
      setRooms(data);
      setDuplicateRooms(data);
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
    console.log((dates[0]).format('DD-MM-YYYY'));
    console.log((dates[1]).format('DD-MM-YYYY'));
    setFromDate(dates[0].format('DD-MM-YYYY'));
    setToDate(dates[1].format('DD-MM-YYYY'));
  
    var tempRooms = [];
  
    for (const room of duplicateRoooms) {
      let availability = false; // Restablecer la disponibilidad para cada sala
  
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          const startDate = moment(dates[0].format('DD-MM-YYYY'), 'DD-MM-YYYY'); // Especificar formato
          const endDate = moment(dates[1].format('DD-MM-YYYY'), 'DD-MM-YYYY'); // Especificar formato
          const bookingFromDate = moment(booking.fromDate, 'DD-MM-YYYY'); // Especificar formato
          const bookingToDate = moment(booking.toDate, 'DD-MM-YYYY'); // Especificar formato
  
          if (
            !startDate.isBetween(bookingFromDate, bookingToDate, null, '[]') &&
            !endDate.isBetween(bookingFromDate, bookingToDate, null, '[]')
          ) {
            if (
              startDate.format('DD-MM-YYYY') !== booking.fromDate &&
              startDate.format('DD-MM-YYYY') !== booking.toDate &&
              endDate.format('DD-MM-YYYY') !== booking.fromDate &&
              endDate.format('DD-MM-YYYY') !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true; // Si no hay reservas, la sala está disponible
      }
  
      if (availability) {
        tempRooms.push(room);
      }
    }
  
    setRooms(tempRooms);
  }
  

  // Para deshabilitar las fechas anteriores
  
  // function filterByDate(dates) {
  //   // Formatear las fechas seleccionadas para usarlas en las comparaciones
  //   const formattedFromDate = moment(dates[0], 'DD-MM-YYYY');
  //   const formattedToDate = moment(dates[1], 'DD-MM-YYYY');
  
  //   console.log('From Date:', formattedFromDate.format('DD-MM-YYYY'));
  //   console.log('To Date:', formattedToDate.format('DD-MM-YYYY'));
  
  //   setFromDate(formattedFromDate.format('DD-MM-YYYY'));
  //   setToDate(formattedToDate.format('DD-MM-YYYY'));
  
    // const tempRooms = [];
  
    // for (const room of duplicateRoooms) {
    //   let availability = true; // Por defecto, la sala está disponible
    //   console.log(`\nEvaluando sala: ${room.name}`);
    //   console.log('Reservas actuales:', room.currentBookings);
  
    //   if (room.currentBookings.length > 0) {
    //     for (const booking of room.currentBookings) {
    //       // Convertir las fechas de la reserva en objetos Moment
    //       const bookingStart = moment(booking.fromDate, 'DD-MM-YYYY');
    //       const bookingEnd = moment(booking.toDate, 'DD-MM-YYYY');
  
    //       console.log(`  Reserva: ${booking.fromDate} - ${booking.toDate}`);
    //       console.log(`  Fechas seleccionadas: ${formattedFromDate.format('DD-MM-YYYY')} - ${formattedToDate.format('DD-MM-YYYY')}`);
  
    //       // Verificar si las fechas seleccionadas se solapan con la reserva
    //       const isOverlapping =
    //         formattedFromDate.isBetween(bookingStart, bookingEnd, undefined, '[]') || // Fecha de inicio seleccionada está dentro de la reserva
    //         formattedToDate.isBetween(bookingStart, bookingEnd, undefined, '[]') || // Fecha de fin seleccionada está dentro de la reserva
    //         bookingStart.isBetween(formattedFromDate, formattedToDate, undefined, '[]') || // Fecha de inicio de la reserva está dentro del rango seleccionado
    //         bookingEnd.isBetween(formattedFromDate, formattedToDate, undefined, '[]'); // Fecha de fin de la reserva está dentro del rango seleccionado
  
    //       if (isOverlapping) {
    //         console.log(`  → Solapamiento detectado. Sala no disponible.`);
    //         availability = false; // Sala no está disponible
    //         break; // No necesitamos revisar más reservas para esta sala
    //       }
    //     }
    //   }
  
    //   console.log(`  Resultado para la sala ${room.name}: availability = ${availability}`);
  
    //   // Si la sala está disponible o no tiene reservas, la añadimos a la lista temporal
    //   if (availability || room.currentBookings.length === 0) {
    //     tempRooms.push(room);
    //   }
    // }
  
    // setRooms(tempRooms); // Actualizamos las salas visibles
  // }
  
  
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
