import React, { useEffect, useState } from 'react'

export const EventList = () => {

    const [ eventos, setEventos] = useState([]);

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

                <div class="accordion accordion-flush" id="accordionFlushExample">
                {eventos.map(evento => (
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                {evento.nombre} 
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
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
