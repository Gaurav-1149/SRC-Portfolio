export interface IndustrySector {
  id: string;
  name: string;
  category: string;
  description: string;
  servicesDelivered: string[];
}

export const industriesData: IndustrySector[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing & Engineering',
    category: 'Industrial',
    description: 'Cost attestation, multi-plant Input Tax Credit (ITC) reconciliation, inventory valuation under Ind AS 2, and tax incentives for heavy machine manufacturers.',
    servicesDelivered: ['Plant-floor Cost Accounting', 'Multi-state GST Audits', 'Statutory Audit', 'Advance Tax Planning']
  },
  {
    id: 'travel-entertainment',
    name: 'Travel, Tourism & Entertainment',
    category: 'Hospitality & Leisure',
    description: 'Cross-border remittance compliance, variable GST on accommodation tiers, Tour Operator Tax structures, and media withholding tax advisory.',
    servicesDelivered: ['Form 15CA/15CB Certifications', 'TCS Management on Foreign Tour Packages', 'Service Tax/GST Transitions']
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    category: 'Infrastructure',
    description: 'RERA compliance, quarterly Form 3 architect/engineer/CA attestations, Joint Development Agreement (JDA) tax structuring, and project escrow audits.',
    servicesDelivered: ['RERA Form 3 Certifications', 'Capital Gains Planning', 'JDA Tax Structuring', 'Project Cash Flow Audits']
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    category: 'Hospitality',
    description: '5% non-ITC GST frameworks, tripartite food aggregator reconciliations (Zomato/Swiggy), franchise royalty structuring, and statutory labor compliance.',
    servicesDelivered: ['Aggregator Reconciliation', 'Franchise Tax Advisory', 'PF/ESI Compliance', 'FSSAI Governance']
  },
  {
    id: 'oil-petro',
    name: 'Oil & Petrochemicals',
    category: 'Energy',
    description: 'Dual-tax regimes straddling non-GST petroleum products alongside GST-governed specialty petrochemicals, transfer pricing, and excise compliances.',
    servicesDelivered: ['Dual Tax Regime Modeling', 'Excise & VAT Transition', 'Transfer Pricing Benchmarking']
  },
  {
    id: 'textile-garments',
    name: 'Textile, Garments & Apparel',
    category: 'Consumer Goods',
    description: 'Inverted duty structure GST refund processing, duty drawback, export documentation, and job-work compliance for fabric mills and garment exporters.',
    servicesDelivered: ['Inverted Duty GST Refunds', 'RoDTEP & Export Incentive Audits', 'Job-work E-Way Bill Systems']
  },
  {
    id: 'professionals',
    name: 'Professionals-Architects, Lawyers, Doctors & Engineers',
    category: 'Professional Services',
    description: 'Presumptive taxation under Section 44ADA, professional tax registrations, reverse charge mechanism (RCM) on legal services, and wealth planning.',
    servicesDelivered: ['Section 44ADA Presumptive Tax', 'RCM Governance for Legal Services', 'Personal Financial Structuring']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    category: 'Technology',
    description: 'TCS compliance under Section 52 of CGST Act, multi-state GST warehousing registrations, marketplace reconciliation, and payment gateway compliance.',
    servicesDelivered: ['Section 52 TCS Reconciliations', 'Multi-state Virtual Place of Business (VPOB)', 'Automated Ledger Syncing']
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    category: 'Healthcare',
    description: 'Hospital accounting, medical lab reagent distribution compliance, GST exemptions on clinical healthcare vs taxable diagnostics, and asset capitalization.',
    servicesDelivered: ['Hospital Statutory Audits', 'Diagnostic Chain Taxation', 'Medical Device Import Clearance']
  },
  {
    id: 'healtality',
    name: 'Hospitality',
    category: 'Healthcare',
    description: 'Hospital accounting, medical lab reagent distribution compliance, GST exemptions on clinical healthcare vs taxable diagnostics, and asset capitalization.',
    servicesDelivered: ['Hospital Statutory Audits', 'Diagnostic Chain Taxation', 'Medical Device Import Clearance']
  },
  {
    id: 'creative-digital',
    name: 'Creative & Digital Businesses',
    category: 'Media & Technology',
    description: 'Withholding tax management (Section 194J/194R) on brand sponsorships, export of IT services via LUT, and royalty tax accounting.',
    servicesDelivered: ['Export of IT Services without Payment of Tax (LUT)', 'Section 194R Benefit & Perquisite Tax Advisory', 'LLP Conversions']
  },
  {
    id: 'trading-distribution',
    name: 'Trading & Distribution',
    category: 'Trade & Logistics',
    description: 'Working capital optimization, stock audit verification, electrical switches & cables trade compliance, and interstate supply-chain tax structures.',
    servicesDelivered: ['Bank Stock Audits', 'MSME 45-Day Payment Rule (43B(h)) Compliance', 'GST E-Invoicing Automation']
  },
  {
    id: 'logistics',
    name: 'Telecom Industries',
    category: 'Transportation',
    description: 'Forward charge vs reverse charge election under GST for transporters, consignment note verifications, and fleet operating expense audits.',
    servicesDelivered: ['GTA Forward/Reverse Charge Structuring', 'E-Way Bill Compliance Systems', 'TDS on Truck Contractors (194C)']
  },
  {
    id: 'packaging',
    name: 'Automobiles',
    category: 'Manufacturing',
    description: 'Raw kraft paper procurement auditing, input tax credit optimization, and working capital debt syndication.',
    servicesDelivered: ['Working Capital Audits', 'Statutory Financial Statements', 'Tax Deduction at Source Verification']
  },
  {
    id: 'automotive-parts',
    name: 'Gym And Fitness Centers',
    category: 'Manufacturing',
    description: 'Brake lining powders, vehicular components manufacturing, OEM supply contract evaluations, and international transfer pricing.',
    servicesDelivered: ['Transfer Pricing Documentation', 'Subcontracting GST Reconciliation', 'Balance Sheet Finalization']
  },
  {
    id: 'education-welfare',
    name: 'Printing And Publishing',
    category: 'Non-Profit',
    description: 'Sections 12AB and 80G tax exemptions, FCRA foreign contribution accounts, and annual educational trust audit disclosures.',
    servicesDelivered: ['Section 12AB / 80G Renewals', 'FCRA Prior Permission & Filing', 'Charitable Trust Audit (Form 10B)']
  },
  {
    id: 'logistics',
    name: 'Education And Social Welfare',
    category: 'Transportation',
    description: 'Forward charge vs reverse charge election under GST for transporters, consignment note verifications, and fleet operating expense audits.',
    servicesDelivered: ['GTA Forward/Reverse Charge Structuring', 'E-Way Bill Compliance Systems', 'TDS on Truck Contractors (194C)']
  },
  {
    id: 'packaging',
    name: 'Agricultural Industries',
    category: 'Manufacturing',
    description: 'Raw kraft paper procurement auditing, input tax credit optimization, and working capital debt syndication.',
    servicesDelivered: ['Working Capital Audits', 'Statutory Financial Statements', 'Tax Deduction at Source Verification']
  },
  {
    id: 'automotive-parts',
    name: 'FMCG Industry',
    category: 'Manufacturing',
    description: 'Brake lining powders, vehicular components manufacturing, OEM supply contract evaluations, and international transfer pricing.',
    servicesDelivered: ['Transfer Pricing Documentation', 'Subcontracting GST Reconciliation', 'Balance Sheet Finalization']
  },
  {
    id: 'education-welfare',
    name: 'Goods Transport Agencies',
    category: 'Non-Profit',
    description: 'Sections 12AB and 80G tax exemptions, FCRA foreign contribution accounts, and annual educational trust audit disclosures.',
    servicesDelivered: ['Section 12AB / 80G Renewals', 'FCRA Prior Permission & Filing', 'Charitable Trust Audit (Form 10B)']
  }
];

