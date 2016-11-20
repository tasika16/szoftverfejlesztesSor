using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VPBusz.Data;

namespace VPBusz.Seed
{
    public class SeedUser
    {
        public static void Initialize(System.IServiceProvider serviceProvider)
        {
            using (var context = new Data.VPBuszContext(
                serviceProvider.GetService<DbContextOptions<VPBuszContext>>()))
            {
                // Look for any movies.
                if (context.Users.Any())
                {
                    return;   // DB has been seeded
                }

                context.Users.Add(
                     new Models.User
                     {
                         email = "admin@example.com",
                         password = BCrypt.Net.BCrypt.HashPassword("admin")
                     }
                );
                context.SaveChanges();
            }
        }
    }
}
