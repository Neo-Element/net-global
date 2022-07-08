import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteClient } from "../states/singleClient";
import swal from "sweetalert";
import { getClientId } from "../states/singleClient";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import PopUpDisable from "./PopUpDisable";

const CardClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const client = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(getClientId(clientId));
  }, []);

  const handleDelete = () => {
    dispatch(deleteClient(client.id));
    swal({
      title: "El cliente fue removido",
      text: ".",
      icon: "success",
      button: "Aceptar",
    });
    navigate("/clients");
  };

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <>
      <Card
        style={{
          width: "50rem",
          height: "20rem",
          margin: "0 auto",
          marginTop: "80px",
        }}
      >
        <Card.Body>
          <Card.Title style={{ fontSize: "20px" }}>
            {client.bussinessName}
          </Card.Title>
          <Card.Subtitle className="mb-2 mt-5 text-muted">
            CUIT: {client.CUIT}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Dirección Legal: {client.legalAddress}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Email: {client.email}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Ciudad: {client.city}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Provincia: {client.province}
          </Card.Subtitle>
          <Card.Text className="mb-2 mt-5">
            Inicio de contrato: {client.startContratDate}
          </Card.Text>
          <Card.Text>Fin de contrato: {client.endContratDate}</Card.Text>
          <Card.Text>
            <Button
              style={{
                float: "right",
                marginRight: "20px",
              }}
              variant="secondary"
              onClick={() => navigate("/clients")}
            >
              Cerrar
            </Button>
            <Button
              style={{
                float: "right",
                marginRight: "20px",
              }}
              variant="secondary"
              onClick={() => handleClick(`/edit/client/${client.id}`)}
            >
              <BiEdit />
              Editar
            </Button>

            <Button
              style={{
                float: "right",
                marginRight: "20px",
              }}
              variant="secondary"
              onClick={handleDelete}
            >
              <RiDeleteBin6Line />
              Eliminar
            </Button>
            <PopUpDisable
              style={{
                marginRight: "50%",
                top: "50px",
              }}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardClient;
