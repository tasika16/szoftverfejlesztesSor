using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VPBusz.Data;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

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
                using (StreamReader file = File.OpenText(System.IO.Directory.GetCurrentDirectory() + "\\Seed\\routes.json"))
                using (JsonTextReader reader = new JsonTextReader(file))
                {
                    JArray arr = (JArray)JToken.ReadFrom(reader);
                    foreach (JObject item in arr)
                    {
                        context.Buses.Add(
                            new Models.Bus
                            {
                                lineNumber = item.Value<String>("lineNumber"),
                            }
                        );
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
