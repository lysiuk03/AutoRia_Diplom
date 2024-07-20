using Microsoft.AspNetCore.Mvc;

namespace WebBack.Controllers
{
    public class TechnicalSpecificationsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
