import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const ResultadosPage = ({}) => {

  const [ eventosD, setEventosD ] = useState([]);

  const navigate = useNavigate();

  const toResults = () =>{
      navigate ('resultadosfinal')
  }

  const getEventosD = async () =>{
    try {
        
        const response = await fetch("http://localhost:5000/eventos");
        const jsonData = await response.json();

        console.log(jsonData);

        setEventosD(jsonData);

    } catch (err) {
        console.log(err.message);
    }
}

  useEffect(() => {
      getEventosD();
  },[])

  return (
    <>
      <hr/>
      <h2 className="px-4">Resultados de los Desfiles</h2>
      <hr/>
        <div className="container">
          <div className="list-group list-group-flush ">
            {eventosD.map(evento => (
              
              <div className="list-group-item">
                {evento.nombre}
                  <button type="button" className="btn btn-info" onClick={ toResults }>Info</button>
              </div>
            ))} 
          </div>
        </div>
        
    </>
  )
}
  


//onClick={ toResults }