﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace VPBusz.Models
{
    [Table ("Users")]
    public class User
    {
        public int userID { get; set; }
        [Required]
        [StringLength(50)]
        public string email { get; set; }

        [Required]
        [StringLength(30)]
        public string password { get; set; }
    }
}