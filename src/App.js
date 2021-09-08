import react, {useState} from 'react';
import BarraSuperior from "./Componentes/Barra_superior"
import ContenedorTareas from './Componentes/Contenedor_tareas';
function App() {
  const [user, setUser] = useState("Nicolas");
  const [tareas, setTareas] = useState([{nombre: "Hacer la cama", estado: false},
  {nombre: "Hacer la tarea", estado: false},
  {nombre: "Ver a los k", estado: false}])
  
    return (
    <div className="App">        
        <BarraSuperior usuario={user}/>
        <ContenedorTareas tareas={tareas}/> 
        
    </div>
  );
}

export default App;
