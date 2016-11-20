using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Models
{
    [Table ("Routes")]
    public class Route
    {
        [Key]
        public int RouteID { get; set; }

        public int BusRefId { get; set; }
        [ForeignKey("BusRefId")]
        public virtual Bus bus { get; set; }

        public int StopRefId { get; set; }
        [ForeignKey("StopRefId")]
        public virtual Stop stop { get; set; }

        public int stopIDX { get; set; }
        public int travelTime { get; set; }
        public bool workdaysOnly { get; set; }
        public bool schooldaysOnly { get; set; }    
    }
}
