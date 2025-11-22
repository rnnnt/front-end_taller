import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import MedicionService from '../services/MedicionService';

function RegistrarLectura() {
  const navigate = useNavigate();
  const toast = useRef(null);

  const [fechaHora, setFechaHora] = useState(null);
  const [medidor, setMedidor] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [valor, setValor] = useState(null);
  const [tipoMedida, setTipoMedida] = useState('');

  const medidorOptions = Array.from({ length: 10 }, (_, i) => ({
    label: String(i + 1).padStart(2, '0'),
    value: String(i + 1).padStart(2, '0')
  }));

  const tiposMedida = [
    { label: 'Kilowatts', value: 'Kilowatts' },
    { label: 'Watts', value: 'Watts' },
    { label: 'Temperatura', value: 'Temperatura' }
  ];

  const validarFormulario = () => {
    const errores = [];

    if (!fechaHora) {
      errores.push('La fecha y hora son obligatorias');
    }

    if (!medidor) {
      errores.push('Debe seleccionar un medidor');
    }

    if (!direccion || direccion.trim() === '' || direccion === '<p></p>' || direccion === '<p><br></p>') {
      errores.push('La dirección es obligatoria');
    }

    if (!valor || valor <= 0 || valor > 500) {
      errores.push('El valor debe ser mayor que 0 y menor o igual que 500');
    }

    if (!tipoMedida) {
      errores.push('Debe seleccionar un tipo de medida');
    }

    return errores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errores = validarFormulario();

    if (errores.length > 0) {
      toast.current.show({
        severity: 'warn',
        summary: 'Errores de validación',
        detail: errores.join(', '),
        life: 5000
      });
      return;
    }

    const nuevaMedicion = {
      fechaHora: fechaHora,
      medidor: medidor,
      direccion: direccion,
      valor: valor,
      tipoMedida: tipoMedida
    };

    const resultado = MedicionService.addMedicion(nuevaMedicion);

    if (resultado.success) {
      // Limpiar formulario
      setFechaHora(null);
      setMedidor(null);
      setDireccion('');
      setValor(null);
      setTipoMedida('');

      navigate('/mediciones');
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo guardar la medición',
        life: 3000
      });
    }
  };

  return (
    <div className="container mt-4">
      <Toast ref={toast} position="top-center" />

      <Card title="Registrar Lectura" className="shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="fechaHora" className="form-label fw-bold">
                Fecha y Hora <span className="text-danger">*</span>
              </label>
              <Calendar
                id="fechaHora"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.value)}
                showTime
                hourFormat="24"
                dateFormat="dd-mm-yy"
                placeholder="dd-MM-yyyy HH:mm"
                className="w-100"
                showIcon
              />
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="medidor" className="form-label fw-bold">
                Medidor <span className="text-danger">*</span>
              </label>
              <Dropdown
                id="medidor"
                value={medidor}
                options={medidorOptions}
                onChange={(e) => setMedidor(e.value)}
                placeholder="Seleccione un medidor"
                className="w-100"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="direccion" className="form-label fw-bold">
                Dirección <span className="text-danger">*</span>
              </label>
              <Editor
                id="direccion"
                value={direccion}
                onTextChange={(e) => setDireccion(e.htmlValue)}
                style={{ height: '150px' }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label htmlFor="valor" className="form-label fw-bold">
                Valor <span className="text-danger">*</span>
              </label>
              <InputNumber
                id="valor"
                value={valor}
                onValueChange={(e) => setValor(e.value)}
                min={1}
                max={500}
                placeholder="Ingrese un valor (1-500)"
                className="w-100"
                showButtons
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold d-block">
                Tipo de Medida <span className="text-danger">*</span>
              </label>
              <div className="d-flex flex-column gap-2 mt-2">
                {tiposMedida.map((tipo) => (
                  <div key={tipo.value} className="d-flex align-items-center">
                    <RadioButton
                      inputId={tipo.value}
                      name="tipoMedida"
                      value={tipo.value}
                      onChange={(e) => setTipoMedida(e.value)}
                      checked={tipoMedida === tipo.value}
                    />
                    <label htmlFor={tipo.value} className="ms-2">
                      {tipo.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <Button
                type="submit"
                label="Registrar Lectura"
                icon="pi pi-check"
                className="w-100"
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RegistrarLectura;