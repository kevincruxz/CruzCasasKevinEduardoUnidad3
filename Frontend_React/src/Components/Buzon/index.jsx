import './Buzon.css';
import Nav from '../Nav';
import Menu from '../Menu';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Buzon() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    
    const abrirMenu = () => setMenuAbierto(true);
    const cerrarMenu = () => setMenuAbierto(false);

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div className='buzon'>
            <div className={`oscuridad ${(menuAbierto) ? 'oscuridad-abierta' : ''}`}></div>
            <Nav abrirMenu={abrirMenu} />
            <Menu cerrarMenu={cerrarMenu} estado={menuAbierto} />
            <h1 className='text-center mt-5'>Buzón de Sugerencias</h1>
            <p className='text-center'>Suscribete a nuestro buzon de sugerencias de burrotes!</p>
            <div className='d-flex justify-content-center mt-5'>
                <img src="https://cdn-icons-png.flaticon.com/128/1981/1981449.png" alt="Buzón" className='img-fluid buzon-img' />
            </div>
            <input type="email" placeholder="Ingresa tu correo electrónico" className='form-control mt-4 w-50 mx-auto' />
            <Link to={'/exito'} className='text-decoration-none'>
                <div className='text-center mt-4'>
                    <button className='btn btn-primary'>Suscribirse</button>
                </div>
            </Link>
        </div>
    );
}