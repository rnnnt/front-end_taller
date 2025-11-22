const STORAGE_KEY = 'sanquinta_mediciones';

class MedicionService {
  static getAllMediciones() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const mediciones = JSON.parse(data);
      return mediciones.map(m => ({
        ...m,
        fechaHora: new Date(m.fechaHora)
      }));
    } catch (error) {
      console.error('Error al obtener mediciones:', error);
      return [];
    }
  }

  static getMedicionById(id) {
    const mediciones = this.getAllMediciones();
    return mediciones.find(m => m.id === id);
  }

  static addMedicion(medicion) {
    try {
      const mediciones = this.getAllMediciones();

      const nuevaMedicion = {
        id: Date.now().toString(),
        ...medicion,
        fechaHora: medicion.fechaHora.toISOString()
      };

      mediciones.push(nuevaMedicion);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mediciones));

      return { success: true, medicion: nuevaMedicion };
    } catch (error) {
      console.error('Error al agregar medición:', error);
      return { success: false, error: error.message };
    }
  }

  static deleteMedicion(id) {
    try {
      const mediciones = this.getAllMediciones();
      const medicionesFiltradas = mediciones.filter(m => m.id !== id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(medicionesFiltradas));

      return { success: true };
    } catch (error) {
      console.error('Error al eliminar medición:', error);
      return { success: false, error: error.message };
    }
  }

  static filterByTipo(tipo) {
    const mediciones = this.getAllMediciones();
    if (!tipo) return mediciones;

    return mediciones.filter(m => m.tipoMedida === tipo);
  }

  static getUnidadSimbolo(tipoMedida) {
    const simbolos = {
      'Kilowatts': 'kW',
      'Watts': 'W',
      'Temperatura': 'C'
    };
    return simbolos[tipoMedida] || '';
  }
}

export default MedicionService;
