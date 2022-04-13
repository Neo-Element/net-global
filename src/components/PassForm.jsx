import React from "react";
import useInput from "../hooks/useInput";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";
import { passChangeLogin, passChangeOk } from "../states/user";
import { useForm } from "react-hook-form";
import LoginCss from "../style/Home.module.css";

const PassForm = function (){
    const usuario = useSelector((state) => state.usuario);
    const oldPass = useInput();
    const newPass = useInput();
    const navigate = useNavigate()
    const {token} = useParams()
    const {register,handleSubmit,formState: { errors }} = useForm();
  
    const handleClick = async (datos) => {
      console.log(datos)
      const user= await auth(datos.oldPass)
      if(!user) return
        console.log("login OK")
        const resp = await passChangeOk({email:usuario.email , newPassword:datos.password , token:token})
        swal({
          title: "Contraseña modificada",
          icon: "success",
          button: "Aceptar",
        });
        navigate("/status")
    };
    const auth = async(pass)=>{
        const user= await passChangeLogin({email:usuario.email , password:pass , admin: false})
        return user
    }
  
    return (
      <div className="container rounded bg-white mt-5 mb-5">
        <Form onSubmit={handleSubmit(handleClick)} className="row">
          <div className="col-md-3 border-right"></div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right" style={{ color: "grey" }}>
                  CAMABIAR CONTRASEÑA
                </h4>
              </div>
              <div className="row mt-2">
                <Form.Group className="col-md-6">
                  <Form.Label className="labels">Ingresá tu contraseña actual</Form.Label>
                  <Form.Control
                    name='oldPass'
                    type="password"
                    size="ms"
                    placeholder="Contraseña actual"
                    className="position-relative"
                    variant="outlined"
                    {...register("oldPass", {
                      required: {
                        value: true,
                        message: "Necesitas este campo",
                      },
                    })}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-1" controlId="sign-in-password">
                  <div
                    className={`${LoginCss.inputBonito}  ${
                      errors.password && LoginCss.error
                    }`}
                  >
                    <Form.Label className="labels">Ingresá tu nueva contraseña</Form.Label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Contraseña nueva"
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
              </div>
            </div>
            <div className="row mt-3">
              <div className="row mt-2"></div>
              <div className="mt-5 text-center">
                <Button
                  variant="warning"
                  className="btnAgregar btn btn-primary profile-button"
                  type="submit"
                >
                  CAMBIAR CONTRASEÑA
                </Button>
              </div>
            </div>
          </Form>
        </div>
    );
}

export default PassForm