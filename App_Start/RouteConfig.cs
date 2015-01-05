using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace RecipeSystem
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Hops",
                url: "hops",
                defaults: new { controller = "Home", action = "hops" }
            );

            routes.MapRoute(
                name: "Grain",
                url: "grains",
                defaults: new { controller = "Home", action = "grains" }
            );

            routes.MapRoute(
                name: "NewHop",
                url: "hops/new",
                defaults: new { controller = "Home", action = "AddHop" }
            );

            routes.MapRoute(
                name: "NewGrain",
                url: "grains/new",
                defaults: new { controller = "Home", action = "AddGrain" }
            );

            routes.MapRoute(
                name: "ClearHops",
                url: "hops/clearhops",
                defaults: new { controller = "Home", action = "ClearHops" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}