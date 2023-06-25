import { useEffect, useState } from "react";
import { FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const VentasGenerales = () => {
  const [isLoading, setLoading] = useState(true);
  const [ano_sel, setano] = useState(0);
  const [cantidad, setCantidad] = useState("");
  const [Evento_Sel, setEvento_Sel] = useState();
  const [Show_Modal, setShow_Modal] = useState(false);
  const [eventoGP, setEventoGP] = useState([]);
  const [id_calen_eve, setid_calen_eve] = useState();
  const [ano, setAnio] = useState();
  const [costo, setCosto] = useState();

  const [isReady, setIsReady] = useState(false);

  const anos = [];

  const getEventoGP = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/eventosgeneralespagos"
      );
      const jsonData = await response.json();
      setEventoGP(jsonData);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const obtenerDatos = async (e) => {
    setIsReady(false);
    try {
      const body = {
        id_calen_eve,
        ano,
        costo,
        cantidad,
      };
      await fetch("http://localhost:5000/agregarentradas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.json())
        .then((json) => {
          console.log(json)
          setIsReady(true);
        });
      window.location = "/ventas/generales";
    } catch (error) {}
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    obtenerDatos(data);
  };
  console.log(errors);

  useEffect(() => {
    getEventoGP();
    setLoading(false);
  }, []);

  const handleAno = (event) => {
    setano(event.target.value);
  };
  const handlecantidad = (event) => {
    setCantidad(event.target.value);
  };
  const handleSeleccion = (EventoGP) => {
    setCantidad("");
    setEvento_Sel(EventoGP);
    setAnio(EventoGP.fecha_evento);
    setCosto(EventoGP.costo);
    setid_calen_eve(EventoGP.id_calen_eve);
    setShow_Modal(true);
  };

  if (isLoading) {
    return <div>Cargando</div>;
  }

  return (
    <div className="container pt-4">
      <FormGroup>
        <FormLabel><strong>Año</strong></FormLabel>
        <FormSelect onChange={handleAno}>
          {eventoGP.map(
            (evento) =>
              !anos.includes(evento.fecha_evento) &&
              anos.push(evento.fecha_evento)
          )}
          <option value={0}>Seleccione un año</option>
          {anos.map((ano) => (
            <option value={ano}>{ano}</option>
          ))}
        </FormSelect>
      </FormGroup>
      <div className="pt-4"></div>
      <table className="table caption-top table-hover">
        <thead className="table-success">
          <tr>
            <th scope="col"></th>
            <th scope="col">Evento General</th>
            <th scope="col">Año</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody
          href="#"
          className="link-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {ano_sel == 0
            ? eventoGP.map((eventoGP) => (
                <tr onClick={(e) => handleSeleccion(eventoGP, e)}>
                  <th scope="row"></th>
                  <td>{eventoGP.nombre}</td>
                  <td>{eventoGP.fecha_evento}</td>
                  <td>{eventoGP.costo} BRL</td>
                </tr>
              ))
            : eventoGP.map(
                (eventoGP) =>
                  eventoGP.fecha_evento == ano_sel && (
                    <tr onClick={(e) => handleSeleccion(eventoGP, e)}>
                      <th scope="row"></th>
                      <td>{eventoGP.nombre}</td>
                      <td>{eventoGP.fecha_evento}</td>
                      <td>{eventoGP.costo} BRL</td>
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
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    {Evento_Sel.nombre} ({Evento_Sel.fecha_evento})
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <div className="pt-4"></div>
                      <div className="mb-3 form-floating">
                        <input
                          value={cantidad}
                          type="number"
                          className="form-control"
                          placeholder="0"
                          onChange={handlecantidad}
                        />
                        <FormLabel>Cantidad de entradas</FormLabel>
                      </div>
                      <h6>Costo Total: </h6>
                      <h6>
                        {(cantidad * Evento_Sel.costo).toFixed(2)} BRL |{" "}
                        {((cantidad * Evento_Sel.costo) / 4.78).toFixed(2)} $
                      </h6>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-success">
                        Seleccionar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
