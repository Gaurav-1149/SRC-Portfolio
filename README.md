# Singhal Rakesh & Co. (SRC) — Chartered Accountants Firm Portal

A full-stack portfolio and practice management web application built for **Singhal Rakesh & Co. (SRC)**, an ICAI-registered Chartered Accountancy firm (FRN: 014829N) with 29+ years of professional practice in New Delhi, India.

---

## 🚀 Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide React icons, React Router DOM (v6)
- **Backend:** Node.js, Express.js, TypeScript, Nodemailer, Multer (file handling for resumes)
- **Styling & Color System:**
  - **Primary:** `#8AC926` (Firm signature green accent)
  - **Secondary:** `#111827` / `#000000` (Deep black / slate dark sections)
  - **Tertiary / Neutral:** `#6B7280` / `#F3F4F6` (Grey, subtle borders, muted text)

---

## 🧭 Site Architecture & Routes

| Route | View / Page | Description |
|---|---|---|
| `/home` | **Home** | Executive Hero section with modern CA chambers photo visual, trust metrics, About SRC, Vision, Mission, Values, Core Services preview, and Why Choose Us. |
| `/aboutUs/ourTeam` | **Our Team** | Detailed profiles with dedicated partner portrait photo frames: Mr. Rakesh Singhal (Founder & Managing Partner), Mr. Atul Singhal (Partner, Ex-Deloitte), and Ms. Shruti Garg (Partner, AIR 40). |
| `/aboutUs/client` | **Clients & Industries** | 20+ specialized practice sectors with interactive category filtering, search, and client testimonials. |
| `/services` | **Services** | High-level practice category cards (Corporate, GST, Income Tax, International Tax, Audit, Global Accounting, Payroll, Other Services) with 80+ micro-services and real-time search. |
| `/insight` | **Insights & Blogs** | Dynamic regulatory briefing cards loaded from API/store with direct TaxGuru links, category filtering, search, and Statutory Due Date Calendar. Direct link to Admin upload portal. |
| `/admin` & `/admin/insights` | **Admin Insights Portal** | Dedicated management portal for partners to upload, edit, live-preview, and delete regulatory insights. Fully synced with backend storage. |
| `/careers` | **Careers** | Recruitment form (Name, Email, Phone, Subject dropdown, Message, and optional Resume/CV upload), right-side HR contact cards, and embedded Google Maps location. |
| `/contactUs` | **Contact Us** | Formal consultation scoping brief form, direct partner phone lines, chambers transit guide, and interactive Google Map. |

---

## 🛠️ Key Components & Layout Structure

1. **TopBar:**
   - Left: Contact Phone (`+91 (11) 4567-8900`), Official Email (`contact@srcaccountants.in`), Working Hours.
   - Right: Interactive SVG social icons for **LinkedIn**, **WhatsApp**, **Twitter / X**, and **Instagram**.
2. **Navbar:**
   - 6 main navigation items: `Home`, `About Us` (with hover dropdown showing `Our Team` and `Client`), `Services`, `Insights`, `Careers`, `Contact Us`.
   - "Schedule Consultation" call-to-action button.
   - Mobile-responsive navigation drawer.
3. **Footer (5 Segments):**
   - **Segment 1:** Firm Logo & summary with ICAI registration credentials.
   - **Segment 2:** Quick Links to all key routes.
   - **Segment 3:** Practice verticals links.
   - **Segment 4:** Contact details (Chambers at Connaught Place & HQ at Mianwali Nagar).
   - **Segment 5:** Embedded Google Map with directions link.
4. **Back to Top:** Floating button at the bottom right that smoothly scrolls to the top of the page when scrolled past 300px.

---

## 📧 Form Handling & Email Notifications

All inquiries submitted via `/contactUs`, `/careers`, and the Home page Quick Enquiry banner hit the Express backend:
- Configured recipient email: **`gauravgarg9595@gmail.com`**
- Supports optional PDF/DOCX resume file upload handled in-memory via `multer` and attached directly to the dispatch email.
- Fallback safe logging: in development environments without SMTP credentials, submissions are logged cleanly to the terminal without throwing server errors.

---

## 💻 Local Setup & Execution Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Setup
```bash
cd ca-firm-website/server
npm install
cp .env.example .env
# Edit .env with your Resend API credentials:
# RESEND_API_KEY=your_resend_api_key
# RECEIVER_EMAIL=gauravgarg9595@gmail.com

npm run dev
# Server runs on http://localhost:5001
```

### 2. Frontend Setup
```bash
cd ca-firm-website/client
npm install
npm run dev
# Vite dev server runs on http://localhost:3000
```
# SRC-Portfolio
