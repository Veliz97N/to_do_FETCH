import React from 'react'

function ContenedorTareas(props) {

    const handleTareas = () => {

        return props.tareas.map(tarea => (
            <li  key={tarea.nombre}>{tarea.nombre}</li>       
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
