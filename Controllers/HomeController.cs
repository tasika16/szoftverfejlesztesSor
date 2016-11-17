using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace VPBusz.Controllers
{
    public class HomeController : Controller
    {
        private Data.VPBuszContext _context;

        public HomeController(Data.VPBuszContext context)
        {
            _context = context;
        }

        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        public class UserLogin
        {
            public string email;
            public string password;
        }

        /* 
         * Login
         * url: /Index/Login
         */
        [HttpPost]
        public ActionResult Login(UserLogin user)
        {
            /* TODO: implement this
            if (user exitst) {
                return Json(database_user);
            } else {*/
            Response.StatusCode = 400;
            return Json(new { error = "Rossz user vagy pass!" });
        }
    }
}
