import dotenv from 'dotenv';
dotenv.config();


import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js";
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
        const ciudad = await leerInput('Buscar Ciudad: ');
        // Buscar lugares
        const diudades = await busquedas.ciudad(ciudad);
        // console.log('Quiero buscar la ciudad: ', ciudad);

        // Seleccionar el lugar

        // El clima

        // Mostrar Resultados
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad: ', ciudad);
        console.log('Lat: ',);
        console.log('Lng: ',);
        console.log('Temperatura: ',);
        console.log('Minima: ',);
        console.log('Maxima: ',);



        break;
      case '2':
        console.log('Historial');
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