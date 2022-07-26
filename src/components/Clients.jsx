import React, { useEffect } from "react";
import { Form, Button, FormControl, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../states/singleClient";
import { getAllClients } from "../states/Clients";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";

const Clients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchClient = useInput();
  const clients = useSelector((state) => state.clients);

  useEffect(() => {
    dispatch(getAllClients());
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const client = await dispatch(getClient(searchClient.value));
      navigate(`/clients/${client.payload.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClient = (id) => {
    navigate(`/clients/${id}`);
  };

  const goToAddClient = () => {
    navigate("/client");
  };

  return (
    <>
      <div>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          CLIENTES
        </h1>

        <Button
          onClick={goToAddClient}
          variant="secondary"
          style={{
            position: "relative",
            left: "1000px",
            bottom: "60px",
          }}
        >
          <AiOutlineFileAdd size={40} />
          Agregar cliente
        </Button>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="d-flex"
        style={{ width: "40%", margin: "0 auto" }}
      >
        <FormControl
          {...searchClient}
          type="search"
          placeholder="Buscar Clientes.."
          className="me-2"
          aria-label="Search"
        />
        <Button type="input" variant="outline-success">
          Buscar
        </Button>
      </Form>

      <Table
        striped
        bordered
        hover
        size="sm"
        style={{ width: "50%", margin: "0 auto", marginTop: "60px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>CUIT</th>
            <th>Dirección</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {clients?.map((client) => (
            <tr key={client.id} onClick={() => handleClient(client.id)}>
              <td>{client.id}</td>
              <td>{client.bussinessName}</td>
              <td>{client.CUIT}</td>
              <td>{client.legalAddress}</td>
              {client.status ? <td>Habilitado</td> : <td>Deshabilitado</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Clients;
