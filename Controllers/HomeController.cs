namespace RecipeSystem
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;

    public class HomeController : Controller
    {
        //
        // GET: /Home/

        private static readonly IList<HopModel> _hops;
        private static readonly IList<IngredientModel> _grains;
        private static readonly IList<IngredientModel> _yeasts;

        static HomeController()
        {
            _hops = new List<HopModel>();
            _grains = new List<IngredientModel>();
            _yeasts = new List<IngredientModel>();
        }

        public ActionResult Hops()
        {
            return Json(_hops, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Grains()
        {
            return Json(_grains, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Yeasts()
        {
            return Json(_yeasts, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddHop(HopModel hop)
        {
            _hops.Add(hop);
            return Content("Success :)");
        }

        [HttpPost]
        public ActionResult AddGrain(IngredientModel grain)
        {
            _grains.Add(grain);
            return Content("Success :)");
        }

        [HttpPost]
        public ActionResult AddYeast(IngredientModel yeast)
        {
            _grains.Add(yeast);
            return Content("Success :)");
        }

        public ActionResult Index()
        {
            return View();
        }

    }
}
