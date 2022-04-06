import moment from 'moment'
import 'moment/locale/es'
import React from 'react'
import '../styles/todoCard.css'



export const Card = (props) => {
  const {titulo, descripcion,tags,date, doneTask,id} = props
  const taskDate = moment(date)
  

  const handleClick = (e) => {
    doneTask(id)
  }

  return (
    <div className="card border-dark mb-3">
        <div className="card-header bg-transparent border-dark">{titulo}</div>
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
           
            <p className="card-text">{descripcion}</p>
            <span className="badge rounded-pill bg-secondary">{taskDate.format('LLL')}</span>
            </div>
        <div className="card-footer done t border-success" onClick={handleClick}>DONE</div>
    </div>
  )
}
