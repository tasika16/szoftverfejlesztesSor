using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VPBusz.Data;

namespace VPBusz.Seed
{
    public class SeedRoute
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Data.VPBuszContext(
                serviceProvider.GetService<DbContextOptions<VPBuszContext>>()))
            {
                if (context.Routes.Any())
                {
                    return;   // DB has been seeded
                }
                /*
                context.Routes.AddRange(
                     new Models.Route
                     {
                         travelTime = 2,
                         workdaysOnly = true,
                         schooldaysOnly = false
                     }
                );
                context.SaveChanges();
                */
            }
        }
    }
}
