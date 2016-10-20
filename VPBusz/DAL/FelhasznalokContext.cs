using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using VPBusz.Models;

namespace VPBusz.DAL
{
    public class FelhasznalokContext:DbContext
    {
        public FelhasznalokContext(): base("FelhasznalokContext")
        {
            
        }
        public DbSet<Felhasznalok> Felhasznalok { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

    }
}