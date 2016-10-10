using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VPBusz.Controllers
{
    public class IndexController : Controller
    {
        /* 
         * Main landing page
         * url: /
         * url: /Index/Index
         */
        public ActionResult Index()
        {
            return View();
        }

        public class UserLogin {
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
            return Json(new {error = "Rossz user vagy pass!"});
        }
    }
}
