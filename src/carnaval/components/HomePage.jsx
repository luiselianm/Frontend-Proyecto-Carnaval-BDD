import { useNavigate } from "react-router-dom";

export const HomePage = () => {

    const navigate = useNavigate();

    const toPlanificacion = () =>{
        navigate ('planificacion')
    }

    const toVentas = () =>{
        navigate ('ventas')
    }

    const toResultados = () =>{
        navigate ('resultados')
    }

  return (
    <>
    <div className="card">
 
        <div className="card-body">
            <h5 className="card-title">Planificación del Carnaval</h5>
            <p className="card-text">Este apartado sera utilizado para todo lo que tiene que ver con la planificacion de eventos.</p>
            <button 
            className="btn btn-primary"
            onClick={toPlanificacion}
            >Seleccionar</button>
        </div>
        <hr />
    </div>

    <div className="card">
 
        <div className="card-body">
            <h5 className="card-title">Control de ventas</h5>
            <p className="card-text">Este apartado sera utilizado para todo lo que tiene que ver con las venta de entradas o reservas de paquetes y a su vez con las empresas vendedoras.</p>
            <button 
            className="btn btn-primary"
            onClick={toVentas}
            >Seleccionar</button>
        </div>
        <hr />
    </div>

    <div className="card">
 
        <div className="card-body">
            <h5 className="card-title">Resultados de un carnaval</h5>
            <p className="card-text">Este apartado sera utilizado para indicar cuales fueron los resultados del carnaval.</p>
            <button 
            className="btn btn-primary"
            onClick={toResultados}
            >Seleccionar</button>
        </div>
        <hr />
    </div>

    </>
  )
}
