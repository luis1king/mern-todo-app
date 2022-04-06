import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Form } from './pages/Form';
import { Todo } from './pages/Todo';



function App() {

  //si hay todos en localStorage, lo retornamos y si no un []
  const initialState = () => {
    return JSON.parse(localStorage.getItem('state')) || [{
      id:  (+new Date()).toString(),
      titulo:'Nueva tarea',
      tags:'urgente',
      descripcion:'Añade una descripcion',
      done:false,
      date: new Date().getTime()
    }]
  }
  
  const [state, setState] = useState(initialState)
  
  console.log(state)
  
  //Guardamos los todos en local Storage
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  const addTask = (task) =>{
      setState([...state, {
        id:  (+new Date()).toString(),
        titulo:task.titulo,
        tags:task.tags,
        descripcion:task.descripcion,
        done:false,
        date: new Date().getTime()
      }])
  }

   const doneTask = (id) =>{
     const updateTask = state.map((task) =>
    task.id === id ? {...task, done: true,date: new Date().getTime()} : task);
      setState(updateTask);
    }

    const deleteTask = (index) =>{
      state.splice(index, 1);
      setState([...state])
    }

  return (
    
    <div className="App container-fluid">
      <header className="App-header">
      <div></div>
      <h3>Aplicación para gestión de proyectos</h3>
      </header>
      <main>
     
      <BrowserRouter> 
      <Routes>
        <Route path="/" element={
          <Todo state={state} doneTask={doneTask} deleteTask={deleteTask}/>
        }/>
         <Route path="/form" element={
          <Form addTask={addTask}/>
        }/>
      </Routes>
      </BrowserRouter>

      </main>
      <footer>
      <p>Todo los derechos reservados &copy; 2022</p>
      </footer>
    </div>
  );
}

export default App;
