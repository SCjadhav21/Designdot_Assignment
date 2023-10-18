import React from 'react'



const TodoItem = ({todo,deleteTodo,updateTodo}) => {
  const {id,isCompleted,value}=todo
   
  return (
    <div style={{border:"2px solid blue",padding:"20px" ,margin:"10px",color:isCompleted?"red":"yellow" ,backgroundColor:isCompleted?"Yellow":"red" }}>
      <p>{id}</p><h1>{value}</h1><b>{isCompleted?"Completed":"Not-Completed"}</b>
      <br />
      <button onClick={()=>updateTodo(id,{isCompleted:!isCompleted})}>ToggleStatus</button>
      <button onClick={()=>deleteTodo(id)}>Delete</button></div>
      
    
  )
}

export default TodoItem