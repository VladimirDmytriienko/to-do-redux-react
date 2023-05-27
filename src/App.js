
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import TodoList  from './components/TodoList';
import Inputs from './components/Inputs';
import {addNewTodo, fetchTodos} from './store/todoSlice'
import './App.css';


function App() {
  const [text, setText] = useState('');
  const {status, error} = useSelector(state => state.todos);
  const dispatch = useDispatch();
 
  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('')
  };

  useEffect(() => {
    dispatch(fetchTodos(1, 3));
  }, [dispatch])

  return (
    <div className="App">
      <Inputs text={text} handleInput={setText} handleSubmit={addTask}/>
      {status === 'loading' && <h2>Loading...</h2>}
      { error && <h2>An error occured: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
