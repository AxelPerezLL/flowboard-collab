namespace FlowBoardCollab.API.Services.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendPasswordResetEmailAsync(string toEmail, string userName, string resetCode);
        Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = true);
    }
}