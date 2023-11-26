import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Signup from './components/Signup'
import Todo from './components/Todo'
import NotFound from './components/NotFound'
const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home/>} path='/'></Route>
        <Route element={<Login/>} path='/login'></Route>
        <Route element={<Signup/>} path='/signup'></Route>
        <Route element={<Todo/>} path='/todo'></Route>
        <Route element={<NotFound/>} path='*'></Route>
      </Routes>
    </div>
  )
}

export default App