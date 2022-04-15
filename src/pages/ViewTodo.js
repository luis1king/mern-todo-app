import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchApi } from '../helpers/fetch'
import moment from 'moment'

export const ViewTodo = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.slice(6)
  const [state, setState] = useState([])

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
    setState(todos)
  } catch (err) {
    console.log(err)
  }
}
const {title,description,date,tags} = state; 
const taskDate = moment(date);

  return (
    
    <div className="container">
       <div className="card border-success mb-3">
      <div className="card-header bg-transparent border-dark">{title}</div>
            <div className="card-body">
            {(() => {
        switch (tags) {
          case 'urgente':
            return (<span className="badge rounded-pill bg-danger">{tags}</span>)
          case 'medio':
            return (<span className="badge rounded-pill bg-warning">{tags}</span>)
          case 'bajo':
            return (<span className="badge rounded-pill bg-success">{tags}</span>)
          default:
            return ( <span className="badge rounded-pill bg-info">{tags}</span>)
        }
           })()}
           
            <p className="card-text">{description}</p>
            <span className="badge rounded-pill bg-secondary">{taskDate.format('LLL')}</span>
            </div>
        <div className="card-footer todoCard l bg-green border-success" onClick={()=>navigate(-1)}>GO BACK</div>
    </div>
  </div>
  )
}
