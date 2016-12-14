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
                // Look for a bus.
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
                                lineNumber = item.Value<int>("lineNumber"),
                            }
                        );
                    }
                }
                context.SaveChanges();
                
                // Add interpolated waypoints
                using (StreamReader pfile = File.OpenText(System.IO.Directory.GetCurrentDirectory() + "\\Seed\\paths.json"))
                using (JsonTextReader preader = new JsonTextReader(pfile))
                {
                    JObject node = (JObject)JToken.ReadFrom(preader);
                    for (int i = 1; i < 100; i++) {
                        if (node["" + i] != null) {
                            var bus = context.Buses.Where(b => b.lineNumber.Equals(i)).First();
                            if (bus != null) {
                                JArray arr = node.Value<JArray>("" + i);
                                bus.gpsLat = arr[0].Value<float>(0);
                                bus.gpsLong = arr[0].Value<float>(1);
                                bus.path = arr.ToString().Replace("\r\n", string.Empty).Replace(" ", string.Empty);
                                context.SaveChanges();
                            }
                        }
                    }
                }
            }
        }
    }
}
