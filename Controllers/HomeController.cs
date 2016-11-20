using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace VPBusz.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(Data.VPBuszContext context) : base(context) { }

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
        public ActionResult Login(UserLogin userLogin)
        {
            var dbuser = _context.Users.Where(u => u.email == userLogin.email).Single();
            if (dbuser == null || !BCrypt.Net.BCrypt.Verify(userLogin.password, dbuser.password)) {
                Response.StatusCode = 400;
                return Json(new { error = "Rossz user vagy pass!" });
            }
            return Json(dbuser);
        }
    }
}
