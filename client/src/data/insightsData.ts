export interface InsightPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  snippet: string;
  taxGuruUrl: string;
  tags: string[];
  content?: string;
  coverImage?: string;
  createdAt?: string;
}

export const insightsData: InsightPost[] = [
  {
    id: 'fcra-registration',
    title: 'Eligibility Criteria for Grant of FCRA Registration in India',
    category: 'FCRA & Non-Profit',
    date: 'March 2026',
    readTime: '6 min read',
    author: 'CA. Rakesh Singhal',
    authorRole: 'Founder & Managing Partner',
    snippet: 'Comprehensive analysis of mandatory statutory conditions, prerequisite operational duration, foreign contribution bank account rules, and procedural nuances required by the Ministry of Home Affairs.',
    taxGuruUrl: 'https://taxguru.com/chartered-accountant/eligibility-criteria-grant-fcra-registration.html',
    tags: ['FCRA', 'Section 12AB', 'MHA Guidelines', 'Charitable Trusts']
  },
  {
    id: 'deduction-80ia-interest',
    title: 'Whether Interest Income is Eligible for Deduction u/s 80IA of Income Tax Act',
    category: 'Income Tax',
    date: 'February 2026',
    readTime: '8 min read',
    author: 'CA. Shruti Garg',
    authorRole: 'Partner (Tax Litigation)',
    snippet: 'Examination of Supreme Court and High Court jurisprudence regarding whether interest derived from operational business funds qualify as profit derived from eligible industrial undertakings under Section 80IA.',
    taxGuruUrl: 'https://taxguru.com/income-tax/interest-income-eligible-deduction-us-80ia.html',
    tags: ['Section 80IA', 'Direct Tax', 'Appellate Litigation', 'Judicial Precedents']
  },
  {
    id: 'itc-reversal-rule-37a',
    title: 'Input Tax Credit Reversal under Rule 37A: Procedural Defense Against Supplier Non-Filing',
    category: 'GST Law',
    date: 'February 2026',
    readTime: '7 min read',
    author: 'CA. Shruti Garg',
    authorRole: 'Partner (Tax Litigation)',
    snippet: 'Actionable audit steps for corporate tax heads to reconcile GSTR-2B mismatches and insulate working capital against automated demand notices where suppliers have omitted GSTR-3B filings.',
    taxGuruUrl: 'https://taxguru.com/goods-and-service-tax/itc-reversal-rule-37a-gst.html',
    tags: ['GST', 'Rule 37A', 'GSTR-2B', 'Input Tax Credit']
  },
  {
    id: 'ifc-testing-guidance',
    title: 'Internal Financial Controls (IFC) Testing: Navigating ICAI Revised Guidance Notes',
    category: 'Audit & Assurance',
    date: 'January 2026',
    readTime: '9 min read',
    author: 'CA. Atul Singhal',
    authorRole: 'Partner (Assurance & US Audit)',
    snippet: 'Key documentation expectations for reporting on fraud vulnerabilities, cybersecurity risk controls, and automated transaction logs in compliance with ICAI standards and Companies Act 2013.',
    taxGuruUrl: 'https://taxguru.com/chartered-accountant/internal-financial-controls-reporting-companies-act-2013.html',
    tags: ['Internal Audit', 'IFC', 'ICAI Guidance', 'Risk Governance']
  },
  {
    id: 'clean-slate-doctrine-insolvency',
    title: 'Clean Slate Doctrine in Corporate Insolvency: Pre-CIRP Statutory Dues Post-Ghanshyam Mishra',
    category: 'NCLT & Corporate Law',
    date: 'January 2026',
    readTime: '11 min read',
    author: 'CA. Rakesh Singhal',
    authorRole: 'Founder & Managing Partner',
    snippet: 'Evaluation of High Court judicial attitudes toward extinguishing historical municipal, direct tax, and customs liabilities upon approval of Resolution Plans under Section 31 of IBC.',
    taxGuruUrl: 'https://taxguru.com/corporate-law/clean-slate-doctrine-insolvency-bankruptcy-code.html',
    tags: ['IBC 2016', 'NCLT', 'Resolution Plan', 'Tax Dues']
  },
  {
    id: 'transfer-pricing-safe-harbour',
    title: 'Safe Harbour Rules vs. Bilateral APAs: Optimizing Transfer Pricing Risk for IT/ITES Captives',
    category: 'International Tax',
    date: 'December 2025',
    readTime: '8 min read',
    author: 'CA. Atul Singhal',
    authorRole: 'Partner (Assurance & US Audit)',
    snippet: 'Comparative economic analysis of CBDT Safe Harbour thresholds versus negotiated advance pricing agreements for multinational technology support units operating in India.',
    taxGuruUrl: 'https://taxguru.com/income-tax/safe-harbour-rules-transfer-pricing.html',
    tags: ['Transfer Pricing', 'Safe Harbour', 'APA', 'DTAA']
  }
];

export const statutoryCalendarMarch2026 = [
  { date: '07 MAR 2026', act: 'Income Tax', form: 'Challan 281', description: 'Deposit of TDS/TCS deducted/collected for February 2026.' },
  { date: '15 MAR 2026', act: 'Income Tax', form: 'Advance Tax (Sec 208/211)', description: '4th Installment Advance Tax (100% cumulative) for FY 2025-26.' },
  { date: '20 MAR 2026', act: 'GST Law', form: 'GSTR-3B', description: 'Monthly return filing for taxpayers with AATO > INR 5 Crore.' },
  { date: '31 MAR 2026', act: 'Income Tax', form: 'Updated Return (ITR-U)', description: 'Last date for ITR-U filing for Assessment Year 2023-24 (24 months limit).' }
];
