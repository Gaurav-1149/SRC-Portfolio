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
      'Company',
      'MSME'
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
      'ROC Compliance',
      'LLP Compliance',
      'Corporate Advisory',
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
      'Compliance',
      'GST Refunds',
      'Advisory','Litigation',
      
    ]
  },
  {
    id: 'income-tax',
    title: 'Direct Tax ',
    tagline: 'Strategic Tax Positioning & Appellate Defense',
    iconName: 'Calculator',
    badge: 'Direct Tax Bench',
    description: 'Meticulous corporate and individual direct taxation handling, dispute representation, and tax efficiency strategies under the Income Tax Act.',
    microServices: [
      'Compliance',
      'Tax Planning',
      'Appeals ',' Assessments',
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
'DTAA',
'Transfer Pricing','Cross-Border Tax'

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
     'Statutory Audit','Tax Audit','Internal Audit','Assurance'
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
      'Accounting & Reporting','AP & AR','Payroll','Indirect Tax Compliance'
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
      'Payroll','TDS','PF/ESI', 'Professional Tax'

    ]
  },
  
];
