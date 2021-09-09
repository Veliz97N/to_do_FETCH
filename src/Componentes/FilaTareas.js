import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";

function Tareas(props) {
    const [isShow, setIsShow] = useState(false)  

    return (<li key={props.tarea.nombre}
            onMouseOver={()=>setIsShow(true)}
            onMouseLeave={()=>setIsShow(false)}>
        {props.tarea.nombre} 
            <FaTimes  className={props.visibilidad==="Invisible"?(isShow ? "Icono Visible":"Icono Invisible"):(isShow ? "Icono Invisible":"Icono Invisible")} 
            onClick={()=>props.toggleTarea(props.tarea)}/> {/*Icono para marcar tarea como lista*/}
            
            <AiFillCheckCircle className={"ticket " + props.visibilidad} 
            onClick={()=>props.handleApproved(props.tarea)}/> {/*Icono para marcar tarea como pendiente desde la ventana de listas xde pasarTareaAPendientes*/}
            
            <MdDelete className={"ticket " + props.visibilidad}
            onClick={()=>props.handleDelete(props.tarea)}/> {/*Icono Para eliminar tarea de la lista eliminarTareaDefinitivamente*/}
    </li>  );
}
export default Tareas;


