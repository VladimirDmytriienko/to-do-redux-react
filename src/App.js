
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoList  from './components/TodoList';
import Inputs from './components/Inputs';
import {addTodo} from './store/todoSlice'
import './App.css';


function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
 
  const addTask = () => {
    dispatch(addTodo({text}))
    setText('')
  };
 
  return (
    <div className="App">
      <Inputs text={text} handleInput={setText} handleSubmit={addTask}/>
      
      <TodoList />
    </div>
  );
}

export default App;
