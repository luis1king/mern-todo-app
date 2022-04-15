import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { fetchApi } from './helpers/fetch';
import { Form } from './pages/Form';
import { Todo } from './pages/Todo';
import {UpdateTodo} from './pages/UpdateTodo'
import { ViewTodo } from './pages/ViewTodo';


function App() {

  const [state, setState] = useState([])

  //*Traemos los todos de la BBDD
  useEffect(() => {
   getTodos();
  }, [])

  const getTodos = async () => {
    try {
      const resp = await fetchApi('todos');
      //*Recibimos la resouesta de la BBDD
      const body = await resp.json();
      //*Desestructuramos el body, extraemos los todos
      const {todos} = body;
      //console.log(body.todos)
      //*Estamos recibiendo todos como un array de objetos
      setState(todos)
    } catch (err) {
      console.log(err)
    }
  }

  //*añadir nuevo Todo
  const addTask = async (task) =>{
    try {
      const newTask = {
          title:task.titulo,
          tags:task.tags,
          description:task.descripcion,
          done:false,
          date: new Date().getTime()
        }
        await fetchApi('todos',newTask,'POST');
        getTodos();
    } catch (err) {
      console.log(err)
    }
  }

  //*Actualizar TODO
 const updateTask = async (task) => {
   console.log(task)
  try {
      await fetchApi(`todos/${task._id}`,task,'PUT');
      getTodos();
  } catch (err) {
    console.log(err)
  }
 }

 //*Elimnar TODO
    const deleteTask = async (id) =>{
      try {
        await fetchApi(`todos/${id}`,{},'DELETE');
        getTodos();
    } catch (err) {
      console.log(err)
    }
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
          <Todo state={state} deleteTask={deleteTask}/>
        }/>
         <Route path="/form" element={
          <Form addTask={addTask}/>
        }/>
        <Route path="/:id" element={
        <UpdateTodo state={state} updateTask={updateTask}/>}/>
        <Route path="/todo/:id" element={
        <ViewTodo/>}/>
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
