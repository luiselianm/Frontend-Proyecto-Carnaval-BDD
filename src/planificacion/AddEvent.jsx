import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

//var evento;

export const AddEvent = () => {

  const [nombre, setNombre] = useState('');
  const [ano, setAno] = useState('');
  const [fecha_evento, setFecha] = useState('');
  const [hora_inicio, setHora] = useState('');
  const [tipo_evento, setTipoE] = useState('');
  const [tipo_audiencia, setTipoA] = useState('');
  const [gratis_pago, setGraPag] = useState('');
  const [direccion, setDir] = useState([]);
  const [descripcion, setDesc] = useState('');


  const [ isReady, setIsReady ] = useState(false);


  //Metodos del modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const abrirModal = () => setShow(true);

  useEffect(() => {
    obtenerDatos();
},[])


  useEffect(() => {
    fetch('http://localhost:5000/direccion')
    .then ( resp => resp.json())
    .then(data => setDir (data))
  },[])

  const handleChange = (evento) => {
  console.log(evento)
  }

//console.log(direccion);


  const obtenerDatos = async e => {
    //e.preventDefault();
    setIsReady(false);
    try {
      const body = { nombre, ano, fecha_evento, hora_inicio, tipo_evento, tipo_audiencia, gratis_pago, descripcion }
      await fetch('http://localhost:5000/agregarevento', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify(body)
      })
        .then (resp => resp.json() )
        .then ( json =>{
          setIsReady(true);
      })
      window.location = "/planificacion"
    } catch (error) {
      
    }
  }



  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    obtenerDatos(data);
    //obtenerDir(data);
  }
  console.log(errors);


  return (

    <>
      <Button variant="success" onClick={abrirModal}>
        Añadir Evento
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir un evento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Nombre del Evento</label>
            <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
            <input 
              type="text" 
              name="nombre"
              className ="form-control" 
              placeholder ="Ingrese el nombre" 
              value ={ nombre } 
              onChange ={e => setNombre(e.target.value)}
              />
            </div><br/>
              <label>Hora Inicio</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="time" 
                  name="hora_inicio"
                  className ="form-control" 
                  placeholder ="Formato 00:00:00" 
                  value ={ hora_inicio } 
                  onChange ={e => setHora(e.target.value)}
                  />
              </div><br/>
              <label>Fecha del Evento</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="date" 
                  name="fecha_evento"
                  className ="form-control" 
                  value ={ fecha_evento } 
                  onChange ={e => setFecha(e.target.value)}
                  />
              </div><br/>
              <label>Año del Evento</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="date" 
                  name="fecha_evento"
                  className ="form-control" 
                  value ={ ano } 
                  onChange ={e => setAno(e.target.value)}
                  />
              </div><br/>
              <label>Tipo de Evento</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="text" 
                  name="tipo_evento"
                  className ="form-control" 
                  placeholder ="D = desfile, G = general" 
                  value ={ tipo_evento } 
                  onChange ={e => setTipoE(e.target.value)}
                  />
              </div><br/>
              <label>Tipo de Audiencia del Evento</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="text" 
                  name="tipo_audiencia"
                  className ="form-control" 
                  placeholder ="true = todo publico, false = +18"
                  value ={ tipo_audiencia } 
                  onChange ={e => setTipoA(e.target.value)}
                  />
              </div><br/>
              <label>Gratis o Pago</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="text" 
                  name="gratis_pago"
                  className ="form-control" 
                  placeholder ="G = gratis, P = pago" 
                  value ={ gratis_pago } 
                  onChange ={e => setGraPag(e.target.value)}
                  />
              </div><br/>
              <div>
                {direccion.map( ({id_lugar_eventog, nombre }) =>(
                    <div>
                      <label key={id_lugar_eventog}>Direccion</label>
                    <input type="checkbox" onChange={handleChange}/>
                    { nombre }
                    </div>
                  ))
                
                }
              </div>
              
              <label>Descripción del Evento</label>
              <div className="input-group">
                <div className="input-group-addon">
                  <i className="glyphicon glyphicon-link"></i>
                </div>
                <input 
                  type="text" 
                  name="descripcion"
                  className ="form-control" 
                  placeholder ="Ingresar descripción" 
                  value ={ descripcion } 
                  onChange ={e => setDesc(e.target.value)}
                  />
              </div><br/>
              <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <input className="btn btn-success" type="submit" />
        </Modal.Footer>
            
          </form>
        </Modal.Body>

        
      </Modal>
    </>
  )
}