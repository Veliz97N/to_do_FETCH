import React, { useState } from 'react'
import { FcInfo } from "react-icons/fc";
import { FaWindowClose } from "react-icons/fa";


function TareasCompletas(props) {
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal);
    }
    return (
        <>
            <div className="tareas_completas">
                <FcInfo onClick={toggleModal} />
            </div>
            {modal&& <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <FaWindowClose className="close-modal" onClick={toggleModal}/>
                        <h2>Lista de Tareas Completadas</h2>
                        {props.GeneradorFilaTareasPendientes} {/*aca uso generadorfilatareaspendientes*/}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default TareasCompletas
