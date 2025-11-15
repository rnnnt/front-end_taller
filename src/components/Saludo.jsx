import React from 'react'

function Saludo(props) {
  const {nombre} = props;
  const {edad} = props;

  if (!nombre || !edad) {
    return <></>
  }
  return (
    <div className='alert alert-info'>
      <h1>Hola como estas ? {props.nombre}</h1>
      <h3>{nombre} </h3>
      <h3>tu edad es {edad}</h3>
    </div>
  )
}

export default Saludo
