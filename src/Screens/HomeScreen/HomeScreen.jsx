import React from 'react'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    const user_info = JSON.parse(sessionStorage.getItem('user_info'))
  return (
    <div>
      <h1>bienvenido {user_info.name}</h1>
      <Link to={'/product/new'}>Crear producto</Link>
    </div>
  )
}

export default HomeScreen
