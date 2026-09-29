export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  badge?: string;
  description: string;
  microServices: string[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'company-formation',
    title: 'Registration',
    tagline: 'Incorporation & Entity Structuring',
    iconName: 'Briefcase',
    badge: 'Fast-Track Setup',
    description: 'Assisting domestic and overseas entrepreneurs with optimal entity structuring, incorporation, and foundational licensing.',
    microServices: [
      'Partnership Firm',
      'Limited Liability Partnership (LLP)',
      'Hindu Undivided Family (HUF)',
      'Private Limited Company',
      'Public Limited Company',
      'Section 8 Company (Non-Profit)',
      'Foreign Company / Subsidiary Incorporation',
      'One Person Company (OPC)',
      'Udyog Aadhar / MSME Udyam Registration'
    ]
  },
  {
    id: 'corporate-services',
    title: 'Corporate Services',
    tagline: 'End-to-End MCA & Corporate Secretarial Governance',
    iconName: 'Building2',
    badge: 'MCA-21 Compliant',
    description: 'Full-spectrum secretarial and corporate compliance management ensuring business entities maintain statutory integrity with regulatory bodies.',
    microServices: [
      'Company Annual Compliances',
      'LLP Annual Filings',
      'FC-GPR & RBI Compliances',
      'Corporate Secretarial Support',
      'Change in Company Name / Registered Office / Business Objects',
      'Change in Directors',
      'Change in Authorized Share Capital',
      'Company Strike Off and LLP Closure',
      "Directors' KYC & DIN-related Compliance"
    ]
  },
  
  {
    id: 'gst',
    title: 'Indirect Tax',
    tagline: 'Indirect Tax Advisory, Filings & Litigation',
    iconName: 'Receipt',
    badge: 'ITC Optimization',
    description: 'Robust indirect tax governance safeguarding supply chains against cascading blockages, statutory lockouts, and penalty assessments.',
    microServices: [
      'GST Registration',
      'GST Returns',
      'GST Refunds',
      'GST Audit',
      'GST Assessments',
      'GST Appeals',
      'Other Advisory Services',
    ]
  },
  {
    id: 'income-tax',
    title: 'Direct Tax',
    tagline: 'Strategic Tax Positioning & Appellate Defense',
    iconName: 'Calculator',
    badge: 'Direct Tax Bench',
    description: 'Meticulous corporate and individual direct taxation handling, dispute representation, and tax efficiency strategies under the Income Tax Act.',
    microServices: [
      'TDS & TCS Return Filings',
      'Income Tax Return Filings',
      'Faceless Assessment & Scrutiny Proceedings',
      'Appeals before Commissioner of Income Tax (CIT)',
      'Appeals before ITAT',
      'Rectification Proceedings',
      'Refund & Outstanding Demand Resolution Matters',
      'Lower Deduction Certificate',
      '80G & 12AA/12AB Trust Registration',
      'Tax Planning for Corporate, Non-Corporate & High Net Worth Individuals'
    ]
  },
  {
    id: 'international-taxation',
    title: 'International Taxation & Transfer Pricing',
    tagline: 'Cross-Border Fiscal Optimization & Treaty Law',
    iconName: 'Globe',
    badge: 'Cross-Border',
    description: 'Advising multinational enterprises and non-resident Indians on global transfer pricing frameworks, DTAA benefits, and FEMA regulations.',
    microServices: [
      'Transfer Pricing Audit (Form 3CEB) & Compliance',
      'Transfer Pricing Assessments',
      'Objection Filing before Dispute Resolution Panel (DRP)',
      'Filing of Form 15CA & 15CB Certifications',
      'NRI Taxation & Capital Gains Advisory',
      'Double Taxation Avoidance Agreement (DTAA) Advisory',
      'Tax Residency Certificate (TRC) & Form 10F Procurement',
      'Taxation of Expatriates',
      'Cross-Border Corporate Tax Structuring'
    ]
  },
  {
    id: 'audit-assurance',
    title: 'Audit & Assurance',
    tagline: 'Independent Fiduciary Verification & Forensic Rigor',
    iconName: 'ShieldCheck',
    badge: 'Peer-Reviewed Practice',
    description: 'Delivering statutory clarity, forensic accuracy, and governance validation for enterprise leadership, investors, and regulatory bodies.',
    microServices: [
      'Statutory Audit',
      'Tax Audit',
      'Internal Audit',
      'Information Systems Audit',
      'Stock Audit',
      'Due Diligence Review',
      'Operational & Financial Review',
      'Assurance Servcies'
    ]
  },
  {
    id: 'global-accounting',
    title: 'Global Accounting & Compliance Services',
    tagline: 'Offshore Bookkeeping & International Filing',
    iconName: 'Cpu',
    badge: 'International Standards',
    description: 'Outsourced bookkeeping, controller services, and statutory filings for clients across the United States, Australia, Singapore, and New Zealand.',
    microServices: [
     'Financial Accounting and Reporting',
    'Accounts Payable & Accounts Receivable Management',
    'Payroll Management',
    'Indirect Tax Compliances'
    ]
  },
  {
    id: 'outsource-payroll',
    title: 'Outsource Payroll Accounting',
    tagline: 'Statutory Payroll Execution & Labor Law Governance',
    iconName: 'Users',
    badge: '100% On-Time Compliance',
    description: 'Comprehensive employee salary disbursement workflows, withholding tax deductions, and labor regulatory filings.',
    microServices: [
     ' Monthly Salary Payroll Processing',
'Income Tax (TDS on Salary) Compliance',
'Provident Fund (PF) Compliance',
'ESI & Professional Tax Compliance',
'Full & Final Settlement Processing'
    ]
  },
  {
    id: 'other-services',
    title: 'Other Services',
    tagline: 'Virtual CFO, Certifications & Government Licensing',
    iconName: 'Award',
    badge: 'Bespoke Advisory',
    description: 'Targeted compliance, intellectual property protection, food and import-export licenses, and executive CFO services.',
    microServices: [
      'Virtual CFO Services',
      'Startup Advisory',
      'MSME Advisory',
      'FEMA Compliance & Advisory',
      'FCRA Registration & Compliance',
      'Trademark Registration',
      'Import Export Code (IEC)',
      'PAN & TAN Registration',
      'FSSAI and other business registrations',
      'EPFO, ESIC and LWF Registration/ Returns',
      'Professional Tax Registration'
    ]
  }
];
