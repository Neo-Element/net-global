import React, { useEffect } from "react";
import { Form, Button, FormControl, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllBranches } from "../states/branches";
import { getBranchName } from "../states/singleBranch";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { AiOutlineFileAdd } from "react-icons/ai";

const SearchBranchOffice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchBranch = useInput();

  const branch = useSelector((state) => state.branch);
  const branches = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getAllBranches());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getBranchName(searchBranch.value));
    navigate(`/branch/${branch.id}`);
  };

  const handleBranch = (id) => {
    navigate(`/branch/${id}`);
  };

  const handleClick = (url) => {
    navigate(url);
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
          SUCURSALES
        </h1>

        <Button
          onClick={() => handleClick("/addbranchoffice")}
          variant="secondary"
          style={{
            position: "relative",
            left: "1000px",
            bottom: "60px",
          }}
        >
          <AiOutlineFileAdd size={40} />
          Agregar sucursal
        </Button>
      </div>

      <Form
        onSubmit={handleSubmit}
        className="d-flex"
        style={{ width: "40%", margin: "0 auto" }}
       
      >
        <FormControl
          {...searchBranch}
          type="search"
          placeholder="Buscar Sucursal.."
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
            <th>Dirección</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {branches?.map((branch, id) => (
            <tr key={branch.id} onClick={() => handleBranch(branch.id)}>
              <td>{branch.id}</td>
              <td>{branch.name}</td>
              <td>{branch.address}</td>
              <td>{branch.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SearchBranchOffice;
