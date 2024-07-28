import { useState } from 'react'
import Login from './components/login'
import Dashboard from './components/dashboard'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App(props) {
  
  function content(props){
    if(props.page === "login"){
      return <Login />
    }
    if(props.page === "dash"){
      return <Dashboard />
    }
    return <>
          <Navbar />
          <Home />
          </>
  }

  return (
    <>
      {content(props)}
    </>
  )
}

export default App
