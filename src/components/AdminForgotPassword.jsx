import React from "react";
import "../style/estilos.scss";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginCss from "../style/Home.module.css";
import { useForm } from "react-hook-form";
import { FiUser } from "react-icons/fi";

const AdminForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("acá se ejecutó onSubmit");
  };

  return (
    <div id="fondologin">
      <Container id="main-container" className="d-grid h-100 ">
        <Form
          id="sign-in-form"
          className="text-center p-3 w-100 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <FiUser className="mt-5" style={{ color: "grey" }} size={50} />
          <div className={LoginCss.contenedor}>
            <div className={LoginCss.container} id="container">
              <div className={LoginCss.loginCentrado}>
                <Form.Group
                  className="mb-1 mt-3 "
                  controlId="sign-in-email-address"
                >
                  <div
                    className={`${LoginCss.inputBonito} ${
                      errors.email && LoginCss.error
                    }`}
                  >
                    <input
                      type="text"
                      autoComplete="off"
                      name="email"
                      placeholder="Email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato no es correcto",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className={errors.email && LoginCss.mensajeError}>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </Form.Group>
                <Form.Group className="mb-1" controlId="sign-in-password">
                  <div
                    className={`${LoginCss.inputBonito}  ${
                      errors.password && LoginCss.error
                    }`}
                  >
                    <label className={LoginCss.labelName}></label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "La contraseña debe tener al menos 6 caracteres",
                        },
                      })}
                    />
                    {errors.password && (
                      <span
                        className={errors.password && LoginCss.mensajeError}
                      >
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </Form.Group>
                <Button
                  variant="warning"
                  size="ms"
                  type="submit"
                  value="submit"
                >
                  INICIAR SESIÓN
                </Button>
                <br></br>
                <br></br>
              </div>
            </div>
          </div>
        </Form>
      </Container>
      <Link to="/changePassword/admin">
        <p style={{ textAlign: "center" }}>¿Olvidaste la contraseña?</p>
      </Link>
    </div>
  );
};

export default AdminForgotPassword;
