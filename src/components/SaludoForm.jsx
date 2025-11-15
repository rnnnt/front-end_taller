import React, { useState } from 'react'

function SaludoForm({onSubmit = (nombre, edad) => {}}) {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState();

  const handleClick = () => {
    onSubmit(nombre, edad);
  };

  return (
    <div className='row'>
      <div className="mb-3">
        <label htmlFor="nombreTxt">Nombre</label>
        <input type="text" id='nombreTxt' className="form-control" onChange={(e)=>setNombre(e.target.value)} value={nombre}/>
      </div>
      <div className='mb-3'>
        <label htmlFor="edadTxt">Edad</label>
        <input type="text" className="form-control" onChange={(e)=>setEdad(e.target.value)} value={edad} />
      </div>
      <div className="mb-3">
        <button onClick={handleClick}
          className="btn btn-primary">Saludandi</button>
      </div>
    </div>
  )
}

export default SaludoForm
