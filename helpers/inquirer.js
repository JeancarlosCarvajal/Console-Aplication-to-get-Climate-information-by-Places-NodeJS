import 'colors';
// import inquirer from 'inquirer'
// require('colors');
import inquirer from 'inquirer';
// const inquirer = require('inquirer'); 
const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Que decea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1.'.green} Buscar Ciudad`,
      },
      {
        value: '2',
        name: `${'2.'.green} Historial`,
      },
      {
        value: '0',
        name: `${'3.'.green} Salir`,
      },
    ]
  }
];


const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.green);
  console.log('   Seleccione una Opcion   '.green);
  console.log('===========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas).then((opcion) => opcion);
  return opcion;
};

const pausa = async () => {
  const preguntas = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ];
  console.log('\n');
  await inquirer.prompt(preguntas).then();
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length == 0) {
          throw 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];
  const { desc } = await inquirer.prompt(question).then((desc) => desc);
  return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

  const choices = tareas.map((tarea, index) => {
    const indexNew = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indexNew} ${tarea.desc}`,
    }
  });
  // unshift para agrear de primero en el mapa de Opciones
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });
  // console.log(choices);
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas).then((opcion) => opcion);
  return id;
}

const confirmar = async (message = '') => {
  const preguntas = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
  const { ok } = await inquirer.prompt(preguntas).then((opcion) => opcion);
  return ok;
}

const mostratListadoCheckList = async (tareas = []) => {

  const choices = tareas.map((tarea, index) => {
    const indexNew = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${indexNew} ${tarea.desc}`,
      checked: tarea.completadaEn ? true : false,
    }
  });
  // console.log(choices);
  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecione',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(pregunta).then((opcion) => opcion);
  return ids;
}

export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostratListadoCheckList
};