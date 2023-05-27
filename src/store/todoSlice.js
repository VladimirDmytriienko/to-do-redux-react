import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function( _, {rejectWithValue}) {
        try {

            const response = await fetch('https://6470e2683de51400f7250f45.mockapi.io/todos');
            if (!response.ok) {
                throw new Error( ' Server Error')
            }
            const data = await response.json();
            return data;

        } catch(error) {
            return rejectWithValue(error.messsage)
        }
        
    }
)
export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async function(id, { rejectWithValue, dispatch }) {
      try {
        const response = await fetch(`https://6470e2683de51400f7250f45.mockapi.io/todos/${id}`, {
          method: 'DELETE',
        });
 
        if (!response.ok) {
          throw new Error( ' Can not delete task. server error')
        } 
        dispatch(removeTodo({id}))
      } catch (error) {
        return rejectWithValue(error.messsage)
      }
    }
);

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(todo => todo.id === id)
        try{
            const response = await fetch(`https://6470e2683de51400f7250f45.mockapi.io/todos/${id}`, {
                method: 'PUT',
                headers: {'content-type':'application/json'},
                body: JSON.stringify({completed: !todo.completed})
            })
            if (!response.ok) {
                throw new Error( ' Can not toggle status. Server error')
            } 
            dispatch(toggleTodoComplete({id}))
        } catch(error) {
            return rejectWithValue(error.messsage)
        }

    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, {rejectWithValue, dispatch}) {
        try {
            const todo = {
                title: text,
                completed: false
            };
            const response = await fetch(`https://6470e2683de51400f7250f45.mockapi.io/todos`, {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(todo)
            })
            if (!response.ok) {
                throw new Error( ' Can not add task. Server error')
            } 
            const data = await response.json()
       
            dispatch(addTodo(data))
        } catch (error) {
            return rejectWithValue(error.messsage); 
        }
    }
    
)

const setError =  (state, action) => {
    state.status = 'rejeced';
    state.error = action.payload
}

const todoSlice = createSlice ({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action){
            
            state.todos.push(action.payload)
        },
        toggleTodoComplete(state, action){
            const toggledTdo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTdo.completed = !toggledTdo.completed;
        },
        removeTodo(state, action){
            state.todos = state.todos.filter( todo => todo.id !== action.payload.id)
        }
        
        
    },
    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolve';
            state.todos = action.payload
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError
        
       
    }
})

 const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions; 
export default todoSlice.reducer;