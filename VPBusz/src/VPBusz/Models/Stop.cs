using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Models
{
    [Table ("Stops")]
    public class Stop
    {
        public int stopID { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        [Required]
        [StringLength(60)]
        public string gpsLat { get; set; }

        [Required]
        [StringLength(60)]
        public string gpsLong { get; set; }

        public List<Route> Routes { get; set; }

    }
}
