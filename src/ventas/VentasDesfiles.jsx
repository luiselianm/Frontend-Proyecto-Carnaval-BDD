import { useEffect, useState } from "react";
import { Col, Row, FormLabel, FormSelect, FormGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";

export const VentasDesfiles = () => {
  const [autorizados, setAutorizados] = useState([]);
  const [Show_Modal, setShow_Modal] = useState(false);
  const [Desfile_Sel, setDesfile_Sel] = useState();
  const [cantidades, setCantidades] = useState([]);
  const [montos, setMontos] = useState([]);
  const [totales, setTotales] = useState([]);
  const [num_rif, setnum_rif] = useState();
  const [id_entradas, setid_entradas] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [Empresa_sel, setEmpresa_sel] = useState(0);
  const [TE_sel, setTE_sel] = useState(0);
  var nuevo_monto = [];

  const empresas = [];
  const tipos_entrada = [];

  const getAutorizados = async () => {
    try {
      const response = await fetch("http://localhost:5000/autorizados");
      const jsonData = await response.json();
      console.log(jsonData);
      setAutorizados(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  const obtenerDatos = async (e) => {
    //e.preventDefault();
    setIsReady(false);

    console.log(num_rif);
    console.log(id_entradas);
    console.log(cantidades);
    console.log(totales);
    try {
      const body = {
        num_rif,
        id_entradas,
        cantidades,
        totales,
      };
      await fetch("http://localhost:5000/agregarreservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.json())
        .then((json) => {
          //console.log(json)
          setIsReady(true);
        });
      window.location = "/ventas/generales";
    } catch (error) {}
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    obtenerDatos(data);
  };
  console.log(errors);

  const handleSeleccion = (autorizado) => {
    setCantidades([]);
    setTotales([]);
    setid_entradas([]);
    setMontos([]);
    nuevo_monto = [];
    setDesfile_Sel(autorizado);
    setnum_rif(autorizado.num_rif);
    setShow_Modal(true);
    console.log(autorizado);
  };

  const handleCantidad = (event, index, monto, id_entrada) => {
    const { value } = event.target;
    const cantidad = Number(value);
    const monto_t = Number(cantidad * monto);
    setCantidades((prevCantidades) => {
      const updatedCantidades = [...prevCantidades];
      updatedCantidades[index] = cantidad;
      return updatedCantidades;
    });
    setTotales((prevTotales) => {
      const updatedTotales = [...prevTotales];
      updatedTotales[index] = monto * cantidad;
      return updatedTotales;
    });
    setid_entradas((prevId_entrada) => {
      const updatedId_entradas = [...prevId_entrada];
      updatedId_entradas[index] = id_entrada;
      return updatedId_entradas;
    });
    setMontos((prevmonto) => {
      const updatedmontos = [...prevmonto];
      updatedmontos[index] = monto_t;
      return updatedmontos;
    });
  };
  const handleEmpresa = (event) => {
    setEmpresa_sel(event.target.value);
  };
  const handleTE = (event) => {
    setTE_sel(event.target.value);
  };

  useEffect(() => {
    getAutorizados();
  }, []);

  return (
    <div className="container pt-4">
      <Row className="pb-4">
        <Col>
          <FormGroup>
            <FormLabel>Empresa</FormLabel>
            <FormSelect onChange={handleEmpresa}>
              {autorizados.map(
                (autorizado) =>
                  !empresas.includes(autorizado.nombre) &&
                  empresas.push(autorizado.nombre)
              )}
              <option value={0}>Todos</option>
              {empresas.map((empresa) => (
                <option value={empresa}>{empresa}</option>
              ))}
            </FormSelect>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <FormLabel>Tipo de entrada</FormLabel>
            <FormSelect onChange={handleTE}>
              {autorizados.map(
                (autorizado) =>
                  !tipos_entrada.includes(autorizado.tipo_entrada) &&
                  tipos_entrada.push(autorizado.tipo_entrada)
              )}
              <option value={0}>Todos</option>
              {tipos_entrada.map((te) => (
                <option value={te}>{te}</option>
              ))}
            </FormSelect>
          </FormGroup>
        </Col>
      </Row>
      <table className="table caption-top table-hover">
        <thead className="table-success">
          <tr>
            <th scope="col"></th>
            <th scope="col">Empresa</th>
            <th scope="col">Tipo Entrada</th>
            <th scope="col">Monto</th>
            <th scope="col">Disponibilidad</th>
          </tr>
        </thead>
        <tbody
          href="#"
          class="link-dark"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {Empresa_sel == 0 && TE_sel == 0
            ? autorizados.map((autorizado) => (
                <tr onClick={(e) => handleSeleccion(autorizado, e)}>
                  <th scope="row"></th>
                  <td>{autorizado.nombre}</td>
                  <td>{autorizado.tipo_entrada}</td>
                  <td>{autorizado.monto} BRL</td>
                  <td>{autorizado.cant_max}</td>
                </tr>
              ))
            : Empresa_sel == 0 && TE_sel !== 0
            ? autorizados.map(
                (autorizado) =>
                  autorizado.tipo_entrada == TE_sel && (
                    <tr onClick={(e) => handleSeleccion(autorizado, e)}>
                      <th scope="row"></th>
                      <td>{autorizado.nombre}</td>
                      <td>{autorizado.tipo_entrada}</td>
                      <td>{autorizado.monto} BRL</td>
                      <td>{autorizado.cant_max}</td>
                    </tr>
                  )
              )
            : Empresa_sel !== 0 && TE_sel == 0
            ? autorizados.map(
                (autorizado) =>
                  autorizado.nombre == Empresa_sel && (
                    <tr onClick={(e) => handleSeleccion(autorizado, e)}>
                      <th scope="row"></th>
                      <td>{autorizado.nombre}</td>
                      <td>{autorizado.tipo_entrada}</td>
                      <td>{autorizado.monto} BRL</td>
                      <td>{autorizado.cant_max}</td>
                    </tr>
                  )
              )
            : autorizados.map(
                (autorizado) =>
                  autorizado.tipo_entrada == TE_sel &&
                  autorizado.nombre == Empresa_sel && (
                    <tr onClick={(e) => handleSeleccion(autorizado, e)}>
                      <th scope="row"></th>
                      <td>{autorizado.nombre}</td>
                      <td>{autorizado.tipo_entrada}</td>
                      <td>{autorizado.monto} BRL</td>
                      <td>{autorizado.cant_max}</td>
                    </tr>
                  )
              )}
        </tbody>
      </table>
      {Show_Modal && (
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {Desfile_Sel.nombre}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="text-center fw-bold">Tipo Entrada</Col>
                    <Col className="text-center fw-bold">Costo Entrada</Col>
                    <Col className="text-center fw-bold">
                      Cantidad de Entradas
                    </Col>
                    <Col className="text-center fw-bold">Monto Total</Col>
                  </Row>
                  {autorizados.map(
                    (autorizado, index) =>
                      autorizado.nombre == Desfile_Sel.nombre && (
                        <Row
                          className="row d-flex align-items-center"
                          key={autorizado.id}
                        >
                          <Col className="text-center">
                            {autorizado.tipo_entrada}
                          </Col>
                          <Col className="text-center">
                            {autorizado.monto} BRL
                          </Col>
                          <Col>
                            <FormLabel>
                              (Quedan: {autorizado.cant_max})
                            </FormLabel>
                            <input
                              value={cantidades[index] || ""}
                              type="number"
                              className="form-control"
                              placeholder="0"
                              onChange={(event) =>
                                handleCantidad(
                                  event,
                                  index,
                                  autorizado.monto,
                                  autorizado.id_entrada
                                )
                              }
                            />
                          </Col>
                          <Col className="text-center">
                            {cantidades[index] > 0
                              ? cantidades[index] * autorizado.monto
                              : 0.0}{" "}
                            BRL
                          </Col>
                        </Row>
                      )
                  )}
                  <h6>Costo Total: </h6>
                  <h6>
                    {montos.length > 0 ? (
                      <>
                        {((nuevo_monto) => {
                          nuevo_monto = montos.filter(Boolean);
                          return (
                            <>
                              {parseFloat(
                                nuevo_monto.reduce(
                                  (total, cantidad) =>
                                    total + parseFloat(cantidad),
                                  0
                                )
                              ).toFixed(2)}{" "}
                              BRL |{" "}
                              {parseFloat(
                                nuevo_monto.reduce(
                                  (total, cantidad) =>
                                    total + parseFloat(cantidad),
                                  0
                                ) / 4.78
                              ).toFixed(2)}{" "}
                              $
                            </>
                          );
                        })()}
                      </>
                    ) : (
                      "0.00"
                    )}
                  </h6>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button type="submit" class="btn btn-success">
                      Reservar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};