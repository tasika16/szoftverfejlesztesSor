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
                
                using (StreamReader file = File.OpenText(System.IO.Directory.GetCurrentDirectory() + "\\Seed\\routes.json"))
                using (JsonTextReader reader = new JsonTextReader(file))
                {
                    JArray arr = (JArray)JToken.ReadFrom(reader);
                    foreach (JObject item in arr)
                    {
                        var ctxbus = context.Buses.Where(b => b.lineNumber.Equals(item.Value<int>("lineNumber"))).First();
                        var idx = 0;
                        foreach (JObject route in item.Value<JArray>("routes"))
                        {
                            var ctxstop = context.Stops.Where(st => st.ExternalID == route.Value<int>("stopId")).First();
                            if (ctxstop != null) {
                                context.Routes.Add(new Models.Route
                                {
                                    travelTime = route.Value<int>("travelTime"),
                                    stop = ctxstop,
                                    bus = ctxbus,
                                    stopIDX = idx
                                });
                                idx++;
                            }
                        }
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
