import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'gauravtcbd8@gmail.com';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export interface InquiryData {
  type: 'Contact' | 'Career' | 'QuickEnquiry';
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  file?: Express.Multer.File;
}

export const sendNotificationEmail = async (data: InquiryData): Promise<boolean> => {
  const mailSubject = `[${data.type} Form Submission] ${data.subject || 'Website Inquiry'} - ${data.name}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; margin: 20px auto;">
      <div style="border-bottom: 2px solid #8AC926; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #111827; margin: 0;">Singhal Rakesh & Co. (SRC)</h2>
        <p style="color: #6B7280; margin: 4px 0 0 0; font-size: 14px;">New ${data.type} Submission Received</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 30%; color: #374151;">Full Name:</td>
          <td style="padding: 8px 0; color: #111827;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email Address:</td>
          <td style="padding: 8px 0; color: #111827;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone Number:</td>
          <td style="padding: 8px 0; color: #111827;">${data.phone}</td>
        </tr>
        ${data.subject ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject / Role:</td>
          <td style="padding: 8px 0; color: #111827;">${data.subject}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted At:</td>
          <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
        </tr>
      </table>

      <div style="background-color: #f9fafb; border-left: 4px solid #8AC926; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
        <h4 style="margin-top: 0; color: #111827;">Message:</h4>
        <p style="margin: 0; white-space: pre-wrap; color: #4b5563;">${data.message}</p>
      </div>

      ${data.file ? `
      <div style="background-color: #ecfdf5; border: 1px dashed #10b981; padding: 12px; border-radius: 4px; font-size: 14px; color: #065f46;">
        📎 Attachment included: <strong>${data.file.originalname}</strong> (${(data.file.size / 1024).toFixed(1)} KB)
      </div>` : ''}

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
        This notification was automatically dispatched from the Singhal Rakesh & Co. website portal.
      </div>
    </div>
  `;

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"SRC Website Portal" <${process.env.SMTP_USER || 'noreply@srcaccountants.in'}>`,
    to: RECEIVER_EMAIL,
    replyTo: data.email,
    subject: mailSubject,
    html: htmlContent,
    attachments: data.file
      ? [
          {
            filename: data.file.originalname,
            content: data.file.buffer,
          },
        ]
      : [],
  };

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ SMTP credentials not set in server environment. Simulated email sent to:', RECEIVER_EMAIL);
    console.log('--- Form Submission Payload ---', {
      to: RECEIVER_EMAIL,
      subject: mailSubject,
      data,
    });
    return true;
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email successfully dispatched:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email via SMTP:', error);
    return false;
  }
};
