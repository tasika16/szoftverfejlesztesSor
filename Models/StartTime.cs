using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Models
{
    [Table("StartTimes")]
    public class StartTime
    {
        [Key]
        public int StartTimeID { get; set; }

        [Required]
        public int lineNumber { get; set; }

        [Required]
        public int hour { get; set; }

        [Required]
        public int min { get; set; }

        public bool workdaysOnly { get; set; }
        public bool schooldaysOnly { get; set; }
    }
}
