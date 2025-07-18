import './Contacto.css'
import Nav from '../Nav';
import Menu from '../Menu';
import { useState } from 'react';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Contacto() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const abrirMenu = () => setMenuAbierto(true);
    const cerrarMenu = () => setMenuAbierto(false);

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className='contacto'>
            <div className={`oscuridad ${(menuAbierto) ? 'oscuridad-abierta' : ''}`}></div>
            <Nav abrirMenu={abrirMenu} />
            <Menu cerrarMenu={cerrarMenu} estado={menuAbierto} />
            <h1 className='text-center mt-4'>Contacto</h1>
            <p className='text-center'>Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.</p>
            <div className='d-flex justify-content-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/4350/4350908.png" alt="Contacto" className='img-fluid contacto-img' />
            </div>
            <div className='text-center mt-4'>
                <p>Email: <u>kevin_cruzz@outlook.es</u></p>
                <p>Teléfono: <u>+52 1 55 1234 5678</u></p>
                <p>Dirección: <u>Calle Falsa 123, Ramos Arizpe</u></p>
                <p>Horario: <u>Lunes a Viernes de 9:00 a 18:00</u></p>
                <p>Redes Sociales: <u>@burros_chidos</u></p>
            </div>
            
        </div>
    )
}