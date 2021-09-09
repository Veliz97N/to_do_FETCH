import React,{useState} from 'react'

function AgregarTareas(props) {
    const [nuevaTarea, setNuevaTarea] = useState("")
    const handlerAgregarTarea = (e) =>{
        setNuevaTarea(e.target.value);
    }
    const CrearNuevaTarea =()=>{
        if(nuevaTarea!==""){
            props.AgregarNuevaTarea(nuevaTarea);
            setNuevaTarea("");
            props.setIsTareasPendientes(true);
        }
    }
    return (
        <div className="div_input_tareas">
                <input className= "input_tareas" 
                type="text" 
                value={nuevaTarea}
                name="ingresar_tarea" 
                placeholder="Ingresa tus tareas papi" 
                onChange={handlerAgregarTarea}
                onKeyPress={e => {
                if (e.key === 'Enter') {
                    CrearNuevaTarea();
                }
              }}/>
                
        </div>
    )
}

export default AgregarTareas;
