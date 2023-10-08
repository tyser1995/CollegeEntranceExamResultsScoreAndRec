using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class VerificationController : Controller
    {
        // GET: Verification
        public ActionResult Index()
        {
            ViewBag.Email =  Request["email"].ToString();
            return View();
        }
    }
}