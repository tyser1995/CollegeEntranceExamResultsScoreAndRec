using Infobip.Api.Client;
using Infobip.Api.Client.Api;
using Infobip.Api.Client.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CollegeEntranceExamResultsScoreAndRec.Models
{
    public class SendSmsLib
    {
        /**
         * Send an SMS message by using Infobip API C# Client.
         *
         * THIS CODE EXAMPLE IS READY BY DEFAULT. HIT RUN TO SEND THE MESSAGE!
         *
         * Send SMS API reference: https://www.infobip.com/docs/api#channels/sms/send-sms-message
         * See Readme file for details.
         */

        public static string _RECIPIENT { get; set; }

        private static readonly string BASE_URL = "https://yrznjj.api.infobip.com";
        private static readonly string API_KEY = "ca4ec08fd9779172c48881de1ceb01a4-e640565e-5387-41da-8f14-ad32e26d885a";

        private static readonly string SENDER = "InfoSMS";
        private static readonly string RECIPIENT = "639778877083";
        private static readonly string MESSAGE_TEXT = "This message from UA  Information Center";

        static void Main(string[] args)
        {
            var configuration = new Configuration()
            {
                BasePath = BASE_URL,
                ApiKeyPrefix = "App",
                ApiKey = API_KEY
            };

            var sendSmsApi = new SendSmsApi(configuration);

            var smsMessage = new SmsTextualMessage()
            {
                From = SENDER,
                Destinations = new List<SmsDestination>()
                {
                    new SmsDestination(to: RECIPIENT)
                },
                Text = MESSAGE_TEXT
            };

            var smsRequest = new SmsAdvancedTextualRequest()
            {
                Messages = new List<SmsTextualMessage>() { smsMessage }
            };

            try
            {
                var smsResponse = sendSmsApi.SendSmsMessage(smsRequest);

                Console.WriteLine("Response: " + smsResponse.Messages.FirstOrDefault());
            }
            catch (ApiException apiException)
            {
                Console.WriteLine("Error occurred! \n\tMessage: {0}\n\tError content", apiException.ErrorContent);
            }
        }
    }
}