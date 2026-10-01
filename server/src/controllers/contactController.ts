import { Request, Response } from 'express';
import { sendNotificationEmail } from '../services/emailService.js';

export const handleContactForm = async (req: Request, res: Response) => {
  try {
    const { name, firstName, lastName, email, phone, subject, message } = req.body;
    const resolvedName = name || `${firstName || ''} ${lastName || ''}`.trim();

    if (!resolvedName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and message are required fields.',
      });
    }

    const emailSent = await sendNotificationEmail({
      type: 'Contact',
      name: resolvedName,
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
    const {
      name,
      email,
      phone,
      gender,
      dob,
      highestQualification,
      experienceYears,
      experienceMonths,
      postAppliedFor,
      referenceQuery,
      subject,
      message,
    } = req.body;
    const file = req.file;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone number are required.',
      });
    }

    const emailSent = await sendNotificationEmail({
      type: 'Career',
      name,
      email,
      phone,
      subject: postAppliedFor || subject || 'Career Application',
      message: message || referenceQuery || '',
      gender,
      dob,
      highestQualification,
      experienceYears,
      experienceMonths,
      postAppliedFor,
      referenceQuery,
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

    const emailSent = await sendNotificationEmail({
      type: 'QuickEnquiry',
      name,
      email,
      phone,
      subject: 'Quick Query Modal Consultation Request',
      message: message || 'Quick enquiry submitted via Website Modal.',
    });

    return res.status(200).json({
      success: true,
      message: 'Consultation request logged. We will get back to you within 24 business hours.',
      emailDispatched: emailSent,
    });
  } catch (error) {
    console.error('Error in handleQuickEnquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit quick enquiry.',
    });
  }
};
