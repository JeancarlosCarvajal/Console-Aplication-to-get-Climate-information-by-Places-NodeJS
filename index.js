import dotenv from 'dotenv';
dotenv.config();


import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";

// console.log(process.env.MAPBOX_KEY);

// console.log('MAPBOX_KEY: ', process.env.MAPBOX_KEY);

const main = async () => {
  // return; // for testing
  let opt = '';
  const busquedas = new Busquedas();

  // console.log('MAPBOX_KEY: ');
  // const texto = await leerInput('Ingresa un Valor');
  // console.log(texto);

  do {

    opt = await inquirerMenu();
    // console.log({ opt });

    switch (opt) {
      case '1':
        // Mostrar Mensaje
        const busqueda = await leerInput('Buscar Ciudad: ');

        // Buscar lugares
        const lugares = await busquedas.ciudad(busqueda);

        // Seleccionar el lugar
        const id = await listarLugares(lugares);
        // Evita el error al tratar de buscar el cero (cancel)
        // en el metodo find(), continua pero saltando las demas funciones
        if (id === '0') continue;
        // console.log({ id }); 
        const lugarSelected = lugares.find(lugar => lugar.id === id);
        // console.log(lugarSelected);   

        // Guardr en DB
        busquedas.agregarHistorial(lugarSelected.nombre);


        // El clima
        const clima = await busquedas.climaLugar(
          lugarSelected.lat,
          lugarSelected.lng
        );


        // Mostrar Resultados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad: ', busqueda);
        console.log('Lat: ', lugarSelected.lat);
        console.log('Lng: ', lugarSelected.lng);
        console.log('Temperatura: ', clima.temp);
        console.log('Minima: ', clima.min);
        console.log('Maxima: ', clima.max);
        console.log('Description: ', clima.description);

        break;
      case '2':
        busquedas.leerHistorialCapitalizado().forEach((lugar, index) => {
          const idx = `${(index + 1)}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        // tareas.listadoCompleto();
        // console.log(tareas.getTaskListado);
        break;
      case '0': // Salir
        console.log('Saliendo');
        // tareas.listarPendientescompletadas(true);
        break;
      default:
        break;
    }
    // guardarDB(tareas.getListadoTareas);
    await pausa();
  } while (opt !== '0');


}


main();