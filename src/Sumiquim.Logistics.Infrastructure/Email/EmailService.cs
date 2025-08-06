using HandlebarsDotNet;

using MailKit.Net.Smtp;
using MailKit.Security;

using MimeKit;

using Sumiquim.Logistics.Domain.Exceptions;
using Sumiquim.Logistics.Domain.Models;

namespace Sumiquim.EMail.Sender.Infrastructure.Email;

public class EmailService : IEmailService
{
    public void SendInvoiceEmail(ShippingEmailFormat format)
    {
        if (format == null)
            throw new ArgumentNullException("Format no puede ser null");

        MimeMessage mimeMessage = new MimeMessage();
        mimeMessage.From.Add(new MailboxAddress("Jessica Román", "jlroman@sumiquim.com"));
        var strArray = format.Email?.Split(";");

        if (strArray != null)
        {
            foreach (string str in strArray)
                mimeMessage.To.Add((InternetAddress)MailboxAddress.Parse(str));
        }

        mimeMessage.Subject = format.Subject;
        mimeMessage.Body = (MimeEntity)new TextPart("html")
        {
            Text = EmailService.GetHtml(format!, format.Template!)
        };

        using var smtp = new SmtpClient();
        try
        {
            smtp.Connect("smtp.office365.com", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("jlroman@sumiquim.com", "J3lirova26+");
            smtp.Send(mimeMessage);
        }
        catch (Exception ex)
        {
            throw;
        }
        finally
        {
            smtp.Disconnect(true);
            smtp.Dispose();
        }
    }

    private static string GetHtml(object data, string template)
    {
        string path = Path.Combine(Environment.CurrentDirectory, "Templates", template);

        if (!File.Exists(path))
            throw new EMailException("Template not found.");

        var file = File.ReadAllText(path);

        return Handlebars.Compile(file).Invoke(data);
    }
}
