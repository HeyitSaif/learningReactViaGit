import React, { useState, useEffect } from 'react';

import Header from './Header';
// import data from './data.json';
import ToDoList from './ToDoList';
import ToDoForms from './ToDoForms';


import './App.css';

function App() {
  const [alert, setAlert] = useState(false);
  const [ toDoList, setToDoList]= useState([]);
  useEffect(() => {
    // let mounted = true;
      
    
      fetch('http://localhost:3333/saif')
      .then(async (data) => {
        // const file=await data.json()
        // if(mounted) {
        // setToDoList(await data.json())
        // // console.log(data.json());
        // }
        data=await data.json()
        if(data){
        setToDoList(data)}
        // data.json().then(list => {
        // if(mounted) {
        // setToDoList(list)
        // console.log(data);      
        // }
      // })
      })
      .catch((error)=>{
        console.log({error}) 

      })  
     
    // return () => mounted = false;
  }, [])


  const handleToggle=(id)=>{
    let mapped =toDoList.map(task => {
      return task.id === Number (id) ? {...task, complete: !task.complete}:{...task}
    })
    setToDoList(mapped);
  }

  const handleFilter = ()=>{
    let filtered=toDoList.filter(task=>{
      return !task.complete;
    })
    setToDoList(filtered)
  }

  useEffect(() => {
    if(alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])

  const addtask = (userInput) => {
    // let copy =  [...toDoList];
    // copy = [...copy,{id: toDoList.length +1, task: userInput,complete: false}];
    // //setToDoList(copy);
    // yahan sa film shuru hoi ha//
    
        setAlert(true);

    const task=userInput;
    return fetch('http://localhost:3333/saif', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task, complete: false })
    })
      .then(data => data.json())
  }

  return (
    <div className="App">
      <Header />
      <ToDoForms addtask={addtask}/>
      {alert && <h2> Submit Successful</h2>}
      <ToDoList toDoList={toDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
      
    </div>
  );
}

export default App;
