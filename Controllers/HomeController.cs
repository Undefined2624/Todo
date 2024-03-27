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

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}