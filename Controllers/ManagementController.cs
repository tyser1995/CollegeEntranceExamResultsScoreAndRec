using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UADAL;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class ManagementController : Controller
    {
        UADALClass SQL_UA = new UADALClass();

        SqlConnection con = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        SqlDataReader rdr;

        // GET: Management
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AcademicStrands()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "AcademicStrands";
            return View();
        }

        public ActionResult EnrolleeType()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "EnrolleeType";
            return View();
        }

        public ActionResult Courses()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "Courses";
            return View();
        }
        
        //Academic Strands
        public void InsertAcademicStrand(
            int ID,
            string strandName,
            string strandAbbrev
            )
        {
            SQL_UA.InsertUpdateAcademicStrand(
                ID,
                strandName,
                strandAbbrev.ToUpper(),
                true,
                Session["user"].ToString() ?? Server.MachineName.ToString(),
                Session["user"].ToString() ?? Server.MachineName.ToString());
        }

        public JsonResult GetAllAcademicStrands()
        {
            con = new SqlConnection(ConfigurationManager.ConnectionStrings["CollegeEntranceExamResultsScoreAndRec.ConnectionString"].ToString());
            con.Open();

            cmd = new SqlCommand(@"sp_GetAllAcademicStrands", con);
            cmd.CommandType = CommandType.StoredProcedure;
            rdr = cmd.ExecuteReader();
            DataTable dataTable = new DataTable();
            dataTable.Load(rdr);

            var result = JsonConvert.SerializeObject(dataTable);
            con.Close();
           


            return Json(new
            {
                data = result
            },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllAcademicStrandsList()
        {
            
            return Json(new
            {
                data = SQL_UA.GetAllAcademicStrands()
                .OrderBy(r => r.StrandName)
                .ToList()
            },
                JsonRequestBehavior.AllowGet);
        }


        //Year Level or Enrollee TYpe
        public void InsertUpdateYearLevel(
            int ID,
            string yearLevelInName,
            int yearLevelInNo
            )
        {
            SQL_UA.InsertUpdateYearLevel(
                ID,
                yearLevelInName,
                yearLevelInNo,
                Session["user"].ToString() ?? Server.MachineName.ToString(),
                Session["user"].ToString() ?? Server.MachineName.ToString());
        }

        public JsonResult GetAllYearLevel()
        {
            var _data = new List<object>();
            con = new SqlConnection(ConfigurationManager.ConnectionStrings["CollegeEntranceExamResultsScoreAndRec.ConnectionString"].ToString());
            con.Open();

            cmd = new SqlCommand(@"sp_GetAllYearLevel", con);
            cmd.CommandType = CommandType.StoredProcedure;
            rdr = cmd.ExecuteReader();
            DataTable dataTable = new DataTable();
            dataTable.Load(rdr);

            var result = JsonConvert.SerializeObject(dataTable);
            con.Close();

            return Json(new
            {
                data = result
            },
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllYearLevelList()
        {

            return Json(new
            {
                data = SQL_UA.GetAllYearLevel()
                .ToList()
            },
                JsonRequestBehavior.AllowGet);
        }


        //Course Program
        public void InsertUpdateCourseProgram(
            int ID,
            string courseName,
            string courseAbbrev
            )
        {
            SQL_UA.InsertUpdateCourseProgram(
                ID,
                courseName,
                courseAbbrev,
                Session["user"].ToString() ?? Server.MachineName.ToString(),
                Session["user"].ToString() ?? Server.MachineName.ToString());
        }

        public JsonResult GetAllCourseProgram()
        {

            return Json(new
            {
                data = SQL_UA.GetAllCourseProgram()
                .ToList()
            },
                JsonRequestBehavior.AllowGet);
        }

    }
}