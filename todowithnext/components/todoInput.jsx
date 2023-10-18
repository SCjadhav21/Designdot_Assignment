import React from 'react'
// import { useDispatch } from 'react-redux'
// import { addTodos } from '../redux/actions';

const TodoInput = ({setTodos,intialData}) => {
    const [value,setValue]=React.useState("")

    
 
    const handleChange=(e)=>{
        setValue(e.target.value);
    }
    const handleSubmit=()=>{
        setTodos([...intialData,{id:Date.now(),value:value,isCompleted:false}])
    }

   
    
  return (

    <div style={{ padding:"50px",border:"3px solid black"}}>
     <header>Add Todo</header>
     <div ><input onChange={handleChange} value={value} placeholder='add here...'/><button onClick={handleSubmit}>Add</button></div>
    </div>
  )
}

export default TodoInput