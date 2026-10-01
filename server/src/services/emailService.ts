import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'gauravgarg9595@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || 'SRC Website <onboarding@resend.dev>';

export interface InquiryData {
  type: 'Contact' | 'Career' | 'QuickEnquiry';
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  gender?: string;
  dob?: string;
  highestQualification?: string;
  experienceYears?: string;
  experienceMonths?: string;
  postAppliedFor?: string;
  referenceQuery?: string;
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
          <td style="padding: 8px 0; font-weight: bold; width: 35%; color: #374151;">Full Name:</td>
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
        ${data.gender ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Gender:</td>
          <td style="padding: 8px 0; color: #111827;">${data.gender}</td>
        </tr>` : ''}
        ${data.dob ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date of Birth:</td>
          <td style="padding: 8px 0; color: #111827;">${data.dob}</td>
        </tr>` : ''}
        ${data.highestQualification ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Highest Qualification:</td>
          <td style="padding: 8px 0; color: #111827;">${data.highestQualification}</td>
        </tr>` : ''}
        ${(data.experienceYears || data.experienceMonths) ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Experience:</td>
          <td style="padding: 8px 0; color: #111827;">${data.experienceYears || '0'} Years, ${data.experienceMonths || '0'} Months</td>
        </tr>` : ''}
        ${data.postAppliedFor ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Post Applied For:</td>
          <td style="padding: 8px 0; color: #111827;">${data.postAppliedFor}</td>
        </tr>` : ''}
        ${data.referenceQuery ? `
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Reference / Query:</td>
          <td style="padding: 8px 0; color: #111827;">${data.referenceQuery}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted At:</td>
          <td style="padding: 8px 0; color: #111827;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
        </tr>
      </table>

      ${data.message && data.type !== 'Career' ? `
      <div style="background-color: #f9fafb; border-left: 4px solid #8AC926; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
        <h4 style="margin-top: 0; color: #111827;">Message:</h4>
        <p style="margin: 0; white-space: pre-wrap; color: #4b5563;">${data.message}</p>
      </div>` : ''}

      ${data.file ? `
      <div style="background-color: #ecfdf5; border: 1px dashed #10b981; padding: 12px; border-radius: 4px; font-size: 14px; color: #065f46;">
        📎 Attachment included: <strong>${data.file.originalname}</strong> (${(data.file.size / 1024).toFixed(1)} KB)
      </div>` : ''}

      <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; margin-top: 24px; font-size: 12px; color: #9ca3af; text-align: center;">
        This notification was automatically dispatched from the Singhal Rakesh & Co. website portal to ${RECEIVER_EMAIL}.
      </div>
    </div>
  `;

  const isConfigured = Boolean(
    RESEND_API_KEY &&
    RESEND_API_KEY !== 'your_resend_api_key' &&
    !RESEND_API_KEY.includes('placeholder')
  );

  if (!isConfigured) {
    console.warn('⚠️ RESEND_API_KEY not configured in server/.env. Target recipient:', RECEIVER_EMAIL);
    console.log('--- Form Submission Payload Delivered ---', {
      to: RECEIVER_EMAIL,
      subject: mailSubject,
      data,
    });
    return true;
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    let { data: responseData, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [RECEIVER_EMAIL],
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
        : undefined,
    });

    if (error && error.message?.includes('You can only send testing emails to your own email address')) {
      console.warn(`⚠️ Resend test domain restriction: onboarding@resend.dev cannot send to ${RECEIVER_EMAIL}. Forwarding to registered Resend account email (gauravgarg9595@gmail.com). To send directly to ${RECEIVER_EMAIL}, verify a domain at resend.com/domains.`);
      
      const fallbackResult = await resend.emails.send({
        from: RESEND_FROM,
        to: ['gauravgarg9595@gmail.com'],
        replyTo: data.email,
        subject: `[Target: ${RECEIVER_EMAIL}] ` + mailSubject,
        html: `<div style="background:#fff3cd;padding:12px;margin-bottom:16px;border-radius:4px;border:1px solid #ffeeba;font-family:Arial,sans-serif;font-size:13px;color:#856404;"><strong>Resend Test Mode Notice:</strong> Delivered to your registered account email (<code>gauravgarg9595@gmail.com</code>). To dispatch directly to <code>${RECEIVER_EMAIL}</code> without restriction, verify your domain at <a href="https://resend.com/domains" target="_blank">resend.com/domains</a>.</div>` + htmlContent,
        attachments: data.file
          ? [
              {
                filename: data.file.originalname,
                content: data.file.buffer,
              },
            ]
          : undefined,
      });

      if (!fallbackResult.error) {
        console.log('✅ Email successfully dispatched via Resend to registered account (gauravgarg9595@gmail.com):', fallbackResult.data?.id);
        return true;
      }
    }

    if (error) {
      console.error('❌ Resend API Error:', error);
      return false;
    }

    console.log('✅ Email successfully dispatched via Resend to ' + RECEIVER_EMAIL + ':', responseData?.id);
    return true;
  } catch (error) {
    console.error('❌ Error sending email via Resend:', error);
    return false;
  }
};
