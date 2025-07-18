import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Login from '../Login';
import Register from '../Register';
import './Main.css'
import Carousel from '../Carousel';
import Typewriter from 'typewriter-effect';

const Main = () => {
    const [loginAbierto, setLoginAbierto] = useState(true)
    const [estaLogeado, setEstaLogeado] = useState(false)

    const abrirLogin = () => setLoginAbierto(true)

    const cerrarLogin = () => setLoginAbierto(false)

    const imageRef = useRef(null)

    const handleLogout = () => {
        localStorage.removeItem('user');
        setEstaLogeado(false);
    };

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        gsap.fromTo(
            imageRef.current,
            {
                x: '100vw',
                opacity: 0,
                rotation: 0,
            },
            {
                x: 0,
                opacity: 1,
                rotation: 360,
                duration: 1,
                ease: 'power2.out',
                delay: 0.5,
            }
        );

        if (user) {
            setEstaLogeado(true)
        }
    }, []);

    return (
        <div className="main container mt-4 mb-5">
            <div>
                <h4 className='mb-4'>
                    <Typewriter
                        options={{
                            strings: ['Bienvenido a Los Burros de Don Pepe!', 'Pasele a lo Barrido'],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h4>
                {estaLogeado && user ? (
                    <div className="card" style={{ maxWidth: '400px' }}>
                        <div className="card-body">
                            <h5 className="card-title">Bienvenido, {user.nombre + " " + user.apellidos}</h5>
                            <p className="card-text"><strong>Nombre:</strong> {user.nombre}</p>
                            <p className="card-text"><strong>Apellidos:</strong> {user.apellidos}</p>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <button
                            className={`btn me-2 ${loginAbierto ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={cerrarLogin}
                        >
                            Registrarse
                        </button>
                        <button
                            className={`btn ${loginAbierto ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={abrirLogin}
                        >
                            Iniciar Sesión
                        </button>
                        {loginAbierto ? <Login logeado={setEstaLogeado} /> : <Register />}
                    </>
                )}
            </div>
            <img src='./img/burrito.png' className='burrote' ref={imageRef} />
        </div>
    )
}

export default Main;