using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Azure.Communication.Email;
using Azure;
using System.Text.Json;

namespace custom_email_function
{
    public class send_mail
    {
        private readonly ILogger _logger;

        public send_mail(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<send_mail>();
        }

        [Function("send_mail")]
        public HttpResponseData Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req,
        [BlobInput("templates/email-template.html", Connection = "AzureWebJobsStorage")] string template)
        {
            var response = req.CreateResponse();
            if (req.Body != null)
            {
                StreamReader reader = new StreamReader(req.Body);
                string body = reader.ReadToEnd();

                // Parse JSON using System.Text.Json
                Root doc = JsonSerializer.Deserialize<Root>(body)!;

                string from = doc.Messages[0].From.Email;
                string to = doc.Messages[0].To[0].Email;
                string otp = doc.Messages[0].Variables.otp;
                string subject = doc.Messages[0].Subject;

                // substitute into template
                template = template.Replace("{{var:email:\"\"}}", to);
                template = template.Replace("{{var:otp:\"\"}}", otp);

                // send email
                string connectionString = Environment.GetEnvironmentVariable("COMMUNICATION_SERVICES_CONNECTION_STRING")!;
                var emailClient = new EmailClient(connectionString);

                try
                {
                    _logger.LogInformation("Sending email...");
                    EmailSendOperation emailSendOperation = emailClient.Send(
                        Azure.WaitUntil.Completed,
                        from,
                        to,
                        subject,
                        template);
                    EmailSendResult statusMonitor = emailSendOperation.Value;

                    _logger.LogInformation($"Email Sent. Status = {emailSendOperation.Value.Status}");

                    /// Get the OperationId so that it can be used for tracking the message for troubleshooting
                    string operationId = emailSendOperation.Id;
                    _logger.LogInformation($"Email operation id = {operationId}");
                }
                catch (RequestFailedException ex)
                {
                    /// OperationID is contained in the exception message and can be used for troubleshooting purposes
                    _logger.LogInformation($"Email send operation failed with error code: {ex.ErrorCode}, message: {ex.Message}");
                    response.StatusCode = HttpStatusCode.InternalServerError;
                    return response;
                }
            }

            response.StatusCode = HttpStatusCode.OK;
            return response;
        }
    }

    public class Root
    {
        public List<Message>? Messages { get; set; }
    }

    public class Message
    {
        public List<To> To { get; set; }
        public Variables Variables { get; set; }
        public string Subject { get; set; }
        public int TemplateID { get; set; }
        public bool TemplateLanguage { get; set; }
        public From From { get; set; }
    }

    public class To
    {
        public string Email { get; set; }
    }

    public class Variables
    {
        public string email { get; set; }
        public string otp { get; set; }
        public string otpmessage { get; set; }
        public string otpcodeIntro { get; set; }
        public string otpsignature { get; set; }
    }

    public class From
    {
        public string Email { get; set; }
    }
}