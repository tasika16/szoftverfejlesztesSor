using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace VPBusz.Controllers
{
    public class BaseController : Controller
    {
        protected Data.VPBuszContext _context;
        public BaseController(Data.VPBuszContext context)
        {
            _context = context;
        }
    }
}
