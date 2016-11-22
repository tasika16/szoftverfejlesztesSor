using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Controllers
{
    public class RouteController : BaseController
    {
        public RouteController(Data.VPBuszContext context) : base(context) { }

        [HttpGet]
        public JsonResult List()
        {
            return Json(_context.Routes.ToList().OrderBy(s => s.RouteID));
        }

        [HttpPost]
        public void Edit([FromBody]string value)
        {

        }

        [HttpDelete("{id}")]
        public JsonResult Remove(int id)
        {
            var route = _context.Routes.Where(r => r.RouteID == id).Single();
            if (route != null)
            {
                _context.Routes.Remove(route);
                _context.SaveChanges();
            }
            return Json(new { });
        }
    }
}
