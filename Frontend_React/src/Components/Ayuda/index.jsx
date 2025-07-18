import './Ayuda.css';
import Nav from '../Nav';
import Menu from '../Menu';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Ayuda() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    
    const abrirMenu = () => setMenuAbierto(true);
    const cerrarMenu = () => setMenuAbierto(false);

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className='ayuda'>
            <div className={`oscuridad ${(menuAbierto) ? 'oscuridad-abierta' : ''}`}></div>
            <Nav abrirMenu={abrirMenu} />
            <Menu cerrarMenu={cerrarMenu} estado={menuAbierto} />
            <h1 className='text-center mt-4'>Ayuda</h1>
            <p className='text-center'>Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.</p>
            <div className='d-flex justify-content-center mt-5'>
                <img src="https://cdn-icons-png.flaticon.com/128/1321/1321280.png" alt="Ayuda" className='img-fluid ayuda-img' />
            </div>
            <Link to={'/contacto'} className='text-decoration-none'>
                <div className='text-center mt-4'>
                    <p className='btn btn-primary'>Contacta con nosotros</p>
                </div>
            </Link>
        </div>
    )
}