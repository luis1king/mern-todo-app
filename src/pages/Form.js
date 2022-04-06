import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'
import Swal from 'sweetalert2'


export const Form = ({addTask}) => {
  
  const navigate= useNavigate()
  const [inputValue, setinputValue] = useState({
    titulo:'',
    tags:'',
    descripcion:'',
  })
  
  //desestructuramos
  const {titulo, tags, descripcion} = inputValue;
  
  const handleChange = (e) => {
    setinputValue({...inputValue, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(inputValue);
    setinputValue({
      titulo:'',
      tags:'',
      descripcion:''
    })
    Swal.fire('Tarea Creada!')
  }


  return (
    <div className="contenedor">
     <div className="formHeader"><h4>CREATE</h4></div>
      <div className="formContainer">
       <form className="row g-2" onSubmit={handleSubmit}>
       <div className="uno col-5">
          <label>Título</label>
          <input type="text" className="form-control" name='titulo' value={titulo} 
          onChange={handleChange} />

          <label>Tags</label>
          <input type='text'className="form-control" name='tags' value={tags} onChange={handleChange} />
          <button className="btn btn-danger volver" onClick={()=>navigate('/')}>Volver</button>
       </div>
       <div className="dos col-7">
       <label>Descripción</label>
        <textarea className="form-control" name="descripcion" 
        value={descripcion}
        onChange={handleChange}/>
        
        <button className="btn boton" type="submit">Enviar</button>
       </div>
       </form>


      </div>
    </div>
  )
}
