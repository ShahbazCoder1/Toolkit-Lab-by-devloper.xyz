'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import {
    Search,
    Plus,
    X,
    Copy,
    Check,
    Download,
    ArrowLeft,
    GitBranch,
    Trash2,
    AlertCircle,
    FileCode,
    Sparkles,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Toast Component
interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success'
                                ? 'bg-green-500/20 border-green-500/30 text-green-400'
                                : toast.type === 'error'
                                    ? 'bg-red-500/20 border-red-500/30 text-red-400'
                                    : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            }`}
                    >
                        {toast.type === 'success' && <Check className="w-4 h-4" />}
                        {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
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

    const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
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

// Template categories for better organization
const CATEGORIES = [
    { id: 'languages', name: 'Languages', icon: '💻' },
    { id: 'frameworks', name: 'Frameworks', icon: '🚀' },
    { id: 'os', name: 'Operating Systems', icon: '🖥️' },
    { id: 'editors', name: 'Editors & IDEs', icon: '📝' },
];

const TEMPLATES = [
    // Languages
    { id: 'node', name: 'Node.js', category: 'languages', content: '# Node.js\nnode_modules/\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.env\n.env.local\n.env.*.local\ndist/\nbuild/\n.npm\n.yarn-integrity\n' },
    { id: 'python', name: 'Python', category: 'languages', content: '# Python\n__pycache__/\n*.py[cod]\n*$py.class\n*.so\nvenv/\nenv/\n.env\n*.egg-info/\ndist/\nbuild/\n.pytest_cache/\n' },
    { id: 'java', name: 'Java', category: 'languages', content: '# Java\n*.class\n*.log\n*.jar\n*.war\n*.nar\n*.ear\n*.zip\n*.tar.gz\n*.rar\nhs_err_pid*\ntarget/\n.gradle/\nbuild/\n' },
    { id: 'go', name: 'Go', category: 'languages', content: '# Go\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n*.test\n*.out\nvendor/\ngo.sum\n' },
    { id: 'rust', name: 'Rust', category: 'languages', content: '# Rust\n/target/\n**/*.rs.bk\nCargo.lock\n*.pdb\n' },
    { id: 'ruby', name: 'Ruby', category: 'languages', content: '# Ruby\n*.gem\n*.rbc\n/.config\n/coverage/\n/InstalledFiles\n/pkg/\n/spec/reports/\n/tmp/\n.bundle/\nvendor/bundle/\n' },
    { id: 'php', name: 'PHP', category: 'languages', content: '# PHP\n/vendor/\ncomposer.phar\ncomposer.lock\n*.log\n.env\n.phpunit.result.cache\n' },

    // Frameworks
    { id: 'react', name: 'React', category: 'frameworks', content: '# React\nnode_modules/\nbuild/\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\nnpm-debug.log*\n' },
    { id: 'nextjs', name: 'Next.js', category: 'frameworks', content: '# Next.js\n.next/\nout/\nbuild/\nnode_modules/\n.env*.local\nnpm-debug.log*\n.vercel\n*.tsbuildinfo\n' },
    { id: 'vue', name: 'Vue.js', category: 'frameworks', content: '# Vue.js\nnode_modules/\ndist/\n.env.local\n.env.*.local\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n' },
    { id: 'angular', name: 'Angular', category: 'frameworks', content: '# Angular\ndist/\ntmp/\nout-tsc/\nnode_modules/\n.angular/\n.sass-cache/\n' },
    { id: 'django', name: 'Django', category: 'frameworks', content: '# Django\n*.log\n*.pot\n*.pyc\n__pycache__/\nlocal_settings.py\ndb.sqlite3\nmedia/\nstaticfiles/\n.env\n' },
    { id: 'laravel', name: 'Laravel', category: 'frameworks', content: '# Laravel\n/vendor/\nnode_modules/\n.env\n.env.backup\nstorage/*.key\nHomestead.json\nHomestead.yaml\n' },

    // Operating Systems
    { id: 'macos', name: 'macOS', category: 'os', content: '# macOS\n.DS_Store\n.AppleDouble\n.LSOverride\n._*\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent\n' },
    { id: 'windows', name: 'Windows', category: 'os', content: '# Windows\nThumbs.db\nThumbs.db:encryptable\nehthumbs.db\nehthumbs_vista.db\n*.stackdump\n[Dd]esktop.ini\n$RECYCLE.BIN/\n*.lnk\n' },
    { id: 'linux', name: 'Linux', category: 'os', content: '# Linux\n*~\n.fuse_hidden*\n.directory\n.Trash-*\n.nfs*\n' },

    // Editors
    { id: 'vscode', name: 'VS Code', category: 'editors', content: '# VS Code\n.vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n*.code-workspace\n.history/\n' },
    { id: 'intellij', name: 'IntelliJ IDEA', category: 'editors', content: '# IntelliJ IDEA\n.idea/\n*.iws\n*.iml\n*.ipr\nout/\n.idea_modules/\n' },
    { id: 'vim', name: 'Vim', category: 'editors', content: '# Vim\n[._]*.s[a-v][a-z]\n!*.svg\n[._]*.sw[a-p]\n[._]s[a-rt-v][a-z]\n[._]ss[a-gi-z]\n[._]sw[a-p]\nSession.vim\nNetrwhist\n*~\ntags\n' },
    { id: 'sublimetext', name: 'Sublime Text', category: 'editors', content: '# Sublime Text\n*.tmlanguage.cache\n*.tmPreferences.cache\n*.stTheme.cache\n*.sublime-workspace\n*.sublime-project\nsftp-config.json\n' },
];

// Custom scrollbar styles - add this as a constant
const customScrollbarClass = `
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-700
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-600
`;

export default function GitignoreGenerator() {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const { toasts, addToast, removeToast } = useToast();

    // Refs for manual scroll control
    const templateListRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);

    const filteredTemplates = useMemo(() => {
        let templates = TEMPLATES;

        if (activeCategory) {
            templates = templates.filter(t => t.category === activeCategory);
        }

        if (search) {
            templates = templates.filter(t =>
                t.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        return templates;
    }, [search, activeCategory]);

    const toggleSelection = (id: string) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(s => s !== id));
            const template = TEMPLATES.find(t => t.id === id);
            addToast(`Removed ${template?.name}`, 'info');
        } else {
            setSelected([...selected, id]);
            const template = TEMPLATES.find(t => t.id === id);
            addToast(`Added ${template?.name}`, 'success');
        }
    };

    const generateContent = () => {
        if (selected.length === 0) {
            return '# Select templates from the left panel to generate your .gitignore file\n\n# Tip: You can select multiple templates and they will be combined automatically';
        }

        const header = `# Generated by toolkitLab - gitignore Generator\n# Templates: ${selected.map(id => TEMPLATES.find(t => t.id === id)?.name).join(', ')}\n# Generated on: ${new Date().toLocaleDateString()}\n\n`;

        const content = selected.map(id => {
            const template = TEMPLATES.find(t => t.id === id);
            return template?.content;
        }).join('\n');

        return header + content;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generateContent());
            setCopied(true);
            addToast('Copied to clipboard!', 'success');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            addToast('Failed to copy', 'error');
        }
    };

    const handleDownload = () => {
        const content = generateContent();
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '.gitignore';
        link.click();
        URL.revokeObjectURL(url);
        addToast('Downloaded .gitignore file', 'success');
    };

    const handleClearAll = () => {
        setSelected([]);
        addToast('Cleared all selections', 'info');
    };

    const handleSelectPopular = () => {
        const popular = ['node', 'macos', 'vscode'];
        setSelected(popular);
        addToast('Added popular templates', 'success');
    };

    // Manual scroll handlers for Lenis compatibility
    const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'up' | 'down') => {
        if (ref.current) {
            const scrollAmount = 150;
            ref.current.scrollBy({
                top: direction === 'down' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Handle wheel event manually for Lenis
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const container = e.currentTarget;
        container.scrollTop += e.deltaY;
    };

    const lineCount = generateContent().split('\n').length;

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
                            <GitBranch className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold">.gitignore Generator</h1>
                            <p className="text-xs text-[var(--accent-muted)]">Create gitignore files for any project</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={handleSelectPopular}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Popular
                    </motion.button>

                    {selected.length > 0 && (
                        <motion.button
                            onClick={handleClearAll}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Selection Panel */}
                <motion.div
                    className="flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {/* Search Header */}
                    <div className="p-4 border-b border-[var(--border-color)]">
                        <div
                            className={`relative flex items-center bg-[var(--background)] border rounded-lg transition-all ${isSearchFocused
                                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                                    : 'border-[var(--border-color)]'
                                }`}
                        >
                            <Search className="absolute left-3 w-4 h-4 text-[var(--accent-muted)]" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="w-full bg-transparent pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[var(--accent-muted)] focus:outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            <AnimatePresence>
                                {search && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => setSearch('')}
                                        className="absolute right-3 p-0.5 text-[var(--accent-muted)] hover:text-white transition-colors"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <motion.button
                                onClick={() => setActiveCategory(null)}
                                className={`px-3 py-1.5 text-xs rounded-lg transition-all ${activeCategory === null
                                        ? 'bg-[var(--accent)] text-black font-medium'
                                        : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                                    }`}
                                whileTap={{ scale: 0.95 }}
                            >
                                All
                            </motion.button>
                            {CATEGORIES.map((category) => (
                                <motion.button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 ${activeCategory === category.id
                                            ? 'bg-[var(--accent)] text-black font-medium'
                                            : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Template List with custom scroll */}
                    <div className="relative flex-1">
                        {/* Scroll Up Button */}
                        <motion.button
                            onClick={() => handleScroll(templateListRef, 'up')}
                            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-1 bg-gradient-to-b from-[var(--card-bg)] to-transparent opacity-0 hover:opacity-100 transition-opacity"
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronUp className="w-4 h-4 text-[var(--accent-muted)]" />
                        </motion.button>

                        <div
                            ref={templateListRef}
                            onWheel={handleWheel}
                            className={`overflow-y-auto p-2 h-[350px] overscroll-contain ${customScrollbarClass}`}
                            style={{ scrollbarGutter: 'stable' }}
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredTemplates.length > 0 ? (
                                    filteredTemplates.map((template, index) => {
                                        const isSelected = selected.includes(template.id);
                                        return (
                                            <motion.button
                                                key={template.id}
                                                onClick={() => toggleSelection(template.id)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all mb-1 ${isSelected
                                                        ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30'
                                                        : 'text-[var(--accent-muted)] hover:bg-white/5 hover:text-white border border-transparent'
                                                    }`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: index * 0.02 }}
                                                whileHover={{ x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[var(--accent)]' : 'bg-gray-600'}`}
                                                        animate={{ scale: isSelected ? [1, 1.3, 1] : 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                    <span className="font-medium">{template.name}</span>
                                                </div>
                                                <motion.div>
                                                    {isSelected ? (
                                                        <Check className="w-4 h-4" />
                                                    ) : (
                                                        <Plus className="w-4 h-4 opacity-40" />
                                                    )}
                                                </motion.div>
                                            </motion.button>
                                        );
                                    })
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center py-12 text-center"
                                    >
                                        <Search className="w-10 h-10 text-[var(--accent-muted)] mb-3" />
                                        <p className="text-sm text-[var(--accent-muted)]">No templates found</p>
                                        <button
                                            onClick={() => { setSearch(''); setActiveCategory(null); }}
                                            className="mt-2 text-xs text-[var(--accent)] hover:underline"
                                        >
                                            Clear filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Scroll Down Button */}
                        <motion.button
                            onClick={() => handleScroll(templateListRef, 'down')}
                            className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center py-1 bg-gradient-to-t from-[var(--card-bg)] to-transparent opacity-0 hover:opacity-100 transition-opacity"
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronDown className="w-4 h-4 text-[var(--accent-muted)]" />
                        </motion.button>
                    </div>

                    {/* Selected Tags Footer */}
                    <AnimatePresence>
                        {selected.length > 0 && (
                            <motion.div
                                className="p-4 border-t border-[var(--border-color)] bg-[var(--background)]/50"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-[var(--accent-muted)]">
                                        {selected.length} template{selected.length !== 1 ? 's' : ''} selected
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <AnimatePresence mode="popLayout">
                                        {selected.map(id => {
                                            const t = TEMPLATES.find(temp => temp.id === id);
                                            return (
                                                <motion.span
                                                    key={id}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--accent)] text-black"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    layout
                                                >
                                                    {t?.name}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); toggleSelection(id); }}
                                                        className="hover:bg-black/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </motion.span>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Preview Panel */}
                <motion.div
                    className="flex flex-col border border-[var(--border-color)] rounded-xl overflow-hidden bg-[#0d1117]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Preview Header */}
                    <div className="p-4 border-b border-[var(--border-color)] bg-[var(--card-bg)] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <FileCode className="w-4 h-4 text-[var(--accent-muted)]" />
                            <span className="text-sm font-mono text-[var(--accent-muted)]">.gitignore</span>
                            <span className="text-xs text-[var(--accent-muted)] bg-white/5 px-2 py-0.5 rounded">
                                {lineCount} lines
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <motion.button
                                onClick={handleCopy}
                                disabled={selected.length === 0}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                whileTap={{ scale: 0.95 }}
                            >
                                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </motion.button>
                            <motion.button
                                onClick={handleDownload}
                                disabled={selected.length === 0}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--accent)] text-black rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download className="w-3.5 h-3.5" />
                                Download
                            </motion.button>
                        </div>
                    </div>

                    {/* Code Preview with custom scroll */}
                    <div className="relative flex-1">
                        {/* Scroll buttons for preview */}
                        <motion.button
                            onClick={() => handleScroll(previewRef, 'up')}
                            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-1 bg-gradient-to-b from-[#0d1117] to-transparent opacity-0 hover:opacity-100 transition-opacity"
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronUp className="w-4 h-4 text-gray-500" />
                        </motion.button>

                        <div
                            ref={previewRef}
                            onWheel={handleWheel}
                            className={`overflow-y-auto h-[400px] overscroll-contain ${customScrollbarClass}`}
                            style={{ scrollbarGutter: 'stable' }}
                        >
                            <div className="flex min-h-full">
                                {/* Line Numbers */}
                                <div className="py-4 pl-4 pr-3 text-right select-none border-r border-gray-800/50 text-gray-600 text-xs font-mono leading-relaxed sticky left-0 bg-[#0d1117]">
                                    {generateContent().split('\n').map((_, i) => (
                                        <div key={i}>{i + 1}</div>
                                    ))}
                                </div>
                                {/* Code Content */}
                                <pre className="flex-1 p-4 text-sm font-mono text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {generateContent().split('\n').map((line, i) => (
                                        <div key={i} className={line.startsWith('#') ? 'text-gray-500' : ''}>
                                            {line || ' '}
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>

                        {/* Scroll Down Button */}
                        <motion.button
                            onClick={() => handleScroll(previewRef, 'down')}
                            className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center py-1 bg-gradient-to-t from-[#0d1117] to-transparent opacity-0 hover:opacity-100 transition-opacity"
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </motion.button>
                    </div>

                    {/* Preview Footer */}
                    {selected.length > 0 && (
                        <motion.div
                            className="p-3 border-t border-[var(--border-color)] bg-[var(--card-bg)]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-xs text-[var(--accent-muted)] text-center">
                                💡 Tip: Download the file and place it in your project root directory
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}