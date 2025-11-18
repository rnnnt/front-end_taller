const localKey = "pokemon_list_data";

const createPokemon = (pokemon) => {
  // LocalStorage, SessionStorage
  let lista = [];
  const data = localStorage.getItem(localKey);
  if (data != null) {
    lista = JSON.parse(data);
  }
  lista = [...lista, pokemon];
  localStorage.setItem(localKey, JSON.stringify(lista));
};

const getPokemon = () => {
  const data = localStorage.getItem(localKey);
  if (data != null) {
    return JSON.parse(data);
  }
  return [];
};

export { createPokemon, getPokemon };