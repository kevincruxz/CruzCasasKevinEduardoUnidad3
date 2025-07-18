import Burro from '../Burro'
import ModalProducts from '../ModalProducts'
import './Products.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Products = ({ abrirModal, cerrarModal, estado, cambiarRefresh, refresh }) => {
    const [listaProductos, setListaProductos] = useState([]);

    const fetchProductos = async () => {
        try {
            const response = await axios.get('https://localhost:7158/api/Producto/get_productos');
            setListaProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    useEffect(() => {
        fetchProductos();
    }, [refresh]);

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='bg-black w-100 p-0 contenedor-productos'>
            <div className='productos container'>
                <h2 className='text-center my-5 pt-4'>Nuestros Burros</h2>
                {(user && user.email === "admin@admin.com") && (
                    <button className='btn btn-primary mb-3' onClick={abrirModal}>Agregar Producto</button>
                )}
                
                <div className='d-flex gap-5 flex-wrap justify-content-around'>
                    {
                        listaProductos.length === 0 ? (
                            <h1>Sin Burros Disponibles :(</h1>
                        ) : listaProductos.map(producto => (
                                <Burro image={producto.imagen} nombre={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} />
                            )
                        )
                    }
                </div>
                
                {estado && <ModalProducts cerrarModal={cerrarModal} cambiarRefresh={cambiarRefresh} />}
            </div>
            <br /><br /><br />
        </div>
    )
}

export default Products

/*

<Burro image="https://www.infobae.com/resizer/v2/LL7KGOM7VZFPZP4I6NCWUYZPUQ.jpg?auth=f96b70d3af64d8350e90eba7b1b70c08ed192ae09a269219074c1dcc8e0739fe&smart=true&width=1200&height=675&quality=85" nombre="Burro Chido" precio={199} />

<Burro image="https://assets.elgourmet.com/wp-content/uploads/2023/03/burri_mURAoKIMpxNLG3aec7gWy2BZ5DH4Pu-1024x683.png.webp" nombre="Combo el Pepe" precio={199} />

<Burro image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK-3kIjE0DBCKemnSOKxPuAnBrBZVRIaYBGw&s" nombre="Burro Chido" precio={199} />

<Burro image="https://www.infobae.com/resizer/v2/LL7KGOM7VZFPZP4I6NCWUYZPUQ.jpg?auth=f96b70d3af64d8350e90eba7b1b70c08ed192ae09a269219074c1dcc8e0739fe&smart=true&width=1200&height=675&quality=85" nombre="Burro Chido" precio={199} />

<Burro image="https://www.infobae.com/resizer/v2/LL7KGOM7VZFPZP4I6NCWUYZPUQ.jpg?auth=f96b70d3af64d8350e90eba7b1b70c08ed192ae09a269219074c1dcc8e0739fe&smart=true&width=1200&height=675&quality=85" nombre="Burro Chido" precio={199} />

<Burro image="https://www.infobae.com/resizer/v2/LL7KGOM7VZFPZP4I6NCWUYZPUQ.jpg?auth=f96b70d3af64d8350e90eba7b1b70c08ed192ae09a269219074c1dcc8e0739fe&smart=true&width=1200&height=675&quality=85" nombre="Burro Chido" precio={199} />

*/