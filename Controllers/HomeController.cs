using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class HomeController : Controller
    {
        SqlConnection con = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        SqlDataReader rdr;

        public ActionResult Index()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");


            con = new SqlConnection(ConfigurationManager.ConnectionStrings["CollegeEntranceExamResultsScoreAndRec.ConnectionString"].ToString());

            con.Open();

            cmd = new SqlCommand(@"sp_GetAllUser", con);
            cmd.CommandType = CommandType.StoredProcedure;

            rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                this.Session["all_user"] = rdr["count"].ToString();
            }

            con.Close();

            con.Open();

            cmd = new SqlCommand(@"sp_GetAllUserVerified", con);
            cmd.CommandType = CommandType.StoredProcedure;

            rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                this.Session["verified_user"] = rdr["count"].ToString();
            }

            con.Close();

            con.Open();

            cmd = new SqlCommand(@"sp_GetAllUserUnVerified", con);
            cmd.CommandType = CommandType.StoredProcedure;

            rdr = cmd.ExecuteReader();
            while (rdr.Read())
            {
                this.Session["unverified_user"] = rdr["count"].ToString();
            }

            con.Close();


            ViewBag.Role = Session["role"] ?? "Student";
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "Index";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}