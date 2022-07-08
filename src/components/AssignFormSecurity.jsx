import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { getCloseSecurities } from "../states/securities";
import { useDispatch, useSelector } from "react-redux";
import { assingSegurityToBranch } from "../states/singleSecurity";
import { useNavigate } from "react-router-dom";

const AssignFormSecurity = () => {
  const dispatch = useDispatch();
  const closeSecurities = useSelector((state) => state.securities);
  const branch = useSelector((state) => state.branch);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCloseSecurities(branch));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.id = branch.id;
    console.log(data);
    dispatch(assingSegurityToBranch(data));
    navigate("/assign");
  };

  const options =
    closeSecurities &&
    closeSecurities.map((guardia, i) => {
      return (
        <option key={i} value={guardia.CUIL}>
          {guardia.name} {guardia.lastName} --- {guardia.address}
        </option>
      );
    });

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          position: "relative",
          width: "300px",
          left: "0px",
          top: "20px",
        }}
      >
        <Form.Control
          as="select"
          size="ms"
          placeholder="Seleccione un vigilador"
          className="position-relative"
          name="security"
          variant="outlined"
          {...register("security", {
            required: {
              value: true,
              message: "Necesitas este campo",
            },
          })}
        >
          <option>Selecciona un vigilador</option>
          {options}
        </Form.Control>

        <Button
          style={{ marginTop: "5px" }}
          variant="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Asignar
        </Button>
      </Form>
    </>
  );
};

export default AssignFormSecurity;
