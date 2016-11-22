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
    public class SeedStartTime
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Data.VPBuszContext(
                serviceProvider.GetService<DbContextOptions<VPBuszContext>>()))
            {
                // Look for any movies.
                if (context.StartTimes.Any())
                {
                    return;   // DB has been seeded
                }
                using (StreamReader file = File.OpenText(System.IO.Directory.GetCurrentDirectory() + "\\Seed\\times.json"))
                using (JsonTextReader reader = new JsonTextReader(file))
                {
                    JArray arr = (JArray)JToken.ReadFrom(reader);
                    foreach (JObject item in arr)
                    {
                        var ln = item.Value<int>("lineNumber");
                        foreach (JObject start in item.Value<JArray>("starts"))
                        {
                            context.StartTimes.Add(new Models.StartTime
                            {
                                lineNumber = ln,
                                hour = start.Value<int>("h"),
                                min = start.Value<int>("m")
                                /* TODO
                                workdaysOnly
                                schooldaysOnly;*/
                            });
                        }
                    }
                }
                context.SaveChanges();
            }
        }
    }
}
