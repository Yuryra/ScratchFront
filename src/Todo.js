import React from 'react'
// export default function Todo( {todo, toggleTodo}) {
//     //console.log('toggleTodo type : ' + typeof toggleTodo);   
  

//     function handleTodoClick() {
//         console.log('toggle:' + todo.id)
//         toggleTodo(todo.id)
//     }
//     return (
//         <div>
//             <label>
//                 <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
//                 {todo.name}
//             </label>
            
//         </div>
//     )

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
      toggleTodo(todo.id)
    }
    
    return (
      <div>
        <label>
          <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
          {todo.name}
        </label>
      </div>
    )
  }