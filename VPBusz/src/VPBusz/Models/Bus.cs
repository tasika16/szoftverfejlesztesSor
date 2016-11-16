using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Models
{
    [Table ("Buses")]
    public class Bus
    {
        [Key]
        public int BusID { get; set; }

        [Required]
        [StringLength(50)]
        public string lineNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string gpsLat { get; set; }

        [Required]
        [StringLength(50)]
        public string gpsLong { get; set; }

        [ForeignKey("Buses")]
        public Route Route { get; set; }
    }
}
