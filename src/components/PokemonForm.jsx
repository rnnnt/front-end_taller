import React, { useState } from 'react'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Panel } from 'primereact/panel';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function PokemonForm({onCreatePokemon = () => {}}) {
  const handleClick = () => {
    // Construir un objeto pokemon
    const pokemonObj = { nombre, numero, tipo };
    // Llamar a la función de creación que me pasaron por props
    onCreatePokemon(pokemonObj);
  }

  const footerTemplate = () => {
    return <div className='p-2 text-center'>
      <Button onClick={handleClick} rounded severity='info' label='Registrar' ></Button>
    </div>
  };
  const tipos = [
    { nombre: 'fuego', imagen: "" },
    { nombre: 'agua', imagen: "" },
    { nombre: 'electrico', imagen: "" },
  ];
  const [nombre, setNombre] = useState('');
  const [numero, setNumero] = useState(1);
  const [tipo, setTipo] = useState(null);

  return (
    <div className='mt-5'>
      <Panel header='Registro Pokemon' toggleable footerTemplate={footerTemplate} >
        <div className='mb-3'>
          <FloatLabel>
            <InputText id="username" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label htmlFor="username">Nombre</label>
          </FloatLabel>
        </div>
        <div className="mb-3">
          <FloatLabel>
            <InputNumber max={151} min={1} allowEmpty={false} maxFractionDigits={0} value={numero} onValueChange={(e) => setNumero(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            <label htmlFor="numero">Numero</label>
          </FloatLabel>
        </div>
        <div className="mb-3">
          <FloatLabel>
            <Dropdown value={tipo} onChange={(e)=>setTipo(e.value)} options={tipos} optionLabel='nombre' ></Dropdown>
            <label htmlFor="tipo">Tipo</label>
          </FloatLabel>
        </div>

      </Panel>
    </div>
  )
}

export default PokemonForm
