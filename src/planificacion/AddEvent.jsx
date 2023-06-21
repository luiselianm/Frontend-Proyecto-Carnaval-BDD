import { useState } from "react"


export const AddEvent = () => {

  const [nombre, setNombre] = useState('');
  const [ano, setAno] = useState('');
  const [fecha_evento, setFecha] = useState('');
  const [hora_inicio, setHora] = useState('');
  const [tipo_evento, setTipoE] = useState('');
  const [tipo_audiencia, setTipoA] = useState('');
  const [gratis_pago, setGraPag] = useState('');
  const [descripcion, setDesc] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const body = { nombre, ano, fecha_evento, hora_inicio, tipo_evento, tipo_audiencia, gratis_pago, descripcion }
      await fetch('http://localhost:5000/agregarevento', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body)
      })
      window.location = "/"
    } catch (error) {
      
    }

  }


  return (
    <>

    <button type="button" className="btn btn-success"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Añadir</button>

    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">Añadir un evento</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div className="modal-body">
          <form onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="nombre">Nombre del Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="nombre"
                className ="form-control" 
                placeholder ="Ingrese el nombre" 
                value ={ nombre } 
                onChange ={e => setNombre(e.target.value)}
              />
            </div><br/>
          </div>
          <div>
            <label>Año del Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="ano"
                className ="form-control" 
                placeholder ="Ingrese el año" 
                value ={ ano } 
                onChange ={e => setAno(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Fecha del Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="fecha_evento"
                className ="form-control" 
                placeholder ="Formato AAAA-MM-DD" 
                value ={ fecha_evento } 
                onChange ={e => setFecha(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Hora de Inicio</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="hora_incio"
                className ="form-control" 
                placeholder ="Formato 00:00:00" 
                value ={ hora_inicio } 
                onChange ={e => setHora(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Tipo de Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="tipo_evento"
                className ="form-control" 
                placeholder ="D = desfile, G = general" 
                value ={ tipo_evento } 
                onChange ={e => setTipoE(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Tipo de Audiencia del Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="tipo_audiencia"
                className ="form-control" 
                placeholder ="true = todo publico, false = +18" 
                value ={ tipo_audiencia } 
                onChange ={e => setTipoA(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Gratis o Pago</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="gratis_pago"
                className ="form-control" 
                placeholder ="G = gratis, P = pago" 
                value ={ gratis_pago } 
                onChange ={e => setGraPag(e.target.value)}
                />
            </div><br/>
          </div>
          <div>
            <label>Descripción del Evento</label>
            <div className="input-group">
              <div className="input-group-addon">
                <i className="glyphicon glyphicon-link"></i>
              </div>
              <input 
                type="text" 
                id="descripcion"
                className ="form-control" 
                placeholder ="Ingresar descripción" 
                value ={ descripcion } 
                onChange ={e => setDesc(e.target.value)}
                />
            </div><br/>
          </div>
          </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-success">Añadir</button>
        </div>
        </div>
    </div>
    </div>

    </>
  )
}



