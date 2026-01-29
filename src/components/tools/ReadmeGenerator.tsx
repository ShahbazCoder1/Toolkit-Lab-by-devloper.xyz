'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  ArrowLeft, 
  FileText,
  X,
  AlertCircle,
  Sparkles,
  Plus,
  Trash2,
  Code,
  User,
  Shield,
  BookOpen,
  Terminal,
  Package,
  Github,
  Star,
  GitFork,
  Eye,
  ChevronDown,
  ChevronUp,
  Zap,
  GripVertical
} from 'lucide-react';

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

// License options
const licenses = [
  { id: 'MIT', name: 'MIT License' },
  { id: 'Apache-2.0', name: 'Apache 2.0' },
  { id: 'GPL-3.0', name: 'GPL 3.0' },
  { id: 'BSD-3-Clause', name: 'BSD 3-Clause' },
  { id: 'ISC', name: 'ISC' },
  { id: 'Unlicense', name: 'Unlicense' },
];

// Badge templates
const badgeTemplates = [
  { id: 'npm', label: 'npm version', template: '![npm](https://img.shields.io/npm/v/{package})' },
  { id: 'license', label: 'License', template: '![License](https://img.shields.io/badge/license-{license}-blue)' },
  { id: 'stars', label: 'GitHub Stars', template: '![GitHub stars](https://img.shields.io/github/stars/{username}/{repo})' },
  { id: 'forks', label: 'GitHub Forks', template: '![GitHub forks](https://img.shields.io/github/forks/{username}/{repo})' },
  { id: 'issues', label: 'GitHub Issues', template: '![GitHub issues](https://img.shields.io/github/issues/{username}/{repo})' },
  { id: 'build', label: 'Build Status', template: '![Build Status](https://img.shields.io/github/actions/workflow/status/{username}/{repo}/ci.yml)' },
];

// Section templates
const sectionTemplates = [
  { id: 'features', title: 'Features', icon: Zap, emoji: '✨' },
  { id: 'demo', title: 'Demo', icon: Eye, emoji: '🎬' },
  { id: 'api', title: 'API Reference', icon: Code, emoji: '📖' },
  { id: 'roadmap', title: 'Roadmap', icon: GitFork, emoji: '🗺️' },
  { id: 'faq', title: 'FAQ', icon: BookOpen, emoji: '❓' },
  { id: 'acknowledgments', title: 'Acknowledgments', icon: Star, emoji: '🙏' },
];

interface Feature {
  id: string;
  text: string;
}

interface ExtraSection {
  id: string;
  title: string;
  content: string;
  emoji: string;
}

interface FormData {
  title: string;
  description: string;
  installation: string;
  usage: string;
  contributing: string;
  license: string;
  author: string;
  githubUsername: string;
  repoName: string;
  features: Feature[];
  badges: string[];
  extraSections: ExtraSection[];
}

const defaultFormData: FormData = {
  title: '',
  description: '',
  installation: 'npm install my-project',
  usage: 'npm start',
  contributing: 'Contributions are welcome! Please feel free to submit a Pull Request.',
  license: 'MIT',
  author: '',
  githubUsername: '',
  repoName: '',
  features: [],
  badges: [],
  extraSections: []
};

// Draggable Section Component
interface DraggableSectionProps {
  section: ExtraSection;
  onRemove: (id: string) => void;
  onUpdateContent: (id: string, content: string) => void;
}

const DraggableSection = ({ section, onRemove, onUpdateContent }: DraggableSectionProps) => {
  const template = sectionTemplates.find(s => s.id === section.id);
  const Icon = template?.icon || BookOpen;
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={section}
      id={section.id}
      dragListener={false}
      dragControls={dragControls}
      className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        zIndex: 50
      }}
    >
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--card-bg)]">
        <div className="flex items-center gap-2">
          <motion.div
            className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-[var(--accent-muted)] hover:text-white rounded transition-colors"
            onPointerDown={(e) => dragControls.start(e)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <GripVertical className="w-4 h-4" />
          </motion.div>
          <Icon className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-medium">{section.title}</span>
        </div>
        <motion.button
          onClick={() => onRemove(section.id)}
          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
      <div className="p-4">
        <textarea
          className={`w-full bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--accent)] resize-none min-h-[80px] ${customScrollbarClass}`}
          placeholder={`Enter ${section.title.toLowerCase()} content...`}
          value={section.content}
          onChange={(e) => onUpdateContent(section.id, e.target.value)}
        />
      </div>
    </Reorder.Item>
  );
};

