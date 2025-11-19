import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import { Column } from 'primereact/column'
import React from 'react'
import dropIcon from '../assets/soltar.png'
import fireIcon from '../assets/fuego.png'
import plantIcon from '../assets/planta.png'
import thunderIcon from '../assets/destello.png'
import { Image } from 'primereact/image'
import { Button } from 'primereact/button'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'


function PokemonView( {pokemonData, onEnviarPc} ) {
  const handleEnviarPc = () => {
    // Confirm dialog para asegurarme de que si quieren ejecutar la aplicación
    confirmDialog({
      message: 'Desea enviar realmente al pc de bill?', 
      header: 'Eliminar pokemon de la lista', 
      accept: onEnviarPc,
     })
  };

  const tipoColumnTemplate = (row) => {
    let icono = null;

    switch(row.tipo.nombre) {
      case 'fuego': icono = fireIcon;
      break;
      case 'agua': icono = dropIcon;
      break;
      case 'planta': icono = plantIcon;
      break;
      case 'electrico': icono = thunderIcon;
      break;
    };
    return <Image width='64px' preview src={icono} />
  };

  return (
    <>
      <ConfirmDialog></ConfirmDialog>
      <div className='mt-5'>
        <Panel header='Pokedex'>
          <Button severity='danger' label='Enviar al pc de bill' rounded onClick={handleEnviarPc} ></Button>
          <DataTable value={pokemonData} paginator rows={5} >
            <Column header='Nombre' field='nombre' ></Column>
            <Column header='Tipo' body={tipoColumnTemplate} ></Column>
            <Column header='Numero' sortable field='numero' ></Column>
          </DataTable>
        </Panel>
      </div>
    </>
  )
}

export default PokemonView
