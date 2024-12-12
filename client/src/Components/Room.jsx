import { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
function Room({ room, fromDate, toDate, isNotTop }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className=" row bs">
      <div className="col-md-4">
        <img src={room.imgUrl[0]} alt="" className="small-img" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>{room.location}</p>
          <p>Capacidad: {room.capacity}</p>
          <p>Estado: {room.status}</p>
        </b>

        <div style={{ float: "right" }}>

        {(fromDate && toDate && isNotTop) && (
          <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
            <button className="btn mr-5">Reserva Ahora</button>
          </Link>
        )}
          <button className="btn btn-details" onClick={handleShow}>
            Ver Detalles
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Carrusel de imágenes */}
          <Carousel data-bs-theme="dark">
            {room.imgUrl.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 big-img" src={url} alt="" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>Alguna descripción de salas</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde sequi
            saepe earum fugiat aut officia dolor et eaque voluptatum quod amet
            nisi incidunt cum numquam consectetur, architecto velit asperiores
            officiis.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
