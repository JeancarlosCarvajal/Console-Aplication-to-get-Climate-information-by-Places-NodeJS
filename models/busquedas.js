import fs from 'fs';
import axios from 'axios';



class Busquedas {

  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDB();
  }

  leerHistorialCapitalizado() {
    return this.historial.map(lugar => {
      let newLugar = (lugar.charAt(0).toUpperCase() + lugar.slice(1));
      return newLugar;
    });
  }

  get paramsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'en',
    };
  }

  paramsOpenWeatherMap = (lat = 0.0, lon = 0.0) => {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'lat': lat,
      'lon': lon,
      'units': 'metric',
      'lang': 'es',
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
      // console.log(resp.data.features);
      return resp.data.features.map(lugar => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log('error en Buscar Ciudad  ', error);

      return [];
    }
  }

  async climaLugar(lat, lon) {
    // console.log(this.paramsOpenWeatherMap(lat, lon));

    try {

      // instance axios.create()
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather/`,
        params: this.paramsOpenWeatherMap(lat, lon),
      });
      // resp.data
      const resp = await instance.get();
      const { weather, main } = resp.data;

      // console.log(resp);

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      }

    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = '') {
    // console.log(this.historial.length); 
    if (this.historial.length >= 5) this.historial.pop();
    if (this.historial.includes(lugar.toLocaleLowerCase())) return;
    this.historial.unshift(lugar.toLocaleLowerCase());

    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payLoad = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) {
      return [];
    }
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    // console.log(info); 
    const data = JSON.parse(info);
    this.historial = data.historial;
    // return data.historial;
  }
}


export default Busquedas;