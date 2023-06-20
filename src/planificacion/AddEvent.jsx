import { useState } from "react"


export const AddEvent = () => {

  

  return (
    <>

    <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Añadir
    </button>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir un evento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>


        <div className="modal-body">
            
        </div>


        <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" className="btn btn-success">Añadir</button>
        </div>
        </div>
    </div>
    </div>

    </>
  )
}
