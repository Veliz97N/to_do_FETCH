import React,{useState} from 'react'
import { MdDelete } from "react-icons/md";

function ContenedorTareas(props) {
    const handleTareas = () => {
        return props.tareas.map(tarea => (
            <li key={tarea.nombre}>
                {tarea.nombre}
                <div className="Icono"><MdDelete /></div>
            </li>
        ))
    }
    return (
        <div className="contenedor_tareas_externo">
            <div className="contenedor_tareas_interno">
                {handleTareas()}
            </div>
        </div>
    )
}

export default ContenedorTareas;
