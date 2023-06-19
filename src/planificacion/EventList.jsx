import React, { useEffect, useState } from 'react'

export const EventList = () => {

    const [ eventos, setEventos ] = useState([]);

    const getEventos = async () =>{
        try {
            
            const response = await fetch("http://localhost:5000/eventos");
            const jsonData = await response.json();

            console.log(jsonData);

            setEventos(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getEventos();
    },[])


    return (
        <>
            <div className="container">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                {eventos.map(evento => (
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {evento.nombre} 
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                {evento.descripcion}
                            </div>
                        </div>
                    </div>
                ))}
                </div>   
            </div>
        </>
    )
}
