import moment from 'moment'
import 'moment/locale/es'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/todoCard.css'



export const Card = (props) => {

  const {title, description,tags,date,_id} = props
  const taskDate = moment(date)
  const navigate = useNavigate();
  

  return (
    <div className="card border-dark mb-3">
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
            <div className="view">
              <Link to={`/todo/${_id}`}>View</Link>
            </div>
        <div className="card-footer done t border-success" onClick={()=>navigate(`/${_id}`)}>EDIT</div>
    </div>
  )
}
