import React, { useEffect, useState } from 'react';
import { FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


export const ResultadosPage = ({}) => {

  const [ eventos, setEventos ] = useState([]);
  const [ ano_sel, setAno]  = useState(0);
  const [ Show_Modal, setShow_Modal ] = useState(false);
  const [ Evento_Sel, setEvento_Sel ] = useState();
  const [ posicion_resultado, setPosi ] = useState('');
  const [ escuelas, setEscuelas ] = useState([]);

  const anos = [];

  const getEventosD = async (e) => {
    try {
        const response = await fetch("http://localhost:5000/eventosdesfiles");
        const jsonData = await response.json();
        setEventos(jsonData);
    } catch (err) {
        console.log(err.message);
    }
}

const obtenerDatos = async ({ escuela }) => {
  setIsReady(false);
  try {
    const body = { posicion_resultado }
    await fetch(`http://localhost:5000/updatepos/${escuela.id}`, {
      'method': 'PUT',
      'headers': {'Content-Type': 'application/json'},
      'body': JSON.stringify(body)
    })
      .then (resp => resp.json() )
      .then ( json =>{
    })
    window.location = "/resultados"
  } catch (error) {
    
  }
}

    useEffect(() => {
        getEventosD();
    },[])

    useEffect(() => {
      fetch('http://localhost:5000/escuelaspos')
      .then ( resp => resp.json())
      .then (data => setEscuelas (data))
    },[])
  

    const handleChange = (evento) => {
      const {value, checked} = evento.target
      if(checked) {
        setSelect([value])
        setLugar(evento.target.value)
      }else 
        setSelect(select.filter(v => v !==value))
    }

  const { handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    obtenerDatos(data);
  }
  console.log(errors);

    const handleAno = (event) => {
      setAno(event.target.value);
    };

    const handleSeleccion = (evento) => {
      setShow_Modal(true);
      setEvento_Sel(evento);
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
            {eventos.map((evento) =>
              !anos.includes(evento.ano) && anos.push(evento.ano)
            )}
            <option value={0}>Todos</option>
            {anos.map((ano) => (
              <option value={ano}>{ano}</option>
            ))}
            {eventos.map((evento) =>
              !anos.includes(evento.ano) && anos.push(evento.ano)
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
          <tbody href="#" className="link-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
            {ano_sel == 0
              ? eventos.map((evento) => (
                <tr onClick={(e) => handleSeleccion(evento, e)}>
                  <th scope="row"></th>
                  <td>{evento.nombre}</td>
                  <td>{evento.fecha_evento}</td>
                </tr>
              ))
              : eventos.map((evento) =>
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
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                      <label>Ingresar Posiciones del Evento</label>
                      <div>
                        {escuelas.map(({ id_escuela, nombre }) => (
                            <div value>
                              {nombre}
                            </div>
                          ))
                          }
                        </div><br />
                  </div>
                  <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
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
    </>
  )
}


