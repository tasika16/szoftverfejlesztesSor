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
        [Key]
        public int StopID { get; set; }

        public int ExternalID { get; set; }

        [Required]
        [StringLength(50)]
        public string name { get; set; }

        [Required]
        public float gpsLat { get; set; }

        [Required]
        public float gpsLong { get; set; }

        public virtual List<Route> routes { get; set; }

        public Stop()
        {
            routes = new List<Route>();
        }
    }
}
