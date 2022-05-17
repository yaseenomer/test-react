

import { createSlice } from "@reduxjs/toolkit"




export const todo = createSlice({
    name: "todo",
    initialState:{
        todos: [],
        loading: false
    },

    reducers : {
        getTodos(state,  action ) {
            state.todos =  action.payload
        },

        addTodo(state, action) {
            state.todos  = [...state.todos, action.payload]
        },

        deleteTodo(state, action) {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        },

        markAsDone(state, action) {
            state.todos = state.todos.map((todo) => {
                if (todo.title === action.payload.title ){
                    todo.done = true
                    return todo
                }
                return todo
            })
        }
    }
})

export const { getTodos, addTodo, deleteTodo, markAsDone  } = todo.actions


export default todo.reducer 

