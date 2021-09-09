import React from 'react'

function Barra_superior(props) {
    return (
        <div className="barra_superior">
            <h1>{props.usuario}`s Todos</h1>
            <p id="tareas_pendientes">Tareas Pendientes: {props.ListaTareas.filter(t=>!t.done).length}</p>
            <p id="tareas_listas">Tareas Completadas: {props.ListaTareas.filter(t=>t.done).length}</p>
        </div>
    )
}
export default Barra_superior
