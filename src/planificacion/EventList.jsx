import React, { useEffect, useState } from 'react'
import { FormGroup, FormLabel, FormSelect } from 'react-bootstrap';

export const EventList = () => {

    const [ eventos, setEventos ] = useState([]);
    const [ano_sel, setAno] = useState(0);

    const anos = [];

    const getEventos = async () =>{
        try {
            
            const response = await fetch("http://localhost:5000/eventos");
            const jsonData = await response.json();
            setEventos(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getEventos();
    },[])

    const handleAno = (event) => {
        setAno(event.target.value);
      };
      
    return (
        <>
            <br/><div className="container">
                <FormGroup>
                    <FormLabel><strong>Año</strong></FormLabel>
                    <FormSelect onChange={handleAno}>
                        {eventos.map(
                            (evento) =>
                                !anos.includes(evento.ano) &&
                                anos.push(evento.ano)
                        )}
                        <option value={0}>Seleccione un año</option>
                        {anos.map((ano) => (
                            <option value={ano}>{ano}</option>
                        ))}
                        {eventos.map(
                            (evento) =>
                                !anos.includes(evento.ano) &&
                                anos.push(evento.ano)
                        )}
                    </FormSelect>
                </FormGroup>
                <br/><div className="accordion accordion-flush" id="accordionFlushExample">

                    {ano_sel == 0
                        ? eventos.map(evento  => (
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${evento.id_calen_eve}`} aria-expanded="false" aria-controls={`flush-${evento.id_calen_eve}`}>
                                        {evento.nombre}
                                    </button>
                                </h2>
                                <div id={`flush-${evento.id_calen_eve}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                    <div className="accordion-body">
                                        <div >
                                            <strong>Hora de Inicio: </strong>{evento.hora_inicio}
                                        </div>
                                        <div >
                                            <strong>Fecha del Evento: </strong>{evento.fecha_evento}
                                        </div>
                                        <div>
                                            {evento.descripcion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : eventos.map(evento  => (
                                evento.ano == ano_sel && (
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-${evento.id_calen_eve}`} aria-expanded="false" aria-controls={`flush-${evento.id_calen_eve}`}>
                                            {evento.nombre}
                                        </button>
                                    </h2>
                                    <div id={`flush-${evento.id_calen_eve}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div >
                                                <strong>Hora de Inicio: </strong>{evento.hora_inicio}
                                            </div>
                                            <div >
                                                <strong>Fecha del Evento: </strong>{evento.fecha_evento}
                                            </div>
                                            <div>
                                                {evento.descripcion}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )
                            ))
                    }
                </div>   
            </div>
        </>
    )
}