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
    }
}
