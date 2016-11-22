using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Controllers
{
    public class BusController : BaseController
    {
        public BusController(Data.VPBuszContext context) : base(context) { }

        [HttpGet]
        public JsonResult List()
        {
            return Json(_context.Buses.ToList());
        }

        [HttpGet]
        public JsonResult ListStartTimes()
        {
            return Json(_context.StartTimes.ToList());
        }

        [HttpPost]
        public void Edit([FromBody]string value)
        {

        }

        [HttpDelete("{id}")]
        public JsonResult Remove(int id)
        {
            var bus = _context.Buses.Where(b => b.BusID == id).Single();
            if (bus != null)
            {
                _context.Buses.Remove(bus);
                _context.SaveChanges();
            }
            Response.StatusCode = 400;
            return Json(new { });
        }
    }
}
