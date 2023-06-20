import { useEffect, useState } from "react"

export const VentasDesfiles = () => {

  const [autorizados, setAutorizados] = useState([])

  const getAutorizados = async () =>{
    try {
        
        const response = await fetch("http://localhost:5000/autorizados");
        const jsonData = await response.json();
        setAutorizados(jsonData);

    } catch (err) {
        console.log(err.message);
    }
}


    useEffect(() => {
      getAutorizados();
    },[])

  return (
    <div className="container pt-4">
        <table className="table caption-top">
      <thead className="table-success">

      <tr>
        <th scope="col">#</th>
        <th scope="col">Empresa</th>
        <th scope="col">Tipo Entrada</th>
        <th scope="col">Cantidad Maxima</th>
      </tr> 
      </thead>
      <tbody>
          { 
            autorizados.map(autorizado => (
              <tr>
                <th scope="row"></th>
                <td>{autorizado.num_rif}</td>
                <td>{autorizado.id_entrada}</td>
                <td>{autorizado.cant_max}</td>
              </tr>
            ))
          }     
      </tbody>
    </table>
  </div>
    
  )
}
