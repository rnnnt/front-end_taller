import React from 'react'

function Saludo(props) {
  return (
    <div>
      <h1>Hola como estas ? {props.nombre}</h1>
      <h3>{props.nombre}</h3>
    </div>
  )
}

export default Saludo
