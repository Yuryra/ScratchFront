// import React from 'react'
// import Todo from './Todo'

// export default function TodoList({todos, toggleTodo}){
//     //console.log('toggleTodo type (list level): ' + typeof toggleTodo); 
//     return (
//         todos.map(todo => {
//             return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
//         })
//     )
// }
import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    })
  )
}