import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { DoneCard } from '../components/DoneCard'

export const Todo = ({state,deleteTask}) => {

  const navigate = useNavigate()
 
  return (
    
    <>
    <div className="container">
    
      <div className='col align-items-start'>
      <button className="btn btn-success" onClick={()=>navigate('/form')}>
            Create a task
          </button>
        <div className='row todo' >
          <div className='col bg m-5'>
          <span><h4>TO-DO</h4></span>
            <ul className="list-group">

            {
              state
              .map((task, id) =>(
                !task.done ?
                <Card key={id} {...task} /> :''
              ))
            }
            </ul>
          
          </div>

          <div className='col bg m-5'>
          <span><h4>DONE</h4></span>
          <ul className="list-group">
          

          {
            state.map( (task,id) => (
              task.done ?
                <DoneCard key={id} {...task} deleteTask={deleteTask}/> : ''
              ))
          }
              
            </ul>
          </div>
        </div>



      </div>
    </div>
    </>
  )
}
