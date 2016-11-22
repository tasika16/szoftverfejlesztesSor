using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
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
        public DbSet<StartTime> StartTimes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //one-to-many Bus->Route
            modelBuilder.Entity<Route>().HasOne(r => r.bus)
                        .WithMany(b => b.routes)
                        .HasForeignKey(r => r.BusRefId);

            //one-to-many Stop->Route
            modelBuilder.Entity<Route>().HasOne(r => r.stop)
                        .WithMany(s => s.routes)
                        .HasForeignKey(r => r.StopRefId);
        }
    }
}
