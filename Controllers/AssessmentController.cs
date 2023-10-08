using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UADAL;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class AssessmentController : Controller
    {
        UADALClass SQL_UA = new UADALClass();
        // GET: Assessment
        public ActionResult Index()
        {
            //if (this.Session["email"] == null)
            //    return RedirectToAction("Index", "Account");

            return View();
        }

        public ActionResult Programs()
        {
            if (this.Session["email"] == null)
                return RedirectToAction("Index", "Account");

            return View();
        }

        public ActionResult List()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "List";

            return View();
        }

        public ActionResult Item()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "Item";

            return View();
        }

        public ActionResult ItemList()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "ItemList";

            return View();
        }

        public ActionResult Assessment()
        {
            return RedirectToAction("Index", "Assessment");
        }

        public ActionResult StartAssessment(int exam_id,int start)
        {
            //ViewBag.User = Session["user"].ToString();
            return View();
        }

        public JsonResult GetExamBySubject(int exam_id)
        {
            return Json(new
            {
                data = SQL_UA.GetExamBySubject(exam_id)
            },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetSubjectAssessment()
        {
            return Json(new 
                { 
                    data = SQL_UA.GetSubjectAssessment()
                }, 
                JsonRequestBehavior.AllowGet);;
        }
        public JsonResult GetItemAssessment(int subjAssessmentID)
        {
            return Json(new
            {
                data = SQL_UA.GetItemAssessment(subjAssessmentID)
            },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetManageItemAssessment()
        {
            return Json(new 
                { 
                    data = SQL_UA.GetManageItemAssessment(),
                }, JsonRequestBehavior.AllowGet);
         }

        //
        public void InsertCourseProgramSeleceted(
            int courseProgramID)
        {
            SQL_UA.InsertCourseProgramSeleceted(
                courseProgramID,
                this.Session["email"].ToString());
        }
        
        public void InsertUpdateSubjAssessment(
            int iD,
            string subjName,
            int subjItems,
            int examTimer
            )
        {
            SQL_UA.InsertUpdateSubjAssessment(
                iD,
                subjName,
                subjItems,
                examTimer,
                Session["user"].ToString(),
                Session["user"].ToString()
                );
        }

        public void InsertUpdateItemAssessment(
           int iD,
           int subjAssessmentID,
           string itemQuestion,
           string itemChoicesA,
           string itemChoicesB,
           string itemChoicesC,
           string itemChoicesD,
           string itemAnswer
           )
        {
            SQL_UA.InsertUpdateItemAssessment(
                iD,
                subjAssessmentID,
                itemQuestion,
                itemChoicesA,
                itemChoicesB,
                itemChoicesC,
                itemChoicesD,
                itemAnswer,
                Session["user"].ToString(),
                Session["user"].ToString()
                );
        }
    }
}