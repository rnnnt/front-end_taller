import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import MedicionService from '../services/MedicionService';

function MedicionesExistentes() {
  const toast = useRef(null);
  const [mediciones, setMediciones] = useState([]);
  const [medicionesFiltradas, setMedicionesFiltradas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState(null);

  const tiposMedida = [
    { label: 'Todos', value: null },
    { label: 'Kilowatts', value: 'Kilowatts' },
    { label: 'Watts', value: 'Watts' },
    { label: 'Temperatura', value: 'Temperatura' }
  ];

  useEffect(() => {
    cargarMediciones();
  }, []);

  const cargarMediciones = () => {
    const datos = MedicionService.getAllMediciones();
    setMediciones(datos);
    setMedicionesFiltradas(datos);
  };

  const aplicarFiltro = () => {
    if (!tipoFiltro) {
      setMedicionesFiltradas(mediciones);
    } else {
      const filtradas = MedicionService.filterByTipo(tipoFiltro);
      setMedicionesFiltradas(filtradas);
    }
  };

  const eliminarMedicion = (id) => {
    const resultado = MedicionService.deleteMedicion(id);

    if (resultado.success) {
      toast.current.show({
        severity: 'info',
        summary: 'Lectura Descartada',
        detail: 'La medición ha sido eliminada correctamente',
        life: 3000
      });

      cargarMediciones();

      if (tipoFiltro) {
        setTimeout(() => {
          const filtradas = MedicionService.filterByTipo(tipoFiltro);
          setMedicionesFiltradas(filtradas);
        }, 100);
      }
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar la medición',
        life: 3000
      });
    }
  };

  const formatearFecha = (rowData) => {
    const fecha = new Date(rowData.fechaHora);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  const formatearHora = (rowData) => {
    const fecha = new Date(rowData.fechaHora);
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const formatearValor = (rowData) => {
    const simbolo = MedicionService.getUnidadSimbolo(rowData.tipoMedida);
    return `${rowData.valor} ${simbolo}`;
  };

  const accionesTemplate = (rowData) => {
    return (
      <Button
        label="Descartar Lectura"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => eliminarMedicion(rowData.id)}
      />
    );
  };

  const header = (
    <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center">
      <div className="flex-grow-1">
        <h5 className="mb-0">Listado de Mediciones</h5>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <Dropdown
          value={tipoFiltro}
          options={tiposMedida}
          onChange={(e) => setTipoFiltro(e.value)}
          placeholder="Filtrar por tipo"
          className="w-auto"
        />
        <Button
          label="Filtrar"
          icon="pi pi-filter"
          onClick={aplicarFiltro}
          className="p-button-outlined"
        />
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <Toast ref={toast} position="top-center" />

      <Card className="shadow-sm">
        <DataTable value={medicionesFiltradas} header={header} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} sortField="fechaHora" sortOrder={-1} emptyMessage="No hay mediciones registradas" responsiveLayout="scroll" stripedRows>
          <Column field="fechaHora" header="Fecha" body={formatearFecha} sortable />
          <Column field="fechaHora" header="Hora" body={formatearHora} />
          <Column field="medidor" header="Medidor" sortable />
          <Column field="valor" header="Valor" body={formatearValor} sortable />
          <Column header="Acciones" body={accionesTemplate} style={{ width: '200px' }} />
        </DataTable>
      </Card>
    </div>
  );
}

export default MedicionesExistentes;

