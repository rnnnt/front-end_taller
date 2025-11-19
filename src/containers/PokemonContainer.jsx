import React, { useEffect, useRef, useState } from 'react'
import PokemonForm from '../components/PokemonForm'
import PokemonView from '../components/PokemonView'
import { createPokemon, deleteAll, getPokemon } from '../services/PokemonService';
import { Toast } from 'primereact/toast';


function PokemonContainer() {
  const toast = useRef(null);

  const [pokemonData, setPokemonData] = useState([]);

  const handleCreate = (pokemon) => {
    createPokemon(pokemon);
    toast.current.show({severity:'success', summary: 'Pokemon Registrado', detail:'Nuevo pokemon disponible', life: 3000});
    const data = getPokemon();
    setPokemonData(data);
  };

  const handleEnviar = () => {
    deleteAll();
    setPokemonData([]);
    toast.current.show({severity: 'danger', summary: 'F pokemon'})
  };

  useEffect(() => {
    // Si el arreglo de dependencias esta vacío, este callBack se ejecuta una vez
    const data = getPokemon();
    setPokemonData(data);
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <div className='row'>
        <div className="col">
          <PokemonForm onCreatePokemon={handleCreate} ></PokemonForm>
        </div>
        <div className="col">
          <PokemonView onEnviarPc={handleEnviar} pokemonData={pokemonData} ></PokemonView>
        </div>
      </div>
    </>
  )
}

export default PokemonContainer
