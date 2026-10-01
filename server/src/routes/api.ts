import { Router } from 'express';
import multer from 'multer';
import {
  handleContactForm,
  handleCareerForm,
  handleQuickEnquiry,
} from '../controllers/contactController.js';
import {
  getInsights,
  createInsight,
  updateInsight,
  deleteInsight,
} from '../controllers/insightsController.js';
import {
  handleAdminLogin,
  handleVerifyAdminSession,
} from '../controllers/authController.js';

const router = Router();

// Configure Multer for in-memory upload (up to 10MB)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC/DOCX documents are accepted for resumes.'));
    }
  },
});

router.post('/contact', handleContactForm);
router.post('/career', upload.single('resume'), handleCareerForm);
router.post('/quick-enquiry', handleQuickEnquiry);

// Admin Authentication API
router.post('/admin/login', handleAdminLogin);
router.get('/admin/verify', handleVerifyAdminSession);

// Insights Management API
router.get('/insights', getInsights);
router.post('/insights', createInsight);
router.put('/insights/:id', updateInsight);
router.delete('/insights/:id', deleteInsight);

export default router;
