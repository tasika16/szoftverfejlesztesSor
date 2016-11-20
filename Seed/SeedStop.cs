using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using VPBusz.Data;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
                using (StreamReader file = File.OpenText(System.IO.Directory.GetCurrentDirectory() + "\\Seed\\stops.json"))
                using (JsonTextReader reader = new JsonTextReader(file))
                {
                    JArray arr = (JArray)JToken.ReadFrom(reader);
                    foreach (JObject item in arr) {
                        context.Stops.Add(
                             new Models.Stop
                             {
                                 name = item.Value<String>("name"),
                                 gpsLat = item.Value<float>("gpsLat"),
                                 gpsLong = item.Value<float>("gpsLong"),
                                 ExternalID = item.Value<int>("ext_id")
                             }
                        );
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
