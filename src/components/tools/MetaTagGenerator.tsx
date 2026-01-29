'use client';

import { useState, useCallback, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  Globe, 
  ArrowLeft,
  Tag,
  X,
  AlertCircle,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  Link,
  FileText,
  AlignLeft,
  RefreshCw,
  Download,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Platform icons as simple components
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Toast Component
interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: number) => void }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                : toast.type === 'error'
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : toast.type === 'warning'
                ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4 h-4" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
            {toast.type === 'warning' && <AlertCircle className="w-4 h-4" />}
            {toast.type === 'info' && <Sparkles className="w-4 h-4" />}
            <span className="text-sm">{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-0.5 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

// Custom scrollbar styles
const customScrollbarClass = `
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-700
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-600
`;

const tabs = [
  { id: 'google', label: 'Google', icon: Globe },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { id: 'twitter', label: 'Twitter/X', icon: TwitterIcon },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon },
];

const defaultData = {
  title: 'My Awesome Website',
  description: 'The best website for developer tools and resources. Build faster with our curated collection of utilities.',
  url: 'https://mysite.com',
  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop',
  siteName: 'My Site',
  twitterHandle: '@mysite'
};

export default function MetaTagGenerator() {
  const [activeTab, setActiveTab] = useState('google');
  const [data, setData] = useState(defaultData);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { toasts, addToast, removeToast } = useToast();

  // Validation
  const validation = useMemo(() => {
    const issues: string[] = [];
    if (data.title.length > 60) issues.push('Title exceeds 60 characters');
    if (data.title.length < 10) issues.push('Title is too short');
    if (data.description.length > 160) issues.push('Description exceeds 160 characters');
    if (data.description.length < 50) issues.push('Description is too short');
    if (!data.url.startsWith('http')) issues.push('URL should start with http:// or https://');
    if (!data.image) issues.push('Image URL is missing');
    return issues;
  }, [data]);

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'example.com';
    }
  };

  const generateHTML = () => {
    const hostname = getHostname(data.url);
    return `<!-- Primary Meta Tags -->
<title>${data.title}</title>
<meta name="title" content="${data.title}">
<meta name="description" content="${data.description}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${data.url}">
<meta property="og:title" content="${data.title}">
<meta property="og:description" content="${data.description}">
<meta property="og:image" content="${data.image}">
<meta property="og:site_name" content="${data.siteName}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${data.url}">
<meta property="twitter:title" content="${data.title}">
<meta property="twitter:description" content="${data.description}">
<meta property="twitter:image" content="${data.image}">
${data.twitterHandle ? `<meta property="twitter:site" content="${data.twitterHandle}">` : ''}

<!-- LinkedIn -->
<meta property="og:locale" content="en_US">
<meta name="author" content="${data.siteName}">

<!-- Canonical -->
<link rel="canonical" href="${data.url}">`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopied(true);
      addToast('Meta tags copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Failed to copy', 'error');
    }
  };

  const handleDownload = () => {
    const content = generateHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meta-tags.html';
    link.click();
    URL.revokeObjectURL(url);
    addToast('Meta tags downloaded!', 'success');
  };

  const handleReset = () => {
    setData(defaultData);
    setImageError(false);
    addToast('Reset to defaults', 'info');
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Compact Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.a
            href="/"
            className="flex items-center gap-2 text-sm text-[var(--accent-muted)] hover:text-white transition-colors"
            whileHover={{ x: -2 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to tools
          </motion.a>
          <div className="h-4 w-px bg-[var(--border-color)]" />
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[var(--accent)]/10 rounded-lg">
              <Tag className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Meta Tag Generator</h1>
              <p className="text-xs text-[var(--accent-muted)]">SEO & Social media meta tags</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.3 }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </motion.button>

          <motion.button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </motion.button>

          <motion.button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--accent)] text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy HTML'}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Form */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--accent)]" />
                Page Details
              </span>
              {validation.length > 0 && (
                <span className="text-xs text-yellow-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validation.length} issue{validation.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5" />
                  Title
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'title' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="text"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter page title..."
                  />
                </motion.div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-[var(--accent-muted)]">Recommended: 50-60 characters</span>
                  <span className={`text-xs font-mono ${
                    data.title.length > 60 ? 'text-red-400' : data.title.length >= 40 ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {data.title.length}/60
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  <AlignLeft className="w-3.5 h-3.5" />
                  Description
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'description' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  {/* FIX: Added data-lenis-prevent to fix scroll issue */}
                  <textarea
                    data-lenis-prevent
                    className={`w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none resize-none min-h-[80px] ${customScrollbarClass}`}
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter page description..."
                  />
                </motion.div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-xs text-[var(--accent-muted)]">Recommended: 120-160 characters</span>
                  <span className={`text-xs font-mono ${
                    data.description.length > 160 ? 'text-red-400' : data.description.length >= 100 ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {data.description.length}/160
                  </span>
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  <Link className="w-3.5 h-3.5" />
                  Website URL
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'url' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="url"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={data.url}
                    onChange={(e) => setData({ ...data, url: e.target.value })}
                    onFocus={() => setFocusedField('url')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="https://example.com"
                  />
                </motion.div>
              </div>

              {/* Image URL */}
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Image URL
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded">1200×630 recommended</span>
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'image' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : imageError ? 'border-red-500/50' : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="url"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    value={data.image}
                    onChange={(e) => { setData({ ...data, image: e.target.value }); setImageError(false); }}
                    onFocus={() => setFocusedField('image')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </motion.div>
                {imageError && (
                  <span className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Image failed to load
                  </span>
                )}
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    Site Name
                  </label>
                  <motion.div
                    className={`relative rounded-lg border transition-all ${
                      focusedField === 'siteName' 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      value={data.siteName}
                      onChange={(e) => setData({ ...data, siteName: e.target.value })}
                      onFocus={() => setFocusedField('siteName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="My Site"
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    Twitter Handle
                  </label>
                  <motion.div
                    className={`relative rounded-lg border transition-all ${
                      focusedField === 'twitter' 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      value={data.twitterHandle}
                      onChange={(e) => setData({ ...data, twitterHandle: e.target.value })}
                      onFocus={() => setFocusedField('twitter')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="@username"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Issues */}
          <AnimatePresence>
            {validation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl"
              >
                <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-2">
                  <AlertCircle className="w-4 h-4" />
                  SEO Recommendations
                </div>
                <ul className="space-y-1">
                  {validation.map((issue, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-xs text-yellow-200/80 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-yellow-400" />
                      {issue}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Output */}
          <div className="bg-[#0d1117] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
              <span className="text-sm font-mono text-[var(--accent-muted)] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Generated HTML
              </span>
            </div>
            {/* FIX: Added data-lenis-prevent to fix scroll issue */}
            <div 
              data-lenis-prevent
              className={`p-4 max-h-[200px] overflow-auto ${customScrollbarClass}`}
            >
              <pre className="text-xs font-mono text-gray-400 whitespace-pre-wrap">
                {generateHTML().split('\n').map((line, i) => (
                  <div key={i} className={line.startsWith('<!--') ? 'text-gray-600' : line.startsWith('<meta') || line.startsWith('<title') || line.startsWith('<link') ? 'text-green-400' : ''}>
                    {line}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Preview Panel */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Preview Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4 text-[var(--accent)]" />
              Live Preview
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)]">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-[var(--accent)] text-black'
                      : 'text-[var(--accent-muted)] hover:text-white hover:bg-white/5'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Preview Container - FIX: Changed bg-gray-100 to dark background */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0a0a0a] border border-[var(--border-color)] rounded-xl p-6 min-h-[400px] flex items-center justify-center"
            >
              {/* Google Preview - FIX: Updated to Dark Mode styles */}
              {activeTab === 'google' && (
                <div className="w-full max-w-[600px] bg-[#202124] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-7 h-7 bg-[#303134] rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-[#dadce0] font-medium">{data.siteName || 'Website'}</span>
                      <span className="text-xs text-[#bdc1c6]">{data.url}</span>
                    </div>
                  </div>
                  <h3 className="text-xl text-[#8ab4f8] hover:underline cursor-pointer mb-1 leading-snug line-clamp-1">
                    {data.title || 'Page Title'}
                  </h3>
                  <p className="text-sm text-[#bdc1c6] leading-relaxed line-clamp-2">
                    {data.description || 'Page description goes here...'}
                  </p>
                </div>
              )}

              {/* Facebook Preview - FIX: Updated to Dark Mode styles */}
              {activeTab === 'facebook' && (
                <div className="w-full max-w-[500px] bg-[#242526] border border-[#393a3b] rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-[1.91/1] bg-[#3a3b3c] relative">
                    <img 
                      src={data.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#3a3b3c]">
                        <ImageIcon className="w-12 h-12 text-[#b0b3b8]" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-[#242526] border-t border-[#393a3b]">
                    <div className="text-xs text-[#b0b3b8] uppercase mb-1 truncate">
                      {getHostname(data.url)}
                    </div>
                    <h3 className="text-base font-semibold text-[#e4e6eb] leading-tight mb-1 line-clamp-2">
                      {data.title}
                    </h3>
                    <p className="text-sm text-[#b0b3b8] line-clamp-1">
                      {data.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Twitter Preview - FIX: Updated to Dark Mode styles */}
              {activeTab === 'twitter' && (
                <div className="w-full max-w-[500px] bg-black border border-gray-800 rounded-2xl overflow-hidden shadow-sm">
                  <div className="aspect-[2/1] bg-[#202327] relative">
                    <img 
                      src={data.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#202327]">
                        <ImageIcon className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-800">
                    <h3 className="text-base font-bold text-[#e7e9ea] leading-tight mb-0.5 line-clamp-1">
                      {data.title}
                    </h3>
                    <p className="text-sm text-[#71767b] line-clamp-2 mb-1">
                      {data.description}
                    </p>
                    <div className="text-sm text-[#71767b] flex items-center gap-1">
                      <Link className="w-3 h-3" />
                      {getHostname(data.url)}
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn Preview - FIX: Updated to Dark Mode styles */}
              {activeTab === 'linkedin' && (
                <div className="w-full max-w-[500px] bg-[#1d2226] border border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-[1.91/1] bg-[#1d2226] relative">
                    <img 
                      src={data.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#1d2226]">
                        <ImageIcon className="w-12 h-12 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-[#1d2226]">
                    <h3 className="text-sm font-semibold text-white/90 leading-tight mb-1 line-clamp-2">
                      {data.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 mb-1">
                      {data.description}
                    </p>
                    <div className="text-xs text-white/40">
                      {getHostname(data.url)}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              Quick Tips
            </div>
            <ul className="space-y-1.5 text-xs text-blue-200/80">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Use images with 1200×630 pixels for best results
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Keep titles under 60 characters for Google
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Descriptions should be 120-160 characters
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Test your URLs with platform debuggers after implementation
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}