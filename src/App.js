import { useState, useEffect } from 'react';
import BarraSuperior from "./Componentes/Barra_superior"
import FilaTareas from "./Componentes/FilaTareas";
//import FetchTareas from './FetchNoTanFetch/Listado_tareas';
import AgregarTareas from "./Componentes/AgregarTareas";
import TareasCompletas from "./Componentes/TareasCompletas";


function App() {

  //Inicio Bloque definicion de constantes

  const [user, setUser] = useState("Nicolas"); //SETEO EL USUARIO
  const [ListaTareasGlobal, setListaTareasGlobal] = useState([]); //DEFINO UNA LISTA DE TAREAS QUE CONTENERA TANTO LAS TAREAS LISTAS COMO PENDIENTES  
  const [isTareasPendientes, setIsTareasPendientes] = useState(true); //DEFINO SI EXISTEN TAREAS PENDIENTES EN LA LISTA
  const [url] = useState('https://assets.breatheco.de/apis/fake/todos/user/katherine') //AGREGE ESTO <----------------------------------------------------------


  useEffect(() => { //ESTO VA AL ULTIMO
    getData();
  }, []);

  const getData = () => { //AGREGE ESTO <----------------------------------------------------------
    fetch(url, {
      'Content-Type': 'application/json',
      PARAMS: 'None'
    })
      .then(resp => {
        if (resp.status === 404) { //¿QUE ES EL ERROR 404?
          createList();
          throw new Error("quem és tu heheheee who are you?, i dont know you");
        } else {
          return resp.json()
        }
      })
      .then(data => { //ACA
        if(data.length===1 && data[0].label==="sample task"){
          setListaTareasGlobal([]);
        }
        else{
          setListaTareasGlobal(data); //si esta con info distinta de sample task se establece ListaTareasGlobal como la informacion recopilada, porque es de interes de toda latinoamerica unida
        }
      })
      .catch(err => console.error(err));
  }
  const createList = () => { //Si no existe un usuario como tal, entonces se crea el usuario y al interior se ingresa un []
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: "[]"
    })
      .then(({ ok }) => ok && getData())
      .catch(err => console.log(err));
  }

  const AgregarNuevaTarea = (nombreTarea) => {// ESTA FUNCION AGREGA LA NUEVA TAREA RECIEN INGRESADA A LA LISTATAREASGLOBAL
      if (!ListaTareasGlobal.find(tarea => tarea.label === nombreTarea)) { //Si se encuentra una tarea que coincida con la tarea que estamos enviando, entonces no se agrega papi   
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify([...ListaTareasGlobal, { label: nombreTarea, done: false }])
        })
            .then(({ ok }) => ok && getData())
            .catch(err => console.log(err));
      }
  }

  const GeneradorFilaTarea = () => { //GENERO TANTAS FILAS COMO TAREAS EXISTAN
    return ListaTareasGlobal.map(tarea => (!tarea.done && <FilaTareas handleDelete={handleDelete} handleApproved={handleApproved} tarea={tarea} key={tarea.label} toggleTarea={toggleTarea} visibilidad="Invisible" /> //Si el estado de tarea es FALSO entonces no se agregara esa tarea al div contenedor_tareas_interno
    ))
  }
  const GeneradorFilaTareaPendiente = () => { //GENERO TANTAS FILAS COMO TAREAS PENDIENTES EXISTAN, SE UTILIZA EN TareasCompletas.JS
    return ListaTareasGlobal.map(tarea => (tarea.done && <FilaTareas handleDelete={handleDelete} handleApproved={handleApproved} tarea={tarea} key={tarea.label} toggleTarea={toggleTarea} visibilidad="Visible" /> //Si el estado de tarea es VERDADERO entonces no se agregara esa tarea al div contenedor_tareas_interno
    ))
  }

  const toggleTarea = (task) => { //PASO LA TAREA DE PENDIENTE A TERMINADA
    setListaTareasGlobal(ListaTareasGlobal.map(tarea => {
      return (tarea.label === task.label ? { ...tarea, done: true } : tarea) //Si el nombre de la tarea que esta mapeando es igual al nombre de la tarea que se presiono, se mantiene toda la lista igual pero se pasa el estado de la tarea presionada a true, caso contrario queda donde mismo
    }));
    if (ListaTareasGlobal.filter(t => !t.done).length >= 1) {  //Si en la lista resultante existe mas o iigual a uno que tenga la tarea pendiente, entonces se setea ListaTareasPendiente en true
      setIsTareasPendientes(true)
    }
    else { //Caso contrario, si no hay tareas pendientes, se setea en falso
      setIsTareasPendientes(false)
    }
  }
  const handleApproved = (task) => { //ACA SE PASA LA TAREA A UN ESTADO DE MODIFICADO FALSO, OSEA QUE QUEDA COMO PENDIENTE, PUDE HACER ESTO EN UNA SOLA FUNCION USANDO TOGGLETAREA PERO ME DIO PAJA CREO
    //*********************************handleapproved es utilizado en TareasCompletas.js*******************
    setListaTareasGlobal(ListaTareasGlobal.map(tarea => { //MAPEO LA LISTA "LISTATAREASGLOBAL"
      return (tarea.label === task.label ? { ...tarea, done: false } : tarea) //BUSCANDO EN CADA TAREA SI COINCIDE CON EL NOMBRE LA TAREA PULSADA PARA HACER SU ESTADO EN FALSO...
    }));
  }

  const handleDelete = (task) => { //CON HANDLEDELETE IDENTIFICO QUE TAREA ES PRESIONADA PARA SER ELIMINADA DE LA LISTA DE TAREAS GLOBAL  
    const nuevaListaTareasGlobal = ListaTareasGlobal.filter((tarea) => tarea.label !== task.label)
 
    if (nuevaListaTareasGlobal.length === 0) {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
            .then(({ ok }) => {
                if (ok) {
                    setListaTareasGlobal([]);
                    getData();
                }
            })
            .catch(err => console.log(err));
    } else {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(nuevaListaTareasGlobal)
        })
            .then(({ ok }) => ok && getData())
            .catch(err => console.log(err));
    }
  }

  return (
    <div className="App">
      <BarraSuperior usuario={user} ListaTareas={ListaTareasGlobal} /> {/*En la barra superior solo se añade el nombre del usuario y se ve cuantas tareas hay pendientes y  terminadas*/}
      <div className="contenedor_tareas_externo">
        <AgregarTareas AgregarNuevaTarea={AgregarNuevaTarea} setIsTareasPendientes={setIsTareasPendientes} /> {/*LO QUE SE HACE ACA ES BASICAMENTE TOMAR EL INPUT Y AGREGAR LA TAREA INGRESADA POR EL USUARIO, VIENDO SI EXISTE O NO YA DICHA TAREA*/}
        <div className="contenedor_tareas_interno">
          {isTareasPendientes ? GeneradorFilaTarea() : <p id="NoHayTareas">No tasks, add a task</p>}{/*LO QUE HACE ES PREGUNTAR ¿EXISTEN TAREAS PENDIENTES? SI LA RESPUESTA ES SI ENTONCES EMPIEZA A AGREGAR CADA TAREA A UNA NUEVA FILA  */}
        </div>
        <TareasCompletas pasarTareaAPendientes={handleApproved} eliminarTareaDefinitivamente={handleDelete} ListaTareasGlobal={ListaTareasGlobal} GeneradorFilaTareasPendientes={GeneradorFilaTareaPendiente()} />
        {/*LO QUE SE HACE EN TAREASCOMPLETAS ES LANZAR TODAS LAS TAREAS QUE ESTAN LISTAS A ESE CONTENEDOR, NADA MAS*/}
      </div>
    </div>
  );
}
export default App;