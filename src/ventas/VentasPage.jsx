import { useNavigate } from "react-router-dom"

export const VentasPage = () => {

    const navigate = useNavigate();

    const toDesfiles = () =>{
        navigate ('desfiles')
    }

    const toGenerales = () =>{
        navigate ('generales')
    }

    return (

    <>
        <div className="card">

        <div className="card-body">
            <h5 className="card-title">Ventas de entradas para desfiles</h5>
            <p className="card-text">
                Este apartado sera utilizado para todo lo que tiene que ver con los 
                eventos que suceden en el sambodromo los cuales son los desfiles.</p>
            <button 
            className="btn btn-primary"
            onClick={toDesfiles}
            >Seleccionar</button>
        </div>
        <hr />
        </div>

        <div className="card">

        <div className="card-body">
            <h5 className="card-title">Venta de entradas para eventos generales</h5>
            <p className="card-text">
                Este apartado sera utilizado para todo lo que tiene que ver 
                con las venta de entradas a eventos generales.</p>
            <button  
            className="btn btn-primary"
            onClick={toGenerales}
            >Seleccionar</button>
        </div>
        <hr />
        </div>
    </>
  )
}
