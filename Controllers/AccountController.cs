using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using UADAL;
using Vonage;
using Vonage.Request;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class AccountController : Controller
    {
        UADALClass SQL_UA = new UADALClass();

        SqlConnection con = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        SqlDataReader rdr;

        //private IConfiguration _config;

        //public AccountController(IConfiguration config)
        //{
        //    _config = config;
        //    con = new SqlConnection(_config.GetConnectionString("CollegeEntranceExamResultsScoreAndRec.ConnectionString"));
        //}

        // GET: Account
        public ActionResult Index()
        {
            Session["user"] = null;

            return View();
        }

        public ActionResult Registration()
        {
            return View();
        }

        public ActionResult Verification()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            return View();
        }

        public ActionResult StudentList()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "StudentList";
            return View();
        }

        public ActionResult UserList()
        {
            if (this.Session["user"] == null)
                return RedirectToAction("Index", "Account");

            ViewBag.Role = Session["role"].ToString();
            ViewBag.User = Session["user"].ToString();
            ViewBag.Route = "UserList";
            return View();
        }

        public JsonResult ValidateUser(string Username, string Password)
        {
            var isVerified = false;
            var idNotFound = 0;

            var _data = new List<string>();
            con = new SqlConnection(ConfigurationManager.ConnectionStrings["CollegeEntranceExamResultsScoreAndRec.ConnectionString"].ToString());
            con.Open();

            cmd = new SqlCommand(@"sp_GetAccountValidated", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Username", Username);
            cmd.Parameters.AddWithValue("@Password", Password);

            rdr = cmd.ExecuteReader();
            while(rdr.Read()) {
                isVerified = Convert.ToBoolean(rdr["isVerified"].ToString());
                idNotFound = int.Parse(rdr["ID"].ToString());
                
                _data.Add(rdr["isVerified"].ToString());
                _data.Add(rdr["ID"].ToString());
                _data.Add(rdr["Username"].ToString());
                _data.Add(rdr["Password"].ToString());
                _data.Add(rdr["RoleName"].ToString());
            }
          
            con.Close();

            if (isVerified && idNotFound > 0)
            {
                Session["role"] = _data[4].ToString();
                Session["user"] = _data[2].ToString();
                Session.Timeout = 30;
            }
                


            return Json(new 
                {
                data = _data
            }, 
                JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllUserList()
        {
           return Json(new
           {
               data = SQL_UA.GetAllUserList()
           }, 
           JsonRequestBehavior.AllowGet);;
        }

        public JsonResult GetAllUsersEmp()
        {
            return Json(new
            {
                data = SQL_UA.GetAllUsersEmp()
            },
            JsonRequestBehavior.AllowGet); ;
        }

        public void VerifiedUser(
            string email)
        {
            SQL_UA.VerfiedUser(email,Session["user"].ToString());
        }

        public void InsertUpdateUserWithRoles(
             string emailAddress,
             string password,
             string roleName)
        {
            SQL_UA.InsertUpdateUserWithRoles(
                emailAddress,
                password,
                roleName,
                Session["user"].ToString(),
                Session["user"].ToString()
                );
        }

        public ActionResult toHomePage()
        {
            return RedirectToAction("Index", "Home");
        }

        
    }
}