import { Request, Response } from 'express';
import { sendNotificationEmail } from '../services/emailService.js';

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and message are required fields.',
      });
    }

    const emailSent = await sendNotificationEmail({
      type: 'Contact',
      name,
      email,
      phone,
      subject: subject || 'General Contact Inquiry',
      message,
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We have received your message and will respond shortly.',
      emailDispatched: emailSent,
    });
  } catch (error) {
    console.error('Error in handleContactForm:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again later.',
    });
  }
};

export const handleCareerForm = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const file = req.file;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, subject, and message are all required.',
      });
    }

    const emailSent = await sendNotificationEmail({
      type: 'Career',
      name,
      email,
      phone,
      subject,
      message,
      file,
    });

    return res.status(200).json({
      success: true,
      message: 'Your application has been received! Our recruitment team will review your profile.',
      emailDispatched: emailSent,
    });
  } catch (error) {
    console.error('Error in handleCareerForm:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit career application. Please try again.',
    });
  }
};

export const handleQuickEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.',
      });
    }

    await sendNotificationEmail({
      type: 'QuickEnquiry',
      name,
      email,
      phone,
      subject: 'Website Quick Consultation Request',
      message: message || 'Quick enquiry initiated from Home Page banner.',
    });

    return res.status(200).json({
      success: true,
      message: 'Consultation request logged. We will get back to you within 24 business hours.',
    });
  } catch (error) {
    console.error('Error in handleQuickEnquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit quick enquiry.',
    });
  }
};
