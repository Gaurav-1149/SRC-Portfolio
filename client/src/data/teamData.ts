export interface TeamMember {
  id: string;
  name: string;
  displayName?: string;
  role: string;
  roleBadge?: string;
  spotlightTag?: string;
  tierBadge?: string;
  qualifications: string;
  qualificationsShort?: string;
  membershipNo?: string;
  expBadge?: string;
  experience: string;
  email: string;
  image?: string;
  specialization: string[];
  bio: string[];
  summaryBio?: string;
  achievements?: string[];
}

export const teamData: TeamMember[] = [
  {
    id: 'rakesh-singhal',
    name: 'Mr. Rakesh Singhal',
    displayName: 'Mr. Rakesh Singhal',
    role: 'Founder & Managing Partner',
    roleBadge: 'MANAGING PARTNER',
    spotlightTag: 'FOUNDER SPOTLIGHT',
    tierBadge: 'Leadership Tier 1',
    qualifications: 'B.Com, F.C.A., DISA (ICAI)',
    qualificationsShort: 'B. Com, F.C.A., DISA (ICAI)',
    membershipNo: 'FCA #084920',
    expBadge: '28+ Yrs Exp',
    experience: '30+ Years of Professional Practice',
    email: 'rakesh.singhal@srcaccountants.in',
    image: '/images/team/rakesh-singhal.jpg',
    summaryBio: 'With over 30 years of professional experience in practice, Mr. Rakesh Singhal brings with himself vast experience in handling accounting and taxation issues. His areas of expertise include financial planning, tax planning, balance sheet finalisation, accounting and taxation, with a practical approach focused on understanding each client’s specific circumstances and objectives. His extensive experience and professional insight forms a strong foundation for the firm’s commitment to technical excellence, professional integrity and long-term client relationships.',
    specialization: [
      'Financial Planning & Strategic Advisory',
      'Corporate & Direct Tax Planning',
      'Balance Sheet Finalisation',
      'Appellate Representation & Dispute Resolution',
      'DISA Information Systems Audit'
    ],
    bio: [
      'With over 30 years of professional experience in active practice, Mr. Rakesh Singhal brings vast, seasoned experience in handling multifaceted accounting, taxation, and statutory matters.',
      'His core areas of expertise encompass financial planning, tax structuring, balance sheet finalisation, and high-stakes dispute resolution, with an analytical and practical approach centered on understanding each client’s specific operational circumstances and business objectives.',
      'His extensive experience and deep professional insight form a steadfast foundation for the firm’s enduring commitment to technical excellence, fiduciary integrity, and long-term client relationships.'
    ],
    achievements: [
      'Founded Singhal Rakesh & Co. in 1997',
      'Fellow Member of the Institute of Chartered Accountants of India (FCA)',
      'DISA (ICAI) Certified Information Systems Auditor',
      'Spearheaded hundreds of complex appellate proceedings before CIT(A) and ITAT'
    ]
  },
  {
    id: 'atul-singhal',
    name: 'Mr. Atul Singhal',
    displayName: 'Mr. Atul Singhal',
    role: 'Partner',
    roleBadge: 'ASSURANCE PARTNER',
    spotlightTag: 'ASSURANCE & GLOBAL AUDIT',
    tierBadge: 'Leadership Tier 1',
    qualifications: 'B.Com, A.C.A.',
    qualificationsShort: 'B.Com, A.C.A.',
    membershipNo: 'ACA #542109',
    expBadge: 'Ex-Deloitte Lead',
    experience: 'Ex-Deloitte | Specialist in US & International Assurance',
    email: 'atul.singhal@srcaccountants.in',
    image: '/images/team/atul-singhal.jpg',
    summaryBio: "CA Atul Singhal brings rich professional experience from his association with Deloitte, where he received multiple awards and recognition for his professional excellence and contributions. He has developed strong expertise in US Audit and Accounting, with extensive exposure to international accounting and assurance practices. His Big Four experience, coupled with specialised expertise in US Audit and Accounting, strengthens the firm's capabilities in delivering internationally aligned audit and accounting services.",

    specialization: [
      'US Audit & US GAAP Reporting',
      'International Accounting & Assurance Standards',
      'Statutory & Forensic Audits',
      'Internal Financial Controls (IFC) Testing',
      'Cross-Border Financial Advisory'
    ],
    bio: [
      'CA Atul Singhal brings rich professional acumen from his tenure with Deloitte, where he earned multiple awards and commendations for professional excellence, execution rigor, and audit quality.',
      'He has developed rigorous specialization in US Audit and Accounting, coupled with extensive exposure to international assurance standards and multinational client engagements.',
      'His Big Four background and specialized expertise in US Audit significantly enhance the firm’s capabilities in delivering globally aligned, audit-ready financial governance.'
    ],
    achievements: [
      'Ex-Deloitte Assurance Practice',
      'Multiple Firm Awards for Audit Excellence & Technical Innovation',
      'Specialist in US GAAP, IFRS, and Ind AS Convergence'
    ]
  },
  {
    id: 'shruti-garg',
    name: 'Ms. Shruti Garg',
    displayName: 'Ms. Shruti Garg',
    role: 'Partner',
    roleBadge: 'TAX LITIGATION',
    spotlightTag: 'DIRECT & INDIRECT TAX',
    tierBadge: 'Leadership Tier 1',
    qualifications: 'B.Com Hons., A.C.A.',
    qualificationsShort: 'B.Com Hons., A.C.A.',
    membershipNo: 'ACA #558712',
    expBadge: 'AIR 40 CA Ranker',
    experience: 'AIR 40 (CA Foundation) | Direct & Indirect Tax Specialist',
    email: 'shruti.garg@srcaccountants.in',
    image: '/images/team/shruti-garg.jpg',
    summaryBio: 'CA Shruti Garg is a Chartered Accountant with All India Rank 40 in CA Foundation and brings specialised experience in Direct and Indirect Tax litigation and compliance. Having worked with a leading professional firm as well as an MNC, she has gained experience across tax litigation, assessments, appeals and regulatory matters, along with practical exposure to taxation compliance and processes in a corporate environment. Her combination of professional practice and industry experience enables the firm to approach taxation matters from both a technical and commercial perspective, with an emphasis on practical and solution-oriented advice.',
    specialization: [
      'Direct & Indirect Tax Litigation',
      'GST Assessments, Audits & Appeals',
      'Corporate Tax Structuring & Compliance',
      'MNC Regulatory Governance',
      'Statutory Representation'
    ],
    bio: [
      'CA Shruti Garg is an accomplished Chartered Accountant who secured All India Rank 40 in CA Foundation and brings specialized expertise in Direct and Indirect Tax litigation, assessments, and corporate regulatory compliance.',
      'Having worked with leading professional advisory firms as well as established multinational corporations, she has gained comprehensive experience across contentious tax assessments, tribunal appeals, and corporate compliance frameworks.',
      'Her blend of professional practice and multinational corporate exposure empowers the firm to approach complex taxation issues with both rigorous legal depth and commercial practicality.'
    ],
    achievements: [
      'All India Rank 40 (AIR 40) in CA Foundation',
      'Ex-MNC & Leading Advisory Practice Experience',
      'Lead Strategist on Complex GST & Income Tax Litigation Mandates'
    ]
  }
];
