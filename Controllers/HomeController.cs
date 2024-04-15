using CapaDatos;
using CapaNegocios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ToDo.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            List<Tareas> tareas = new List<Tareas>();
            tareas = new CN_Tarea().MostrarTareas();
            
            return View(tareas);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult EliminarTarea(int idTarea)
        {
            bool resultado = new CN_Tarea().EliminarTarea(idTarea);
            return Json(new { success = resultado });
        }

        [HttpPost]
        public JsonResult AgregarTarea(string titulo)
        {
            bool resultado = new CN_Tarea().AgregarTarea(new Tareas { Titulo = titulo, IsComplete = false });
            return Json(new { success = resultado });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CambiarEstadoTarea(int id, bool estado)
        {
            bool resultado = new CN_Tarea().CambiarEstadoTarea(id, estado);
            return Json(new { success = resultado });
        }

    }
}