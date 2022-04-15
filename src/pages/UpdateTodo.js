import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/form.css'
import Swal from 'sweetalert2'
import { fetchApi } from '../helpers/fetch'


export const UpdateTodo = ({updateTask}) => {
  
  const navigate= useNavigate();
  const location = useLocation();
  const id = location.pathname.slice(1);
  
  useEffect(() => {
    getSingleTodo(id)
  }
  , [])
  
  const getSingleTodo = async (id) => {
    try {
      const resp = await fetchApi(`todos/${id}`,{},'GET');
      //*Recibimos la resouesta de la BBDD
      const body = await resp.json();
      //return;
      //*Desestructuramos el body, extraemos los todos
        const {todos} = body;
        console.log(body.todos)
        //*Estamos recibiendo todos como un array de objetos
        setinputValue(todos)
      } catch (err) {
        console.log(err)
      }
    }
    
    const [inputValue, setinputValue] = useState({
      id: id,
      title:'',
      tags:'',
      description:'',
      done:false
    });

  //desestructuramos
  const {title, tags, description, done} = inputValue;
  
  const handleChange = (e) => {
    setinputValue({...inputValue, [e.target.name]: e.target.value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue);
    updateTask(inputValue);
    setinputValue({
      title:'',
      tags:'',
      description:'',
      done:false
    })
    Swal.fire('Tarea Actualizada!')
  }


  return (
    <div className="contenedor">
     <div className="formHeader"><h4>UPDATE A TODO</h4></div>
      <div className="formContainer">
       <form className="row g-2" onSubmit={handleSubmit}>
       <div className="uno col-5">
          <label>Título</label>
          <input type="text" className="form-control" name='title' value={title} 
          onChange={handleChange} />

          <label>Tags</label>
          <input type='text'className="form-control" name='tags' value={tags} onChange={handleChange} />
          <select className="form-select" aria-label="Default select example" value={done} onChange={handleChange} name='done'>
            <option value={false}>false</option>
            <option value={true}>true</option>
          </select>
          <button className="btn btn-danger volver" onClick={()=>navigate('/')}>Volver</button>
       </div>
       <div className="dos col-7">
       <label>Descripción</label>
        <textarea className="form-control" name="description" 
        value={description}
        onChange={handleChange}/>
        
        <button className="btn boton" type="submit">Enviar</button>
       </div>
       </form>


      </div>
    </div>
  )
}
