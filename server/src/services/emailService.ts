import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendApplicationConfirmation(to: string, jobTitle: string, companyName: string) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: `Application Received - ${jobTitle} at ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Application Received</h2>
          <p>Dear Applicant,</p>
          <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
          <p>We have received your application and will review it shortly. You should expect to hear from us within 1-2 business days.</p>
          <p>Best regards,<br>The JobPortal Team</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Application confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending application confirmation email:', error);
    }
  }

  async sendContactConfirmation(to: string, name: string) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: 'Thank you for contacting us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thank You for Contacting Us</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>The JobPortal Team</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Contact confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending contact confirmation email:', error);
    }
  }

  async sendNewApplicationNotification(to: string, applicantName: string, jobTitle: string) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: to,
      subject: `New Application - ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Job Application</h2>
          <p>A new application has been submitted for the <strong>${jobTitle}</strong> position.</p>
          <p><strong>Applicant:</strong> ${applicantName}</p>
          <p>Please log in to your admin dashboard to review the application.</p>
          <p>Best regards,<br>The JobPortal System</p>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('New application notification email sent successfully');
    } catch (error) {
      console.error('Error sending new application notification email:', error);
    }
  }
}

export default new EmailService();