using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollegeEntranceExamResultsScoreAndRec.Models
{
    public class SMSNotification
    {
        public int ID { get; private set; }
		public string BASE_URL { get; private set; }
        public string API_KEY { get; private set; }
        public string SENDER { get; private set; }
        public string RECIPIENT { get; private set; }
        public string MESSAGE_TEXT { get; private set; }
    }
}