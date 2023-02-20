import axios from 'axios';


class Busquedas {

  historial = [
    'Tegucigalpa',
    'Madrid',
    'San Jose',
  ];

  constructor() {
    // TODO: Base de datos
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'en',
    };
  }

  async ciudad(lugar = '') {
    // Peticion HTTP
    // const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/MADRID.json?proximity=ip&language=en&access_token=pk.eyJ1IjoiamNjOTYzOCIsImEiOiJjbGVieW52cHEweHNwM3BvOW8yNjc1cmdkIn0.x1Bu8h9s4cAC_tk1508-zg');
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });
      const resp = await instance.get();
      console.log(resp.data);
      return [];
    } catch (error) {
      console.log('error en Buscar Ciudad  ', error);

      return [];
    }


    return []; // Retornr los lugares

  }

}


export default Busquedas;