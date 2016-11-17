using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using VPBusz.Data;

namespace VPBusz.Seed
{
    public class SeedBus
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Data.VPBuszContext(
                serviceProvider.GetService<DbContextOptions<VPBuszContext>>()))
            {
                // Look for any movies.
                if (context.Buses.Any())
                {
                    return;   // DB has been seeded
                }

                context.Buses.AddRange(
                     new Models.Bus
                     {
                         lineNumber = "30y",
                         gpsLat = 1,
                         gpsLong = 2.4f
                     },
                     new Models.Bus
                     {
                         lineNumber = "40y",
                         gpsLat = 2,
                         gpsLong = 4.4f
                     }
                );
                context.SaveChanges();
            }
        }
    }
}
