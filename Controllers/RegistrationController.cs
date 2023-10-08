using CollegeEntranceExamResultsScoreAndRec.Models;
using Infobip.Api.Client;
using Infobip.Api.Client.Api;
using Infobip.Api.Client.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
//using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace CollegeEntranceExamResultsScoreAndRec.Controllers
{
    public class RegistrationController : Controller
    {
        SqlConnection con = new SqlConnection();
        SqlCommand cmd = new SqlCommand();
        SqlDataReader rdr;

        private static readonly string BASE_URL = "https://yrznjj.api.infobip.com";
        private static readonly string API_KEY = "ca4ec08fd9779172c48881de1ceb01a4-e640565e-5387-41da-8f14-ad32e26d885a";

        private static readonly string SENDER = "UA InfoSMS";
        private static readonly string RECIPIENT = "639778877083";
        private static readonly string MESSAGE_TEXT = "This message from UA  Information Center";

        public void InsertRegistration(
            string Username,
            string Password,
            string FirstName,
            string MiddleName,
            string LastName,
            string ContactNo,
            string EmailAdd,
            string EnrolleeType,
            string Sex,
            string MailingAdd,
            string ParentsName,
            string ParentsContactNo,
            string AcademicStrand,
            int AcademicStrandID,
            string LastSchoolAttended,
            string LastSchoolAdd
            )
        {
            con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["CollegeEntranceExamResultsScoreAndRec.ConnectionString"].ToString());
            con.Open();

            cmd = new SqlCommand(@"sp_InsertRegistration", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ID", 0);
            cmd.Parameters.AddWithValue("@Username", Username);
            cmd.Parameters.AddWithValue("@Password", Password);
            cmd.Parameters.AddWithValue("@FirstName", FirstName);
            cmd.Parameters.AddWithValue("@MiddleName", MiddleName);
            cmd.Parameters.AddWithValue("@LastName", LastName);
            cmd.Parameters.AddWithValue("@ContactNo", ContactNo);
            cmd.Parameters.AddWithValue("@EmailAdd", EmailAdd);
            cmd.Parameters.AddWithValue("@EnrolleeType", EnrolleeType);
            cmd.Parameters.AddWithValue("@Sex", Sex);
            cmd.Parameters.AddWithValue("@MailingAdd", MailingAdd);
            cmd.Parameters.AddWithValue("@ParentsName", ParentsName);
            cmd.Parameters.AddWithValue("@ParentsContactNo", ParentsContactNo);
            cmd.Parameters.AddWithValue("@AcademicStrand", AcademicStrand);
            cmd.Parameters.AddWithValue("@AcademicStrandID", AcademicStrandID);
            cmd.Parameters.AddWithValue("@LastSchoolAttended", LastSchoolAttended);
            cmd.Parameters.AddWithValue("@LastSchoolAdd", LastSchoolAdd);
            cmd.Parameters.AddWithValue("@CreatedBy", Username);
            cmd.Parameters.AddWithValue("@ModifiedBy", Username);
            cmd.ExecuteNonQuery();

            con.Close();

            //SendSmsNofication(ContactNo.Replace("+","").Replace("-", "").Replace("(", "").Replace(")", ""), " This message from UA Information Ceter" 
            //     + " Student Name:" +
            //    FirstName + " " + LastName + " is now registered. Please do not reply.");
            this.Session["user"] = Username;
                
            SendEmailNotification(EmailAdd);

        }

        public void SendSmsNofication(string ContactNo, string _MESSAGE_TEXT)
        {
            //var configuration = new Configuration()
            //{
            //    BasePath = BASE_URL,
            //    ApiKeyPrefix = "App",
            //    ApiKey = API_KEY
            //};

            //var sendSmsApi = new SendSmsApi(configuration);

            //var smsMessage = new SmsTextualMessage()
            //{
            //    From = SENDER,
            //    Destinations = new List<SmsDestination>()
            //    {
            //        new SmsDestination(to: ContactNo)
            //    },
            //    Text = _MESSAGE_TEXT
            //};

            //var smsRequest = new SmsAdvancedTextualRequest()
            //{
            //    Messages = new List<SmsTextualMessage>() { smsMessage }
            //};

            //try
            //{
            //    var smsResponse = sendSmsApi.SendSmsMessage(smsRequest);

            //    Console.WriteLine("Response: " + smsResponse.Messages.FirstOrDefault());
            //}
            //catch (ApiException apiException)
            //{
            //    Console.WriteLine("Error occurred! \n\tMessage: {0}\n\tError content", apiException.ErrorContent);
            //}
        }

        public void SendEmailNotification(string to)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtp = new SmtpClient();
            //string from = "rosefiel.suriaga@antiquespride.edu.ph";

            //Fetching Settings from WEB.CONFIG file.  
            string emailSender = "rosefiel.suriaga@antiquespride.edu.ph";
            string emailSenderPassword = "etra stuh ztst bptn";
            string emailSenderHost = "smtp.gmail.com";
            int emailSenderPort = 587;
            Boolean emailIsSSL = true;
            

            //int port = HttpContext.Request.Url.Port;
            string scheme = HttpContext.Request.Url.Scheme;
            string host = "https://"+HttpContext.Request.Url.Authority+ "/Verification/Index?email="+to;
            mail.To.Add(to);
            mail.From = new MailAddress(emailSender);
            mail.Subject = "Account Created";
            mail.IsBodyHtml = true;
            // mail.Body = "<table><thead><th><td>test</td></th></thead></table>";
            mail.Body = "<p><h3>Congratulations!</h3></p><p> Your account has been created in UA Web Application.</p><p>Kindly click the link below to verify your account</p><p><a href='"+host+"'>Verify Email.</a></p>";

            smtp.Host = emailSenderHost;
            //smtp.UseDefaultCredentials = true;
            smtp.Credentials = new System.Net.NetworkCredential(emailSender, emailSenderPassword);
            smtp.EnableSsl = emailIsSSL;
            smtp.Port = emailSenderPort; //465
            smtp.Send(mail);

            mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnSuccess;
        }
    }
}