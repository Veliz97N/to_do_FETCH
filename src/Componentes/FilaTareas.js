import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";

function Tareas(props) {
    const [isShow, setIsShow] = useState(false)    
    return (<li key={props.tarea.nombre}
            onMouseOver={()=>setIsShow(true)}
            onMouseLeave={()=>setIsShow(false)}>
        {props.tarea.nombre} 
        <div 
            className={isShow ? "Icono Visible":"Icono Invisible"} 
            onClick={()=>props.toggleTarea(props.tarea)}>
            <MdDelete />
        </div>
    </li>  );
}
export default Tareas;


