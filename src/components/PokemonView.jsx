import { DataTable } from 'primereact/datatable'
import { Panel } from 'primereact/panel'
import { Column } from 'primereact/column'
import React from 'react'

function PokemonView( {pokemonData} ) {
  return (
    <div className='mt-5'>
      <Panel header='Pokedex'>
        <DataTable value={pokemonData} paginator rows={5} >
          <Column header='Nombre' field='nombre' ></Column>
          <Column header='Tipo' field='tipo' ></Column>
          <Column header='Numero' sortable field='numero' ></Column>
        </DataTable>
      </Panel>
    </div>
  )
}

export default PokemonView
