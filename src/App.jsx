import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    
  ]);
  const [todo, setTodo] = useState("");
  // Todo !== Todo 1  && re-render
  // 0x456 !== 0x400 && re-render
  // prev state value === new state value ? no re-render : re-render
  // [] = 0x456... , {} = 0x443...
  const handleAddTodo = () => {
    const newTodo = {id: Date.now(), title: todo, completed: false}; 
    // todos = 0x456...
    const newArray = [...todos, newTodo] // 0x400
    setTodos(newArray) // 0x400
  }
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))
    if(storedTodos){
      setTodos(storedTodos) // "5" => {5} ----  "[{}]" => {} or []
    }
  }, [])
  
  useEffect(() => {
    if(todos.length > 0){
      localStorage.setItem('todos', JSON.stringify(todos)) // [] or {}
    }
  }, [todos])
  
  // add, delete, editW
  // filters
  return (
    <>
      <div>
      <h1 style={{color: "#FFF"}}>{todo}</h1>

      <InputGroup className="mb-3">
        <Form.Control
          value={todo}
          placeholder="Write To-do"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(event) => setTodo(event.target.value)}
        />
        <Button onClick={handleAddTodo} variant="outline-secondary" id="button-addon2">
          Add Todo
        </Button>
      </InputGroup>
        <ListGroup as="ul">
          {
            todos.map((todo, index) => (
              <ListGroup.Item key={index}>{todo.title}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
    </>
  )
}

export default App
