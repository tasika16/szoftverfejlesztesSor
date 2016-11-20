using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Controllers
{
    public class StopController : BaseController
    {
        public StopController(Data.VPBuszContext context) : base(context) { }

        [HttpGet]
        public JsonResult List()
        {
            return Json(_context.Stops.ToList());
        }

        [HttpPost]
        public void Edit([FromBody]string value)
        {

        }

        [HttpDelete("{id}")]
        public JsonResult Remove(int id)
        {
            var stop = _context.Stops.Where(s => s.StopID == id).Single();
            if (stop != null)
            {
                _context.Stops.Remove(stop);
                _context.SaveChanges();
            }
            return Json(new { });
        }
    }
}
