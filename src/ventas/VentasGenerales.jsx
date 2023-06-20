import { useEffect, useState } from "react";

export const VentasGenerales = () => {
  const [eventoGP, setEventoGP] = useState([])

  const getEventoGP = async () =>{
    try {
        
        const response = await fetch("http://localhost:5000/eventosgeneralespagos");
        const jsonData = await response.json();
        setEventoGP(jsonData);
        console.log(eventoGP)

    } catch (err) {
        console.log(err.message);
    }
}


    useEffect(() => {
      getEventoGP();
    },[])

  return (
    <div className="container pt-4">
        <table className="table caption-top">
      <thead className="table-success">

      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        {/* <th scope="col">Tipo Audiencia</th> */}
        <th scope="col">Costo</th>
      </tr> 
      </thead>
      <tbody>
          { 
            eventoGP.map(eventoGP => (
              <tr>
                <th scope="row"></th>
                <td>{eventoGP.nombre}</td>
                {/* <td>{(eventoGP.tipo_audiencia )}</td> aqui hay que condicionar que si es true muestre todo publico y viceversa*/}
                <td>{eventoGP.costo}</td>
              </tr>
            ))
          }     
      </tbody>
    </table>
  </div>
    
  )
}
