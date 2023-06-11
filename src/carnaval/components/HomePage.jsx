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
    <div class="card w-75 mb-4 mt-4 mx-auto">
       <div class="row g-0">
           <div class="col-md-4">
            <img src="https://cdn.create.vista.com/api/media/medium/18210553/stock-photo-carnaval-scene?token=" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title"><strong>Planificación Del Carnaval</strong></h5>
             <p class="card-text">El siguiente apartado es utilizado para todo lo que tiene que ver con la planificación y organización del carnaval de Río de Janeiro. </p>
             <button className="btn btn-success" onClick={toPlanificacion}> Seleccionar </button>
           </div>
        </div>
       </div>
    </div>


    <div class="card w-75 mb-4 mt-4 mx-auto">
       <div class="row g-0">
           <div class="col-md-4">
            <img src="https://cdn.create.vista.com/api/media/medium/505671036/stock-photo-rio-janeiro-just-sunrise-city?token=" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title"><strong>Control De Ventas</strong></h5>
             <p class="card-text">El siguiente apartado es utilizado para todo lo que tiene que ver con el control de ventas, tanto para los desfiles como para los eventos generales. </p>
             <button className="btn btn-success" onClick={toVentas}> Seleccionar </button>
           </div>
        </div>
       </div>
    </div>

    <div class="card w-75 mb-4 mt-4 mx-auto">
       <div class="row g-0">
           <div class="col-md-4">
            <img src="https://cdn.create.vista.com/api/media/medium/321541588/stock-photo-2019-masskara-festival?token=" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title"><strong>Resultados Finales</strong></h5>
             <p class="card-text">El siguiente apartado es utilizado para indicar cuales fueron los resultados del carnaval de Río de Janeiro.</p>
             <button className="btn btn-success" onClick={toResultados}> Seleccionar </button>
           </div>
        </div>
       </div>
    </div>

    </>
  )
}
