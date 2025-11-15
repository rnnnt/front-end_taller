import { useState } from "react";
import Saludo from "./components/Saludo"
import SaludoForm from "./components/SaludoForm"

function App() {
  const [resultadoNombre, setResultadoNombre] = useState('');
  const [resultadoEdad, setResultadoEdad] = useState('');
  const handleSubmit = (nombre, edad) => {
    setResultadoNombre(nombre);
    setResultadoEdad(edad);
  };

  return <>
    <SaludoForm onSubmit={handleSubmit} ></SaludoForm>
    <Saludo nombre={resultadoNombre} edad={resultadoEdad} ></Saludo>
  </>
}

export default App
