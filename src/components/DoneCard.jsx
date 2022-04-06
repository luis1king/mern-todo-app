import React from 'react'
import moment from 'moment'
import 'moment/locale/es'



export const DoneCard = (props) => {
  const {titulo, descripcion,tags,date,deleteTask }= props
  const taskDate = moment(date)
  const handleDeleteTask =(index)=> {
    deleteTask(index)
  }
  console.log(deleteTask)

  return (
    <div className="card border-success mb-3">
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
        <div className="card-footer todoCard l bg-green border-success" onClick={handleDeleteTask}><i className="bi bi-trash"/> TO-DO</div>
    </div>
  )
}
