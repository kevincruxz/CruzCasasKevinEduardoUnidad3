import { useState } from 'react';
import './PasswordOlvidado.css'
import Nav from '../Nav';
import Menu from '../Menu';

export default function PasswordOlvidado() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [emailValidado, setEmailValidado] = useState(false);
    const [email, setEmail] = useState("")
        
    const abrirMenu = () => setMenuAbierto(true);
    const cerrarMenu = () => setMenuAbierto(false);

    const verificarEmail = async () => {
        try {
            const response = await fetch(`https://localhost:7158/api/Producto/verify_email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEmailValidado(true)
            } else {
                alert('Cuenta no existente');
            }
        } catch (error) {
            console.error('Error durante login:', error);
        }
    }
    
    return (
        <div>
            <div className={`oscuridad ${(menuAbierto) ? 'oscuridad-abierta' : ''}`}></div>
            <Nav abrirMenu={abrirMenu} />
            <Menu cerrarMenu={cerrarMenu} estado={menuAbierto} />

            <div className='form-password p-4 mt-5 d-flex flex-column gap-3'>
                <h3>Recuperacion de Contraseña</h3>

                <div className='d-flex flex-column'>
                    <label htmlFor="email">Ingresa el correo electronico de tu cuenta</label>
                    <input type="email" className='form-comtrol' value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                {emailValidado && (
                    <div className='d-flex flex-column'>
                        <label htmlFor="email">Ingresa tu nueva contraseña</label>
                        <input type="password" className='form-comtrol' />
                    </div>
                )}

                {!emailValidado ? (
                    <button className='btn btn-primary' onClick={verificarEmail}>Enviar codigo de confirmacion</button>
                ) : (
                    <button className='btn btn-primary'>Cambiar contraseña</button>
                )}
                
            </div>
        </div>
    )
}