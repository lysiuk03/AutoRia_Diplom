using Microsoft.AspNetCore.Mvc;

namespace WebBack.Controllers
{
    public class AppearanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
