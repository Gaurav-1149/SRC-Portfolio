import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FolderOpen,
  LogOut,
  Search,
  Filter,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  // Status feedback & filters
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
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
      setFeedback({ type: 'error', message: 'Please provide both title and executive summary.' });
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
          taxGuruUrl: taxGuruUrl.trim() || 'https://taxguru.in',
          tags,
          content: content.trim(),
        });
        setInsights((prev) => prev.map((item) => (item.id === editingId ? updated : item)));
        setFeedback({ type: 'success', message: `Article "${updated.title}" updated successfully!` });
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
          taxGuruUrl: taxGuruUrl.trim() || 'https://taxguru.in',
          tags,
          content: content.trim(),
        });
        setInsights((prev) => [created, ...prev]);
        setFeedback({ type: 'success', message: 'New regulatory insight published successfully to public website!' });
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
      setFeedback({ type: 'success', message: 'Article permanently removed from website.' });
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Failed to delete insight.' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const filteredInsights = insights.filter((post) => {
    const q = searchFilter.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));

    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(insights.map((i) => i.category))).length;
  const uniqueAuthors = Array.from(new Set(insights.map((i) => i.author))).length;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col font-sans">
      
      {/* 1. TOP ADMIN CONTROL HEADER */}
      <header className="bg-gray-900/90 border-b border-gray-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Portal Tag */}
          <div className="flex items-center gap-4">
            <Link to="/home" className="bg-white p-2 rounded-xl shadow border border-gray-200/20 hover:opacity-90 transition-opacity">
              <img src="/images/logo.png" alt="SRC Logo" className="h-10 w-auto object-contain" />
            </Link>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white tracking-tight">Singhal Rakesh & Co.</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#8AC926] px-2 py-0.5 rounded">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-gray-400">Statutory Insights & Website Publishing Center</p>
            </div>
          </div>

          {/* Action Links & Admin Profile */}
          <div className="flex items-center gap-3">
            {/* View Public Insights */}
            <Link
              to="/insight"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3.5 py-2 rounded-lg border border-gray-700 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#8AC926]" />
              <span>Public Page</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </Link>

            {/* Back to Website */}
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>

            {/* User Badge */}
            <div className="flex items-center gap-2 bg-gray-950 px-3 py-1.5 rounded-lg border border-gray-800">
              <div className="w-6 h-6 rounded-full bg-[#8AC926]/20 text-[#8AC926] flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-gray-200">{user?.username || 'SRCAdmin'}</div>
                <div className="text-[10px] text-gray-500">Super Admin</div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/60 px-3 py-2 rounded-lg text-xs font-bold transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN ADMIN BODY */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800/80 shadow-md flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Live Articles</div>
              <div className="text-2xl font-black text-[#8AC926] mt-1">{insights.length}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#8AC926]" />
            </div>
          </div>

          <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800/80 shadow-md flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Active Verticals</div>
              <div className="text-2xl font-black text-white mt-1">{uniqueCategories}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-sky-400" />
            </div>
          </div>

          <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800/80 shadow-md flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">CA Authors</div>
              <div className="text-2xl font-black text-white mt-1">{uniqueAuthors}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center">
              <User className="w-6 h-6 text-purple-400" />
            </div>
          </div>

          <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800/80 shadow-md flex items-center justify-between">
            <div>
              <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">System Sync</div>
              <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active & Live</span>
              </div>
            </div>
            <button
              onClick={loadInsights}
              title="Refresh repository"
              className="w-12 h-12 rounded-xl bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-[#8AC926]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs font-medium flex items-center justify-between border shadow-lg ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700'
                : 'bg-red-950/80 text-red-200 border-red-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800/50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('create')}
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'create'
                  ? 'bg-[#8AC926] text-black shadow-lg shadow-[#8AC926]/20'
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{editingId ? 'Edit Selected Article' : 'Publish New Insight'}</span>
            </button>

            <button
              onClick={() => setActiveTab('list')}
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === 'list'
                  ? 'bg-[#8AC926] text-black shadow-lg shadow-[#8AC926]/20'
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Article Repository ({insights.length})</span>
            </button>
          </div>

          {editingId && activeTab === 'create' && (
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel Editing</span>
            </button>
          )}
        </div>

        {/* TAB 1: PUBLISH / EDIT INSIGHT */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-gray-900/90 p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-xl space-y-6">
              <div className="border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8AC926] uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Revision Mode' : 'Content Management System'}</span>
                </div>
                <h2 className="text-xl font-black text-white">
                  {editingId ? 'Edit Regulatory Article' : 'Compose Regulatory Insight'}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Articles published here appear in real-time on the firm's public regulatory insights page.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Article Title */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Critical Implications of Section 12AB Registration for Charitable Trusts"
                    className="w-full text-sm px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926] focus:border-transparent transition-all"
                  />
                </div>

                {/* 2. Practice Vertical & Date */}
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
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#8AC926] focus:border-transparent transition-all"
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="CUSTOM">+ Add Custom Vertical...</option>
                    </select>

                    {isCustomCategory && (
                      <input
                        type="text"
                        required
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Enter custom vertical name"
                        className="mt-2 w-full text-xs px-3.5 py-2 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
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
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* 3. Author & Designation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Contributing Partner / Author *
                    </label>
                    <select
                      value={author}
                      onChange={(e) => handleAuthorChange(e.target.value)}
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
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
                      Author Designation
                    </label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Founder & Managing Partner"
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* 4. Read Time & External URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="e.g. 6 min read"
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
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
                      placeholder="https://taxguru.in/chartered-accountant/..."
                      className="w-full text-sm px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                  </div>
                </div>

                {/* 5. Executive Summary */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                      Executive Summary / Synopsis *
                    </label>
                    <span className="text-[11px] text-gray-500">{snippet.length} characters</span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={snippet}
                    onChange={(e) => setSnippet(e.target.value)}
                    placeholder="Provide a concise 2-3 sentence overview highlighting statutory implications and core takeaways for corporate taxpayers..."
                    className="w-full text-sm px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926] leading-relaxed"
                  />
                </div>

                {/* 6. Regulatory Tags */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                    Regulatory Tags / Search Keywords
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
                      placeholder="Type tag (e.g. 'CBDT Circular') and press Enter"
                      className="flex-grow text-xs px-3.5 py-2.5 rounded-lg bg-gray-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-gray-800 hover:bg-gray-700 text-xs text-white px-4 py-2.5 rounded-lg border border-gray-700 font-bold uppercase tracking-wider transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 text-xs bg-gray-800 border border-gray-700 text-gray-200 px-3 py-1 rounded-lg"
                      >
                        <Tag className="w-3 h-3 text-[#8AC926]" />
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-red-400 font-bold ml-1 text-sm leading-none"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* 7. Action Submission Buttons */}
                <div className="pt-4 border-t border-gray-800 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#8AC926] hover:bg-[#78b31f] text-black font-black py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-[#8AC926]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Article...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingId ? 'Save & Update Article' : 'Publish Article to Website'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-5 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Sticky Public Card Live Preview */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#8AC926] uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Live Public Card Preview</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">1:1 Replica</span>
              </div>

              {/* Exact Public Website Replica Card (Matching Insights.tsx) */}
              <div className="bg-white rounded-2xl border-2 border-[#8AC926] overflow-hidden shadow-2xl flex flex-col justify-between text-gray-900 group transition-all">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-[#8AC926] bg-[#8AC926]/10 px-2.5 py-0.5 rounded">
                      {isCustomCategory ? customCategory || 'Practice Vertical' : category}
                    </span>
                    <span className="text-gray-400 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{readTime || '6 min read'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {title || 'Article Title Will Appear Here'}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {snippet || 'Summary and briefing overview will be displayed here in this card body on the public insights page...'}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 mt-2 bg-gray-50/50 flex items-center justify-between">
                  <div className="text-[11px] text-gray-500 font-medium">
                    By {author}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-black group-hover:text-[#8AC926] transition-colors">
                    <span>Read on TaxGuru</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8AC926]" />
                  </div>
                </div>
              </div>

              {/* Compliance Note */}
              <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 text-xs text-gray-400 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-gray-200">
                  <ShieldCheck className="w-4 h-4 text-[#8AC926]" />
                  <span>ICAI & Fiduciary Compliance</span>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-400">
                  All articles published through this executive portal conform to ICAI guidelines for statutory knowledge dissemination and corporate compliance transparency.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MANAGE ALL INSIGHTS */}
        {activeTab === 'list' && (
          <div className="bg-gray-900/90 rounded-2xl border border-gray-800 p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Firm Insights Repository</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Showing {filteredInsights.length} of {insights.length} total articles
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by title, author, tag..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl bg-gray-950 border border-gray-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  />
                  {searchFilter && (
                    <button
                      onClick={() => setSearchFilter('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Category Dropdown Filter */}
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gray-950 border border-gray-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#8AC926]"
                  >
                    <option value="All">All Categories ({insights.length})</option>
                    {Array.from(new Set(insights.map((i) => i.category))).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Content Table / Card List */}
            {loading ? (
              <div className="py-20 text-center text-gray-400 text-sm">
                <div className="w-8 h-8 border-3 border-[#8AC926] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                Loading insights repository...
              </div>
            ) : filteredInsights.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-sm bg-gray-950/50 rounded-2xl border border-gray-800/80">
                <Filter className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p>No published articles matched your search filter.</p>
                {(searchFilter || categoryFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchFilter('');
                      setCategoryFilter('All');
                    }}
                    className="mt-3 text-xs text-[#8AC926] font-semibold underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInsights.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-950/80 p-5 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-black bg-[#8AC926] px-2.5 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                        <span className="text-xs text-gray-500">• {post.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-white hover:text-[#8AC926] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {post.snippet}
                      </p>
                      <div className="text-[11px] text-gray-400">
                        Author: <span className="text-gray-200 font-bold">{post.author}</span>{' '}
                        <span className="text-gray-500">({post.authorRole})</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-800">
                      {post.taxGuruUrl && (
                        <a
                          href={post.taxGuruUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                          title="Open TaxGuru link"
                        >
                          <ExternalLink className="w-4 h-4 text-[#8AC926]" />
                        </a>
                      )}

                      <button
                        onClick={() => handleEditClick(post)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#8AC926]" />
                        <span>Edit</span>
                      </button>

                      {deleteConfirmId === post.id ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2.5 py-2 rounded-xl bg-gray-800 text-xs text-gray-300 hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(post.id)}
                          className="p-2.5 rounded-xl bg-gray-800 hover:bg-red-950/60 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-900/60 transition-colors"
                          title="Delete article"
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

      </main>
    </div>
  );
};
