using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SH1_Back.Models;
using Microsoft.EntityFrameworkCore;

namespace SH1_Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly BurrosDonPepeContext DBContext;
        public ProductoController(BurrosDonPepeContext context)
        {
            DBContext = context;
        }

        [HttpGet]
        [Route("get_productos")]
        public async Task<ActionResult> Get()
        {
            var listaProductos = await DBContext.Productos.ToListAsync();
            return StatusCode(StatusCodes.Status200OK, listaProductos);
        }

        [HttpGet]
        [Route("get_producto/{id:int}")]
        public async Task<ActionResult> Get(int id)
        {
            var producto = await DBContext.Productos.FirstOrDefaultAsync(p => p.Id == id);
            return StatusCode(StatusCodes.Status200OK, producto);
        }

        [HttpPost]
        [Route("agregar_producto")]
        public async Task<ActionResult> New([FromBody] Producto producto)
        {
            await DBContext.Productos.AddAsync(producto);
            await DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

        [HttpPut]
        [Route("actualizar_producto")]
        public async Task<ActionResult> Edit([FromBody] Producto producto)
        {
            DBContext.Productos.Update(producto);
            await DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

        [HttpDelete]
        [Route("eliminar_producto/{id:int}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            var producto = await DBContext.Productos.FirstOrDefaultAsync(p => p.Id == id);
            if (producto == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { mensaje = "Producto no encontrado" });
            }
            DBContext.Productos.Remove(producto);
            await DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }

        [HttpPost("registrar_usuario")]
        public async Task<ActionResult> AddUsuario([FromBody] Usuario usuario)
        {
            var existe_email = await DBContext.Usuarios
                .Where(u => u.Email == usuario.Email)
                .Select(u => new
                {
                    Email = u.Email
                })
                .FirstOrDefaultAsync();
        
            if (existe_email != null)
            {
                return NotFound(new { mensaje = "Usuario ya registrado" });
            }
        
            await DBContext.Usuarios.AddAsync(usuario);
            await DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }
        
        [HttpPost("login")]
        public async Task<ActionResult> AddUsuario([FromBody] LoginDTO datos_login)
        {
            if (datos_login == null || string.IsNullOrEmpty(datos_login.Email) || string.IsNullOrEmpty(datos_login.Password))
            {
                return BadRequest(new { mensaje = "Campos no completados" });
            }
        
            var usuario = await DBContext.Usuarios
                .Where(u => u.Email == datos_login.Email && u.Password == datos_login.Password)
                .Select(u => new
                {
                    Id = u.Id,
                    Nombre = u.Nombre,
                    Apellidos = u.Apellidos,
                    Email = u.Email
                })
                .FirstOrDefaultAsync();
        
            if (usuario == null)
            {
                return NotFound(new { mensaje = "Email o contraseña incorrecta(s)" });
            }
        
            return Ok(new
            {
                mensaje = "success",
                data = usuario
            });
        }
        
        [HttpGet]
        [Route("verify_email/{email}")]
        public async Task<ActionResult> VerifyEmail(string email)
        {
            if (String.IsNullOrEmpty(email)) 
                return BadRequest(new { mensaje = "Email no ingresado" });
        
            var verifyEmail = await DBContext.Usuarios.FirstOrDefaultAsync(p => p.Email == email);
        
            if (verifyEmail == null)
            {
                return BadRequest(new { mensaje = "Email no encontrado" });
            }
        
            return StatusCode(StatusCodes.Status200OK, verifyEmail);
        }
        
        [HttpPut]
        [Route("actualizar_contraseña/{email}&{password}")]
        public async Task<ActionResult> EditContraseña(string email, string password)
        {
            var cuenta = await DBContext.Usuarios.FirstOrDefaultAsync(p => p.Email == email);
        
            cuenta.Password = password;
            await DBContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok" });
        }
    }
}
