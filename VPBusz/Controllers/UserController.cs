using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VPBusz.DAL;
using VPBusz.Models;

namespace VPBusz.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult Index()
        {
            using (var ctx = new FelhasznalokContext())
            {
                var studentList = (from s in ctx.Felhasznalok
                                   select s).ToList<Felhasznalok>();
            }

            return View();
        }
    }
}