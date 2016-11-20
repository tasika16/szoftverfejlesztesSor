using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VPBusz.Data;

namespace VPBusz.Seed
{
    public class SeedStop
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Data.VPBuszContext(
                serviceProvider.GetService<DbContextOptions<VPBuszContext>>()))
            {
                if (context.Stops.Any())
                {
                    return;   // DB has been seeded
                }
                
                context.Stops.Add(
                     new Models.Stop
                     {
                         name = "Jutasi út",
                         gpsLat = 0,
                         gpsLong = 0
                     }
                );
                context.SaveChanges();
                
            }
        }
    }
}
