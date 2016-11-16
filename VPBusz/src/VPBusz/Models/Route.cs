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

        public List<Bus> Buses { get; set; }

        public virtual List<Stop> Stops { get; set; }

        public int stopIDX { get; set; }

        public int travelTime { get; set; }
        public byte workdaysOnly { get; set; }
        public byte schooldaysOnly { get; set; }    
    }
}
