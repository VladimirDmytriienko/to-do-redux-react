import { TodoItem } from "./TodoItem"
export const TodoList = ({todos, removeTodo, toggleTodoComplete}) => {
  return (
    <div>
        {
            todos.map(todo => <TodoItem key={todo.id} removeTodo={removeTodo} toggleTodoComplete={toggleTodoComplete} {...todo}/>)
        }

    </div>
  )
}
