import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Menubar } from 'primereact/menubar';
import Home from "./containers/Home";
import MedicionesExistentes from "./components/MedicionesExistentes";
import RegistrarLectura from "./components/RegistrarLectura";

function App() {

  const items = [{
    label: 'Home',
    icon: 'pi pi-home',
    url: '/home'
  },
  {
    label: 'Registrar lectura',
    icon: 'pi pi-plus-circle',
    url: '/registrarlectura'
  },
  {
    label: 'Mediciones Existentes',
    icon: 'pi pi-table',
    url: '/mediciones'
  },
  ]

  return <>
    <div className="card">
      <Menubar model={items} ></Menubar>
    </div>
    <div className="mt-4">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/registrarlectura" element={<RegistrarLectura />} />
        <Route path="/mediciones" element={<MedicionesExistentes />} />
      </Routes>
    </div>
  </>
}

export default App

