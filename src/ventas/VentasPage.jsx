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
       <div class="card w-75 mb-4 mt-4 mx-auto">
       <div class="row g-0">
           <div class="col-md-4">
            <img src="https://img.freepik.com/foto-gratis/dos-entradas-vista-frontal-azul-aislado-blanco_1101-3055.jpg?w=996&t=st=1687179903~exp=1687180503~hmac=36a16ceec8cf16be5ce7da2731940044a0cfebf4e85fca1ba7eea78776b71414" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title"><strong>Venta De Entradas - Desfiles</strong></h5>
             <p class="card-text">El siguiente apartado es utilizado para todo lo que tiene que ver con la venta de entradas de los defiles. </p>
             <button className="btn btn-success" onClick={toDesfiles}> Seleccionar </button>
           </div>
        </div>
       </div>
    </div>

    <div class="card w-75 mb-4 mt-4 mx-auto">
       <div class="row g-0">
           <div class="col-md-4">
            <img src="https://img.freepik.com/foto-gratis/rosa-admitir-entradas-aisladas-blanco_1101-3056.jpg?w=996&t=st=1687179912~exp=1687180512~hmac=3bbeead74c493360d69ae2e850aee9dc981ba56083ff55a592582457fa3ac99d" class="img-fluid rounded-start" alt="..."/>
        </div>
        <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title"><strong>Venta De Entradas - Eventos Generales</strong></h5>
             <p class="card-text">El siguiente apartado es utilizado para todo lo que tiene que ver con la venta de entradas de los eventos generales. </p>
             <button className="btn btn-success" onClick={toGenerales}> Seleccionar </button>
           </div>
        </div>
       </div>
    </div>

    </>
  )
}
