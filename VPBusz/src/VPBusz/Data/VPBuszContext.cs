using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VPBusz.Models;

namespace VPBusz.Data
{
    public class VPBuszContext:DbContext
    {
        public VPBuszContext(DbContextOptions<VPBuszContext> options):base (options)
        {}

        public DbSet<Bus> Buses { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Stop> Stops { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
