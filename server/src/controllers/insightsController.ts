import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

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

const dataDir = path.resolve(process.cwd(), 'data');
const insightsFilePath = path.join(dataDir, 'insights.json');

const defaultInsights: InsightPost[] = [
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

function ensureDataFile(): InsightPost[] {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(insightsFilePath)) {
      fs.writeFileSync(insightsFilePath, JSON.stringify(defaultInsights, null, 2), 'utf-8');
      return defaultInsights;
    }
    const content = fs.readFileSync(insightsFilePath, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : defaultInsights;
  } catch (err) {
    console.error('Error reading insights file, using defaults:', err);
    return defaultInsights;
  }
}

function saveInsights(insights: InsightPost[]): boolean {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(insightsFilePath, JSON.stringify(insights, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing insights file:', err);
    return false;
  }
}

// GET /api/insights
export const getInsights = (_req: Request, res: Response): void => {
  try {
    const list = ensureDataFile();
    res.json({
      success: true,
      count: list.length,
      data: list,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve insights',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

// POST /api/insights
export const createInsight = (req: Request, res: Response): void => {
  try {
    const {
      title,
      category,
      date,
      readTime,
      author,
      authorRole,
      snippet,
      taxGuruUrl,
      tags,
      content,
      coverImage
    } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({ success: false, message: 'Insight title is required.' });
      return;
    }
    if (!snippet || !snippet.trim()) {
      res.status(400).json({ success: false, message: 'Summary / snippet is required.' });
      return;
    }
    if (!author || !author.trim()) {
      res.status(400).json({ success: false, message: 'Author name is required.' });
      return;
    }

    const currentList = ensureDataFile();

    // Generate unique slug id
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const uniqueId = `${baseSlug || 'insight'}-${Date.now().toString().slice(-4)}`;

    // Process tags
    let processedTags: string[] = [];
    if (Array.isArray(tags)) {
      processedTags = tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      processedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    // Default formatted date
    const currentDate = date?.trim() || new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    // Calculate read time if not provided
    const words = (snippet + ' ' + (content || '')).trim().split(/\s+/).length;
    const computedReadTime = readTime?.trim() || `${Math.max(3, Math.ceil(words / 150))} min read`;

    const newPost: InsightPost = {
      id: uniqueId,
      title: title.trim(),
      category: category?.trim() || 'General Regulatory',
      date: currentDate,
      readTime: computedReadTime,
      author: author.trim(),
      authorRole: authorRole?.trim() || 'Partner',
      snippet: snippet.trim(),
      taxGuruUrl: taxGuruUrl?.trim() || 'https://taxguru.com',
      tags: processedTags.length > 0 ? processedTags : ['Compliance', 'Regulatory'],
      content: content?.trim() || '',
      coverImage: coverImage?.trim() || '',
      createdAt: new Date().toISOString(),
    };

    currentList.unshift(newPost);
    const saved = saveInsights(currentList);

    if (!saved) {
      res.status(500).json({ success: false, message: 'Failed to write insight to storage.' });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Regulatory insight published successfully!',
      data: newPost,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating insight',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

// PUT /api/insights/:id
export const updateInsight = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const currentList = ensureDataFile();
    const index = currentList.findIndex((item) => item.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: `Insight with ID "${id}" not found.` });
      return;
    }

    const existing = currentList[index];
    const {
      title,
      category,
      date,
      readTime,
      author,
      authorRole,
      snippet,
      taxGuruUrl,
      tags,
      content,
      coverImage
    } = req.body;

    let processedTags = existing.tags;
    if (Array.isArray(tags)) {
      processedTags = tags.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      processedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    currentList[index] = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      category: category !== undefined ? category.trim() : existing.category,
      date: date !== undefined ? date.trim() : existing.date,
      readTime: readTime !== undefined ? readTime.trim() : existing.readTime,
      author: author !== undefined ? author.trim() : existing.author,
      authorRole: authorRole !== undefined ? authorRole.trim() : existing.authorRole,
      snippet: snippet !== undefined ? snippet.trim() : existing.snippet,
      taxGuruUrl: taxGuruUrl !== undefined ? taxGuruUrl.trim() : existing.taxGuruUrl,
      tags: processedTags,
      content: content !== undefined ? content.trim() : existing.content,
      coverImage: coverImage !== undefined ? coverImage.trim() : existing.coverImage,
    };

    saveInsights(currentList);
    res.json({
      success: true,
      message: 'Insight updated successfully!',
      data: currentList[index],
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to update insight',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

// DELETE /api/insights/:id
export const deleteInsight = (req: Request, res: Response): void => {
  try {
    const { id } = req.params;
    const currentList = ensureDataFile();
    const filtered = currentList.filter((item) => item.id !== id);

    if (filtered.length === currentList.length) {
      res.status(404).json({ success: false, message: `Insight with ID "${id}" not found.` });
      return;
    }

    saveInsights(filtered);
    res.json({
      success: true,
      message: 'Insight deleted successfully!',
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete insight',
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
