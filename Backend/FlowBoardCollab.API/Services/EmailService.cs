using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using FlowBoardCollab.API.Services.Interfaces;

namespace FlowBoardCollab.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendPasswordResetEmailAsync(string toEmail, string userName, string resetCode)
        {
            var subject = "Recuperación de Contraseña - FlowBoard Collab";
            
            var body = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{ font-family: Arial, sans-serif; background-color: #0d1117; color: #e6edf3; padding: 20px; }}
                        .container {{ max-width: 600px; margin: 0 auto; background-color: #161b22; padding: 30px; border-radius: 10px; border: 1px solid #30363d; }}
                        .header {{ text-align: center; margin-bottom: 30px; }}
                        .logo {{ font-size: 28px; font-weight: bold; color: #00d4ff; }}
                        .content {{ margin-bottom: 30px; }}
                        .code {{ 
                            display: inline-block; 
                            background-color: #1c2333; 
                            padding: 12px 24px; 
                            border-radius: 8px; 
                            font-size: 24px; 
                            font-weight: bold;
                            color: #00d4ff;
                            letter-spacing: 4px;
                            border: 1px solid #0a4a5a;
                            margin: 10px 0;
                        }}
                        .footer {{ text-align: center; color: #8b949e; font-size: 12px; margin-top: 30px; border-top: 1px solid #30363d; padding-top: 20px; }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>
                            <span class='logo'>FlowBoard Collab</span>
                        </div>
                        <div class='content'>
                            <h2>¡Hola, {userName}!</h2>
                            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
                            <p>Usa el siguiente código para restablecer tu contraseña:</p>
                            <div style='text-align: center;'>
                                <span class='code'>{resetCode}</span>
                            </div>
                            <p style='font-size: 14px; color: #8b949e;'>
                                Este código expirará en <strong>10 minutos</strong>.
                            </p>
                            <p style='font-size: 14px; color: #8b949e;'>
                                Si no solicitaste este cambio, ignora este mensaje.
                            </p>
                        </div>
                        <div class='footer'>
                            <p>© 2024 FlowBoard Collab. Todos los derechos reservados.</p>
                            <p>Este es un correo automático, por favor no responder.</p>
                        </div>
                    </div>
                </body>
                </html>
            ";

            return await SendEmailAsync(toEmail, subject, body);
        }

        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body, bool isHtml = true)
        {
            try
            {
                var smtpHost = _configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
                var smtpUser = _configuration["Email:SmtpUser"] ?? "";
                var smtpPass = _configuration["Email:SmtpPass"] ?? "";
                var fromEmail = _configuration["Email:FromEmail"] ?? smtpUser;

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(smtpUser, smtpPass)
                };

                using var message = new MailMessage(fromEmail, toEmail)
                {
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = isHtml
                };

                await client.SendMailAsync(message);
                _logger.LogInformation($"Email enviado a {toEmail}");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error enviando email a {toEmail}");
                return false;
            }
        }
    }
}