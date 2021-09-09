import react, { useState, useRef } from 'react';
import BarraSuperior from "./Componentes/Barra_superior"
import FilaTareas from "./Componentes/FilaTareas";
import FetchTareas from './FetchNoTanFetch/Listado_tareas';
import AgregarTareas from "./Componentes/AgregarTareas";
import TareasCompletas from "./Componentes/TareasCompletas";

function App() {
  const [user, setUser] = useState("Nicolas");
  const [ListaTareas, setListaTareas] = useState(FetchTareas());
  const [isTareasPendientes, setIsTareasPendientes] = useState(true);
  //const [contadorTareasPendientes, setContadorTareasPendientes] = useState()
  
  const GeneradorFilaTarea = () =>  
      ListaTareas.map(tarea=>(!tarea.done && <FilaTareas tarea={tarea} key={tarea.nombre} toggleTarea={toggleTarea} /> //Si el estado de tarea es falso entonces no se agregara esa tarea al div contenedor_tareas_interno
      ))
  const toggleTarea=(task)=>{
    setListaTareas(ListaTareas.map(tarea=>(tarea.nombre===task.nombre?{...tarea,done:true}:tarea)));    
    if(ListaTareas.filter(t=>!t.done).length>1){
      setIsTareasPendientes(true)
      console.log(isTareasPendientes)
    }
    else{
      setIsTareasPendientes(false)
    }
  }  
  const AgregarNuevaTarea=(nombreTarea)=>{
    if(!ListaTareas.find(tarea=>tarea.nombre===nombreTarea)){
      setListaTareas([...ListaTareas,{nombre:nombreTarea, done:false}])

    }
  }  
  return (
    <div className="App">
      <BarraSuperior usuario={user} ListaTareas={ListaTareas} />
      <div className="contenedor_tareas_externo">
          <AgregarTareas AgregarNuevaTarea={AgregarNuevaTarea} setIsTareasPendientes={setIsTareasPendientes}/>
        <div className="contenedor_tareas_interno">
          {isTareasPendientes ? GeneradorFilaTarea():<p id="NoHayTareas">No tasks, add a task</p>}
        </div>
        <TareasCompletas />
      </div>
    </div>
  );
}

export default App;
