
export const TodoItem = ({id,text, completed, removeTodo,toggleTodoComplete}) => {
  return (
    <div>
        <input type="checkbox" checked={completed} onChange={() => toggleTodoComplete(id)} />
             <span> {text}</span>
             <span className='delete' onClick={() => removeTodo(id)}> &times; </span>
        
    </div>
  )
}
