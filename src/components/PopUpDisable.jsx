import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { disableClient } from "../states/singleClient";

const PopUp = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const showPopup = () => setShow(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { clientId } = useParams();

  const onSubmit = async (data) => {
    try {
      data.id = clientId;
      const disabledClient = await dispatch(disableClient(data));
      swal({
        title: "Cliente deshabilitado",
        icon: "warning",
      })
      navigate("/clients");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="danger"
        style={{
          float: "right",
          marginRight: "10px",
          marginTop: "10px",
          marginLeft: "100%",
        }}
        onClick={showPopup}
      >
        Deshabilitar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Motivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="col-md-12">
              <Form.Label className="labels">
                Escribe la razón por la cual quiere deshabilitar al cliente
              </Form.Label>
              <Form.Control
                size="ms"
                className="position-relative"
                name="reason"
                variant="outlined"
                {...register("reason", {
                  required: {
                    value: true,
                    message: "Necesitas este campo",
                  },
                })}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button onClick={onSubmit} variant="danger">
            Deshabilitar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUp;