export default function ReadmeGenerator() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);
  const [newFeature, setNewFeature] = useState('');

  const { toasts, addToast, removeToast } = useToast();
  
  // Refs for manual scroll
  const previewRef = useRef<HTMLDivElement>(null);

  // Handle wheel event manually for Lenis compatibility
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const container = e.currentTarget;
    container.scrollTop += e.deltaY;
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFormData({
      ...formData,
      features: [...formData.features, { id: Date.now().toString(), text: newFeature.trim() }]
    });
    setNewFeature('');
    addToast('Feature added', 'success');
  };

  const removeFeature = (id: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter(f => f.id !== id)
    });
  };

  const toggleBadge = (badgeId: string) => {
    if (formData.badges.includes(badgeId)) {
      setFormData({
        ...formData,
        badges: formData.badges.filter(b => b !== badgeId)
      });
    } else {
      setFormData({
        ...formData,
        badges: [...formData.badges, badgeId]
      });
      addToast('Badge added', 'success');
    }
  };

  const addSection = (sectionId: string) => {
    const template = sectionTemplates.find(s => s.id === sectionId);
    if (!template) return;
    
    if (formData.extraSections.find(s => s.id === sectionId)) {
      addToast('Section already exists', 'warning');
      return;
    }

    setFormData({
      ...formData,
      extraSections: [...formData.extraSections, { 
        id: sectionId, 
        title: template.title, 
        content: '',
        emoji: template.emoji
      }]
    });
    setShowSectionDropdown(false);
    addToast(`${template.title} section added`, 'success');
  };

  const removeSection = (sectionId: string) => {
    setFormData({
      ...formData,
      extraSections: formData.extraSections.filter(s => s.id !== sectionId)
    });
    addToast('Section removed', 'info');
  };

  const updateSectionContent = (sectionId: string, content: string) => {
    setFormData({
      ...formData,
      extraSections: formData.extraSections.map(s => 
        s.id === sectionId ? { ...s, content } : s
      )
    });
  };

  const handleReorderSections = (newOrder: ExtraSection[]) => {
    setFormData({
      ...formData,
      extraSections: newOrder
    });
  };

  const generateMarkdown = useMemo(() => {
    const { title, description, installation, usage, contributing, license, author, githubUsername, repoName, features, badges, extraSections } = formData;

    // Generate badges
    let badgesMarkdown = '';
    if (badges.length > 0) {
      badgesMarkdown = badges.map(badgeId => {
        const badge = badgeTemplates.find(b => b.id === badgeId);
        if (!badge) return '';
        return badge.template
          .replace('{package}', repoName || 'package-name')
          .replace('{license}', license)
          .replace('{username}', githubUsername || 'username')
          .replace('{repo}', repoName || 'repo');
      }).join(' ') + '\n\n';
    }

    // Generate features
    let featuresMarkdown = '';
    if (features.length > 0) {
      featuresMarkdown = `## ✨ Features\n\n${features.map(f => `- ${f.text}`).join('\n')}\n\n`;
    }

    // Generate extra sections (in order)
    let extraSectionsMarkdown = '';
    extraSections.forEach(section => {
      if (section.content) {
        extraSectionsMarkdown += `## ${section.emoji} ${section.title}\n\n${section.content}\n\n`;
      }
    });

    return `# ${title || 'Project Title'}

${badgesMarkdown}${description || 'A brief description of your project.'}

## 📦 Installation

\`\`\`bash
${installation}
\`\`\`

## 🚀 Usage

\`\`\`bash
${usage}
\`\`\`

${featuresMarkdown}${extraSectionsMarkdown}${contributing ? `## 🤝 Contributing\n\n${contributing}\n\n` : ''}${author ? `## 👤 Author\n\n**${author}**${githubUsername ? `\n- GitHub: [@${githubUsername}](https://github.com/${githubUsername})` : ''}\n\n` : ''}## 📝 License

This project is [${license}](LICENSE) licensed.

---

${githubUsername && repoName ? `⭐️ If you found this project helpful, please give it a star on [GitHub](https://github.com/${githubUsername}/${repoName})!` : '⭐️ If you found this project helpful, please give it a star!'}
`;
  }, [formData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown);
      setCopied(true);
      addToast('Markdown copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Failed to copy', 'error');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generateMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
    addToast('README.md downloaded!', 'success');
  };

  const handleReset = () => {
    setFormData(defaultFormData);
    addToast('Reset to defaults', 'info');
  };

  // Scroll handlers for Lenis compatibility
  const handleScrollPreview = (direction: 'up' | 'down') => {
    if (previewRef.current) {
      const scrollAmount = 150;
      previewRef.current.scrollBy({
        top: direction === 'down' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const lineCount = generateMarkdown.split('\n').length;

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
              <FileText className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">README Wizard</h1>
              <p className="text-xs text-[var(--accent-muted)]">Create professional README files</p>
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
            {copied ? 'Copied!' : 'Copy Markdown'}
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Project Details */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
              <Package className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-medium">Project Details</span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  Project Title
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
                    placeholder="e.g. My Awesome Project"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  Description
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'description' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <textarea
                    className={`w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none resize-none min-h-[80px] ${customScrollbarClass}`}
                    placeholder="What does your project do?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    onFocus={() => setFocusedField('description')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    <Github className="w-3 h-3" />
                    GitHub Username
                  </label>
                  <motion.div
                    className={`relative rounded-lg border transition-all ${
                      focusedField === 'github' 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="username"
                      value={formData.githubUsername}
                      onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                      onFocus={() => setFocusedField('github')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    Repo Name
                  </label>
                  <motion.div
                    className={`relative rounded-lg border transition-all ${
                      focusedField === 'repo' 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="my-repo"
                      value={formData.repoName}
                      onChange={(e) => setFormData({ ...formData, repoName: e.target.value })}
                      onFocus={() => setFocusedField('repo')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-medium">Implementation</span>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  Installation Command
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'install' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-muted)]">
                    <Code className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-[var(--background)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                    value={formData.installation}
                    onChange={(e) => setFormData({ ...formData, installation: e.target.value })}
                    onFocus={() => setFocusedField('install')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  Usage Command
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'usage' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-muted)]">
                    <Code className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-[var(--background)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none font-mono"
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    onFocus={() => setFocusedField('usage')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm font-medium">Features</span>
              </div>
              <span className="text-xs text-[var(--accent-muted)]">{formData.features.length} items</span>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <motion.div
                  className={`flex-1 relative rounded-lg border transition-all ${
                    focusedField === 'feature' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="text"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none"
                    placeholder="Add a feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onFocus={() => setFocusedField('feature')}
                    onBlur={() => setFocusedField(null)}
                    onKeyDown={(e) => e.key === 'Enter' && addFeature()}
                  />
                </motion.div>
                <motion.button
                  onClick={addFeature}
                  className="px-3 py-2 bg-[var(--accent)] text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>

              <AnimatePresence mode="popLayout">
                {formData.features.length > 0 ? (
                  <div className="space-y-2">
                    {formData.features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2 p-2 bg-white/5 rounded-lg group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                        <span className="flex-1 text-sm text-[var(--accent-muted)]">{feature.text}</span>
                        <motion.button
                          onClick={() => removeFeature(feature.id)}
                          className="p-1 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 rounded transition-all"
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--accent-muted)] text-center py-4">
                    No features added yet
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-medium">Badges</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {badgeTemplates.map((badge) => (
                  <motion.button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`px-3 py-2 text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      formData.badges.includes(badge.id)
                        ? 'bg-[var(--accent)] text-black font-medium'
                        : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {formData.badges.includes(badge.id) && <Check className="w-3 h-3" />}
                    {badge.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-sm font-medium">Author & License</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    Author Name
                  </label>
                  <motion.div
                    className={`relative rounded-lg border transition-all ${
                      focusedField === 'author' 
                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                        : 'border-[var(--border-color)]'
                    }`}
                  >
                    <input
                      type="text"
                      className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      placeholder="John Doe"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      onFocus={() => setFocusedField('author')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                    License
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {licenses.slice(0, 3).map((lic) => (
                      <motion.button
                        key={lic.id}
                        onClick={() => setFormData({ ...formData, license: lic.id })}
                        className={`px-2 py-2 text-xs rounded-lg transition-all ${
                          formData.license === lic.id
                            ? 'bg-[var(--accent)] text-black font-medium'
                            : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {lic.id}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                  Contributing Guidelines
                </label>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'contributing' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <textarea
                    className={`w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none resize-none min-h-[60px] ${customScrollbarClass}`}
                    placeholder="How can others contribute?"
                    value={formData.contributing}
                    onChange={(e) => setFormData({ ...formData, contributing: e.target.value })}
                    onFocus={() => setFocusedField('contributing')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Draggable Extra Sections */}
          {formData.extraSections.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <GripVertical className="w-4 h-4 text-[var(--accent-muted)]" />
                <span className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">
                  Custom Sections (drag to reorder)
                </span>
              </div>
              <Reorder.Group 
                axis="y" 
                values={formData.extraSections} 
                onReorder={handleReorderSections}
                className="space-y-3"
              >
                <AnimatePresence>
                  {formData.extraSections.map((section) => (
                    <DraggableSection
                      key={section.id}
                      section={section}
                      onRemove={removeSection}
                      onUpdateContent={updateSectionContent}
                    />
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          )}

          {/* Add Section Button - Always at bottom */}
          <div className="relative">
            <motion.button
              onClick={() => setShowSectionDropdown(!showSectionDropdown)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[var(--border-color)] rounded-xl text-sm text-[var(--accent-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Section
            </motion.button>

            <AnimatePresence>
              {showSectionDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-10"
                >
                  {sectionTemplates.map((section) => {
                    const Icon = section.icon;
                    const isAdded = formData.extraSections.some(s => s.id === section.id);
                    return (
                      <button
                        key={section.id}
                        onClick={() => addSection(section.id)}
                        disabled={isAdded}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                          isAdded 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <span>{section.emoji}</span>
                        <Icon className="w-4 h-4 text-[var(--accent)]" />
                        <span>{section.title}</span>
                        {isAdded && <Check className="w-3 h-3 ml-auto text-green-400" />}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Preview Panel */}
        <motion.div 
          className="lg:sticky lg:top-24 lg:self-start"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-[#0d1117] border border-[var(--border-color)] rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-[var(--accent-muted)]" />
                <span className="text-sm font-mono text-[var(--accent-muted)]">README.md</span>
                <span className="text-xs text-[var(--accent-muted)] bg-white/5 px-2 py-0.5 rounded">
                  {lineCount} lines
                </span>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={() => handleScrollPreview('up')}
                  className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/10 rounded transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronUp className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => handleScrollPreview('down')}
                  className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/10 rounded transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            <div 
              ref={previewRef}
              onWheel={handleWheel}
              className={`p-4 h-[500px] overflow-y-auto overscroll-contain ${customScrollbarClass}`}
            >
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                {generateMarkdown.split('\n').map((line, i) => (
                  <div key={i} className={
                    line.startsWith('#') ? 'text-blue-400 font-bold' :
                    line.startsWith('```') ? 'text-green-400' :
                    line.startsWith('- ') ? 'text-purple-400' :
                    line.startsWith('![') ? 'text-yellow-400' :
                    ''
                  }>
                    {line || ' '}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
          >
            <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4" />
              Tips for a Great README
            </div>
            <ul className="space-y-1.5 text-xs text-blue-200/80">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Add badges to show project status at a glance
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Include screenshots or GIFs for visual projects
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Drag sections to reorder them as needed
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Add contributing guidelines to encourage collaboration
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}