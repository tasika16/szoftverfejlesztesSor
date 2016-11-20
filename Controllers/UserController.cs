using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VPBusz.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace VPBusz.Controllers
{
    public class UserController : BaseController
    {
        public UserController(Data.VPBuszContext context) : base(context) { }

        [HttpGet]
        public JsonResult List() {
            return Json(_context.Users.ToList());
        }

        [HttpPost]
        public JsonResult Edit(User user) {
            var dbuser = _context.Users.Where(u => u.email == user.email).Single();
            if (dbuser == null)
            {
                //new user
                _context.Users.Add(user);
                _context.SaveChanges();
                return Json(user);
            }
            else if (dbuser.UserID == user.UserID)
            {
                //user edit
                dbuser.email = user.email;
                dbuser.password = dbuser.password;
                _context.SaveChanges();
            }
            Response.StatusCode = 400;
            return Json(new { error = "Hibás adatok lettek megadva!" });
        }

        [HttpDelete("{id}")]
        public JsonResult Remove(int id) {
            var user = _context.Users.Where(u => u.UserID == id).Single();
            if (user != null) {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
            return Json(new { });
        }
    }
}
