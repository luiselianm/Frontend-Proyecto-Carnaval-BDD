import React, { useEffect, useState } from "react";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const ResultadosPage = ({}) => {
  const [eventos, setEventos] = useState([]);
  const [ano_sel, setAno] = useState(0);
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Evento_Sel, setEvento_Sel] = useState();
  const [posicion_resultado, setPosi] = useState("");
  const [escuelas, setEscuelas] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [id_evento, setId_evento] = useState(0);
  const [escuelas_pos, setEscuelas_pos] = useState([]);
  const [posiciones, setPosiciones] = useState([]);

  const anos = [];

  const getEventosD = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/eventosdesfiles");
      const jsonData = await response.json();
      setEventos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const obtenerDatos = async ({ evento }) => {
    setIsReady(false);
    try {
      console.log(escuelas_pos);
      console.log(posiciones);
      console.log(id_evento);
      const body = { escuelas_pos, posiciones, id_evento };
      //console.log(body);
      await fetch(`http://localhost:5000/updatepos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.json())
        .then((json) => {
          setIsReady(true);
        });
      window.location = "/resultados";
    } catch (error) {}
  };

  useEffect(() => {
    getEventosD();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/escuelaspos")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setEscuelas(data);
      });
  }, []);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    obtenerDatos(data);
  };
  console.log(errors);

  const handleAno = (event) => {
    setAno(event.target.value);
  };

  const handleSeleccion = (evento) => {
    setShow_Modal(true);
    setEvento_Sel(evento);
    setId_evento(evento.id_calen_eve);
  };

  const handlePosiciones = (posicion, id_escuela, index) => {
    setEscuelas_pos((prevEscuela) => {
      const updatedEscuela = [...prevEscuela];
      updatedEscuela[index] = id_escuela;
      return updatedEscuela;
    });
    setPosiciones((prevPosicion) => {
      const updatedPosicion = [...prevPosicion];
      updatedPosicion[index] = posicion;
      return updatedPosicion;
    });
  };

  return (
    <>
      <hr />
      <h2 className="px-4">Resultados de los Desfiles</h2>
      <hr />
      <div className="container">
        <FormGroup>
          <FormLabel>Año</FormLabel>
          <FormSelect onChange={handleAno}>
            {eventos.map(
              (evento) => !anos.includes(evento.ano) && anos.push(evento.ano)
            )}
            <option value={0}>Todos</option>
            {anos.map((ano) => (
              <option value={ano}>{ano}</option>
            ))}
            {eventos.map(
              (evento) => !anos.includes(evento.ano) && anos.push(evento.ano)
            )}
          </FormSelect>
        </FormGroup>
        <div className="pt-4"></div>
        <table className="table caption-top table-hover">
          <thead className="table-success">
            <tr>
              <th scope="col"></th>
              <th scope="col">Evento Desfile</th>
              <th scope="col">Fecha Evento</th>
            </tr>
          </thead>
          <tbody
            href="#"
            className="link-dark"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {ano_sel == 0
              ? eventos.map((evento) => (
                  <tr onClick={(e) => handleSeleccion(evento, e)}>
                    <th scope="row"></th>
                    <td>{evento.nombre}</td>
                    <td>{evento.fecha_evento}</td>
                  </tr>
                ))
              : eventos.map(
                  (evento) =>
                    evento.ano == ano_sel && (
                      <tr onClick={(e) => handleSeleccion(evento, e)}>
                        <th scope="row"></th>
                        <td>{evento.nombre}</td>
                        <td>{evento.fecha_evento}</td>
                      </tr>
                    )
                )}
          </tbody>
        </table>
        {Show_Modal && (
          <div className="container p-4">
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {Evento_Sel.nombre} ({Evento_Sel.fecha_evento})
                    </h5>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <div className="pt-4"></div>
                        <label>
                          <h5>
                            <strong>Ingresar Posiciones del Evento</strong>
                          </h5>
                        </label>
                        <br />
                        <div>
                          <br />
                          {escuelas.map(
                            (escuela, index) =>
                              escuela.id_calen_eve ==
                                Evento_Sel.id_calen_eve && (
                                <div>
                                  {escuela.nombre}
                                  <input
                                    type="text"
                                    name="posicion_resultado"
                                    className="form-control"
                                    placeholder="Ingrese la posición"
                                    value={posiciones[index]}
                                    onChange={(e) =>
                                      handlePosiciones(
                                        e.target.value,
                                        escuela.id_escuela,
                                        index
                                      )
                                    }
                                  />
                                </div>
                              )
                          )}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                        >
                          Cancelar
                        </button>
                        <input type="submit" className="btn btn-success" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};