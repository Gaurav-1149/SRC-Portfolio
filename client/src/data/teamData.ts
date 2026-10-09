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
    role: 'Founder',
    roleBadge: 'MANAGING PARTNER',
    spotlightTag: 'FOUNDER SPOTLIGHT',
    tierBadge: 'Leadership Tier 1',
    qualifications: 'B.Com, F.C.A., DISA (ICAI)',
    qualificationsShort: 'B. Com, F.C.A., DISA (ICAI)',
    membershipNo: 'FCA #084920',
    expBadge: '28+ Yrs Exp',
    experience: '30+ Years of Professional Practice',
    email: 'rakesh.singhal@srcaccountants.in',
    image: '/images/team/rakesh-singhal.png',
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
  }
]