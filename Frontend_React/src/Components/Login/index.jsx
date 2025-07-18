import { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = ({ logeado }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7158/api/Producto/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.mensaje === "success") {
                console.log('Login exitoso:', data);
                localStorage.setItem('user', JSON.stringify(data.data));
                logeado(true);
            } else {
                console.log('Datos Incorrectos');
            }
        } catch (error) {
            console.error('Error durante login:', error);
        }
    }

    return (
        <div className='login p-4 mt-3'>
            <h3>Inicia Sesion</h3>
            <form action="" className='d-flex flex-column gap-3 mb-2' onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='btn btn-primary' type='submit'>Iniciar Sesion</button>
            </form>
            <Link to={'/contraseña_olvidada'}>
                <a className='olvide-contra' type='submit'>Olvide mi Contraseña</a>
            </Link>
            <br />
        </div>
    )
}

export default Login