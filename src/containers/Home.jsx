import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-primary mb-3">
            <i className="pi pi-bolt me-3"></i>
            Sanquinta
          </h1>
          <p className="lead text-muted">
            Sistema de Gestión de Lecturas Eléctricas
          </p>
          <hr className="my-4" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <Card className="shadow-sm h-100">
            <div className="text-center p-3">
              <div className="mb-3">
                <i className="pi pi-plus-circle text-success" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="mb-3">Registrar Lectura</h5>
              <p className="text-muted mb-4">
                Registre nuevas lecturas de medidores eléctricos con información
                detallada de fecha, hora, medidor, dirección y valores.
              </p>
              <Button
                label="Ir a Registrar"
                icon="pi pi-arrow-right"
                className="p-button-success w-100"
                onClick={() => navigate('/registrarlectura')}
              />
            </div>
          </Card>
        </div>

        <div className="col-12 col-md-6">
          <Card className="shadow-sm h-100">
            <div className="text-center p-3">
              <div className="mb-3">
                <i className="pi pi-table text-primary" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="mb-3">Mediciones Existentes</h5>
              <p className="text-muted mb-4">
                Consulte, filtre y gestione todas las mediciones registradas en el sistema.
                Ordene por fecha y filtre por tipo de medida.
              </p>
              <Button
                label="Ver Mediciones"
                icon="pi pi-arrow-right"
                className="p-button-primary w-100"
                onClick={() => navigate('/mediciones')}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;