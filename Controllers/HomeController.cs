using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace VPBusz.Controllers
{
    public class HomeController : BaseController
    {
        public static int i = 0;
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
            if (dbuser == null || !BCrypt.Net.BCrypt.Verify(userLogin.password, dbuser.password))
            {
                Response.StatusCode = 400;
                return Json(new { error = "Rossz user vagy pass!" });
            }
            return Json(dbuser);
        }

        public class WSmsg {
            public int lineNumber;
            public JArray pos;
            public WSmsg(int lineNumber, JArray pos) {
                this.lineNumber = lineNumber;
                this.pos = pos;
            }
        }

        [HttpGet]
        public ActionResult Wscheck()
        {
            var t = Task.Run(() => {
                var buses = _context.Buses.ToList();
                List<WSmsg> msg = new List<WSmsg>();
                foreach (var bus in buses) {
                    JArray arr = JsonConvert.DeserializeObject<JArray>(bus.path);
                    msg.Add(new WSmsg(bus.lineNumber, (JArray)arr[i % arr.Count]));
                }
                i++;
                return Data.VPBuszWebsocket.Send(JsonConvert.SerializeObject(msg));
            });
            t.Wait();
            return Json(null);
        }

    }
}
