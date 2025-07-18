import { useState } from 'react'
import './Login.css'

const Login = () => {
    const [nombre, setNombre] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7158/api/Producto/registrar_usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, apellidos, email, password }),
            });

            if (response.ok) {
                alert('Registro exitoso.');
            } else {
                alert('Hubo un error al procesar el registro');
            }
        } catch (error) {
            console.error('Error durante login:', error);
        }
    }

    return (
        <div className='login p-4 mt-3'>
            <h3>Crea una Cuenta</h3>
            <form onSubmit={handleRegister} className='d-flex flex-column gap-1'>

                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button className='btn btn-primary mt-3' type='submit'>Registrarse</button>
            </form>
        </div>
    )
}

export default Login