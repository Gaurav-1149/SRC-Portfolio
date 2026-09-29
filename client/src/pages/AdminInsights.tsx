import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  List,
  CheckCircle2,
  Trash2,
  Edit3,
  ExternalLink,
  ArrowLeft,
  Clock,
  Tag,
  User,
  ShieldCheck,
  AlertCircle,
  Eye,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import {
  fetchAllInsights,
  createNewInsight,
  updateExistingInsight,
  deleteExistingInsight,
  InsightPost,
} from '../services/insightsService.js';

const DEFAULT_CATEGORIES = [
  'Income Tax',
  'GST Law',
  'Audit & Assurance',
  'FCRA & Non-Profit',
  'NCLT & Corporate Law',
  'International Tax',
  'Corporate Governance',
  'FEMA & RBI Regulations',
];

const AUTHORS_LIST = [
  { name: 'CA. Rakesh Singhal', role: 'Founder & Managing Partner' },
  { name: 'CA. Atul Singhal', role: 'Partner (Assurance & US Audit)' },
  { name: 'CA. Shruti Garg', role: 'Partner (Tax Litigation)' },
];

export const AdminInsights: React.FC = () => {
  const [insights, setInsights] = useState<InsightPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [author, setAuthor] = useState(AUTHORS_LIST[0].name);
  const [authorRole, setAuthorRole] = useState(AUTHORS_LIST[0].role);
  const [date, setDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });
  const [readTime, setReadTime] = useState('6 min read');
  const [snippet, setSnippet] = useState('');
  const [taxGuruUrl, setTaxGuruUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Direct Tax', 'ICAI']);
  const [content, setContent] = useState('');

  // Status feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setLoading(true);
    try {
      const data = await fetchAllInsights();
      setInsights(data);
    } catch (err) {
      console.error('Failed to load insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorChange = (selectedName: string) => {
    setAuthor(selectedName);
    const matched = AUTHORS_LIST.find((a) => a.name === selectedName);
    if (matched) {
      setAuthorRole(matched.role);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setCategory(DEFAULT_CATEGORIES[0]);
    setIsCustomCategory(false);
    setCustomCategory('');
    setAuthor(AUTHORS_LIST[0].name);
    setAuthorRole(AUTHORS_LIST[0].role);
    setDate(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    setReadTime('6 min read');
    setSnippet('');
    setTaxGuruUrl('');
    setTagInput('');
    setTags(['Compliance', 'Audit']);
    setContent('');
    setEditingId(null);
    setFeedback(null);
  };

  const handleEditClick = (post: InsightPost) => {
    setEditingId(post.id);
    setTitle(post.title);
    if (DEFAULT_CATEGORIES.includes(post.category)) {
      setCategory(post.category);
      setIsCustomCategory(false);
    } else {
      setIsCustomCategory(true);
      setCustomCategory(post.category);
    }
    setAuthor(post.author);
    setAuthorRole(post.authorRole);
    setDate(post.date);
    setReadTime(post.readTime);
    setSnippet(post.snippet);
    setTaxGuruUrl(post.taxGuruUrl || '');
    setTags(post.tags || []);
    setContent(post.content || '');
    setActiveTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !snippet.trim()) {
      setFeedback({ type: 'error', message: 'Please provide both title and summary.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const effectiveCategory = isCustomCategory ? customCategory.trim() || 'General' : category;

    try {
      if (editingId) {
        // Update existing
        const updated = await updateExistingInsight(editingId, {
          title: title.trim(),
          category: effectiveCategory,
          author: author.trim(),
          authorRole: authorRole.trim(),
          date: date.trim(),
          readTime: readTime.trim(),
          snippet: snippet.trim(),
          taxGuruUrl: taxGuruUrl.trim() || 'https://taxguru.com',
          tags,
          content: content.trim(),
        });
        setInsights((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
        setFeedback({ type: 'success', message: 'Regulatory insight updated successfully!' });
        resetForm();
      } else {
        // Create new
        const created = await createNewInsight({
          title: title.trim(),
          category: effectiveCategory,
          author: author.trim(),
          authorRole: authorRole.trim(),
          date: date.trim(),
          readTime: readTime.trim(),
          snippet: snippet.trim(),
          taxGuruUrl: taxGuruUrl.trim() || 'https://taxguru.com',
          tags,
          content: content.trim(),
        });
        setInsights((prev) => [created, ...prev]);
        setFeedback({ type: 'success', message: 'New regulatory insight published successfully to website!' });
        resetForm();
      }
    } catch (err: unknown) {
      setFeedback({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to publish insight. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExistingInsight(id);
      setInsights((prev) => prev.filter((item) => item.id !== id));
      setDeleteConfirmId(null);
      setFeedback({ type: 'success', message: 'Insight deleted successfully.' });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to delete insight.' });
    }
  };

  const filteredInsights = insights.filter((post) => {
    const q = searchFilter.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const uniqueCategories = Array.from(new Set(insights.map((i) => i.category))).length;
  const uniqueAuthors = Array.from(new Set(insights.map((i) => i.author))).length;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8AC926] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Singhal Rakesh & Co. • Executive Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>Regulatory Insights Admin Portal</span>
            </h1>
            <p className="text-xs text-gray-400">
              Manage statutory briefings, tax advisories, and thought leadership articles published on the firm's website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/insight"
              target="_blank"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold px-4 py-2.5 rounded-lg border border-gray-700 transition-colors"
            >
              <Eye className="w-4 h-4 text-[#8AC926]" />
              <span>View Public Page</span>
            </Link>
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-gray-950/80 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Published Articles</div>
              <div className="text-2xl font-black text-[#8AC926] mt-1">{insights.length}</div>
            </div>
            <FileText className="w-8 h-8 text-gray-600" />
          </div>

          <div className="bg-gray-950/80 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Practice Categories</div>
              <div className="text-2xl font-black text-[#8AC926] mt-1">{uniqueCategories}</div>
            </div>
            <FolderOpen className="w-8 h-8 text-gray-600" />
          </div>

          <div className="bg-gray-950/80 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Contributing Partners</div>
              <div className="text-2xl font-black text-[#8AC926] mt-1">{uniqueAuthors}</div>
            </div>
            <User className="w-8 h-8 text-gray-600" />
          </div>

          <div className="bg-gray-950/80 p-5 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Storage Sync</div>
              <div className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live Active</span>
              </div>
            </div>
            <RefreshCw className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#8AC926]" onClick={loadInsights} />
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              feedback.type === 'success'
                ? 'bg-emerald-950/60 text-emerald-200 border-emerald-800'
                : 'bg-red-950/60 text-red-200 border-red-800'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-gray-400 hover:text-white text-xs underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
          <button
            onClick={() => setActiveTab('create')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-wider ${
              activeTab === 'create'
                ? 'bg-[#8AC926] text-black shadow-lg shadow-[#8AC926]/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{editingId ? 'Edit Selected Insight' : 'Upload New Insight'}</span>
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-wider ${
              activeTab === 'list'
                ? 'bg-[#8AC926] text-black shadow-lg shadow-[#8AC926]/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Manage All Published Insights ({insights.length})</span>
          </button>
        </div>

        {/* TAB 1: UPLOAD / EDIT INSIGHT */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-gray-950 p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-xl space-y-6">
              <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingId ? 'Edit Article Details' : 'Publish New Regulatory Insight'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Fill out the fields below. Published insights appear instantly on the public website.
                  </p>
                </div>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md border border-gray-700"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Analysis of Section 12AB Registration Criteria under Direct Tax"
                    className="w-full text-sm px-4 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Practice Vertical *
                    </label>
                    <select
                      value={isCustomCategory ? 'CUSTOM' : category}
                      onChange={(e) => {
                        if (e.target.value === 'CUSTOM') {
                          setIsCustomCategory(true);
                        } else {
                          setIsCustomCategory(false);
                          setCategory(e.target.value);
                        }
                      }}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="CUSTOM">+ Custom Vertical...</option>
                    </select>

                    {isCustomCategory && (
                      <input
                        type="text"
                        required
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom category name"
                        className="mt-2 w-full text-xs px-3.5 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Publication Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. March 2026"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* Author & Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Contributing Author *
                    </label>
                    <select
                      value={author}
                      onChange={(e) => handleAuthorChange(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    >
                      {AUTHORS_LIST.map((a) => (
                        <option key={a.name} value={a.name}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Author Role / Designation
                    </label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Founder & Managing Partner"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* Read Time & External Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 7 min read"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      TaxGuru / External Article URL
                    </label>
                    <input
                      type="url"
                      value={taxGuruUrl}
                      onChange={(e) => setTaxGuruUrl(e.target.value)}
                      placeholder="https://taxguru.com/chartered-accountant/..."
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* Summary / Snippet */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Executive Summary / Snippet *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={snippet}
                    onChange={(e) => setSnippet(e.target.value)}
                    placeholder="Provide a concise 2-3 sentence overview highlighting statutory implications and core takeaways for corporate taxpayers..."
                    className="w-full text-sm px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926] leading-relaxed"
                  />
                </div>

                {/* Regulatory Tags */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Regulatory Tags / Keywords
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag (e.g. 'Section 80IA') and press Enter"
                      className="flex-grow text-xs px-3.5 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-gray-800 hover:bg-gray-700 text-xs text-white px-4 py-2 rounded-lg border border-gray-700 font-semibold"
                    >
                      Add Tag
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-xs bg-gray-800 border border-gray-700 text-gray-300 px-2.5 py-1 rounded-md"
                      >
                        <Tag className="w-3 h-3 text-[#8AC926]" />
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-red-400 font-bold ml-1 text-xs"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional Extended Content / Body */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Detailed Notes / Legal Provisions (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Optional in-depth legal commentary, circular citations, or statutory provisions..."
                    className="w-full text-sm px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-800 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#8AC926] hover:bg-[#78b31f] text-black font-extrabold py-3.5 px-6 rounded-lg text-sm uppercase tracking-wider shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      <span>Saving Insight...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingId ? 'Update & Save Changes' : 'Upload & Publish to Website'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-5 py-3.5 rounded-lg text-sm transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8AC926] uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Real-time Public Card Preview</span>
                </span>
                <span className="text-[10px] text-gray-400">Live Website Replica</span>
              </div>

              {/* Replica Public Card */}
              <div className="bg-white rounded-2xl border-2 border-[#8AC926] overflow-hidden shadow-2xl flex flex-col justify-between text-gray-900 group">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-[#8AC926] bg-[#8AC926]/10 px-2.5 py-0.5 rounded">
                      {isCustomCategory ? customCategory || 'Custom Vertical' : category}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{readTime || '5 min read'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {title || 'Article Title Will Appear Here'}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {snippet || 'Summary and briefing overview will be displayed here in this card body on the public insights page...'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {tags.length > 0 ? (
                      tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                        >
                          #{t}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-gray-400">#NoTags</span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-2 bg-gray-50/50 flex items-center justify-between">
                  <div className="text-[11px] text-gray-500 font-medium">
                    By {author}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#8AC926]">
                    <span>Read on TaxGuru</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8AC926]" />
                  </div>
                </div>
              </div>

              <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-gray-400 space-y-2">
                <div className="font-bold text-gray-200">ICAI & Fiduciary Compliance Note:</div>
                <p>
                  Articles uploaded through this portal are formatted strictly according to ICAI ethical guidelines for professional knowledge dissemination and public statutory transparency.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE ALL INSIGHTS */}
        {activeTab === 'list' && (
          <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">All Published Regulatory Insights</h2>
                <p className="text-xs text-gray-400">Total {insights.length} active articles in firm repository</p>
              </div>

              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by title, author, vertical..."
                className="w-full sm:w-72 text-xs px-3.5 py-2.5 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
              />
            </div>

            {loading ? (
              <div className="py-16 text-center text-gray-400 text-sm">
                Loading insights repository...
              </div>
            ) : filteredInsights.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-sm">
                No insights found matching your search.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInsights.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-gray-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-black bg-[#8AC926] px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                        <span className="text-xs text-gray-500">• {post.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-white hover:text-[#8AC926] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {post.snippet}
                      </p>
                      <div className="text-[11px] text-gray-400">
                        Author: <span className="text-gray-200 font-semibold">{post.author}</span> ({post.authorRole})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                      {post.taxGuruUrl && (
                        <a
                          href={post.taxGuruUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          title="View external link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      
                      <button
                        onClick={() => handleEditClick(post)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#8AC926]" />
                        <span>Edit</span>
                      </button>

                      {deleteConfirmId === post.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2 py-1.5 rounded-lg bg-gray-800 text-xs text-gray-300"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(post.id)}
                          className="p-2 rounded-lg bg-gray-800 hover:bg-red-950/60 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete insight"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
