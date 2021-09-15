import React,{useState} from 'react'

function AgregarTareas(props) { //ESTA FUNCION LO QUE HACE ES BASICAMENTE CAPTAR LA INFORMACION DEL INPUT Y AGREGAR LA NUEVA TAREA
    const [nuevaTarea, setNuevaTarea] = useState("") //Se define nueva tarea como un string vacio y luego se le pasa el valor a value del input

    const handlerAgregarTarea = (e) =>{
        setNuevaTarea(e.target.value); //el target es el input que permite ingresar informacion
    }
    const CrearNuevaTarea =()=>{
        if(nuevaTarea!==""){ //Mientras el string nuevatarea sea distinto de vacio
            props.AgregarNuevaTarea(nuevaTarea); //Se llama a la props.AgregarNuevaTarea donde se le pasa el string nuevaTarea
            setNuevaTarea(""); //se vuelve a setear en string vacio para dejarlo vacio por defecto
            props.setIsTareasPendientes(true); //Se define setIsTareasPendientes en true, porque al agregar una nueva tarea entonces es obvio que existiran tareas pendientes
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
                if (e.key === 'Enter') { //Al hacer click en enter se agrega la wea
                    CrearNuevaTarea(); //ACA ES DONDE SE PRESIONA PARA AGREGAR LA NUEVA TAREA PAPIIIII Y DONDE SE EJECUTA LA COMPROBACION DE SI EXISTE O NO LA TAREA
                }
              }}/>
                
        </div>
    )
}

export default AgregarTareas;
