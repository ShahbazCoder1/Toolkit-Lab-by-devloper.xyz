'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  ArrowLeft,
  Camera,
  X,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { toPng, toJpeg, toSvg } from 'html-to-image';
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                : toast.type === 'error'
                ? 'bg-red-500/20 border-red-500/30 text-red-400'
                : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}
          >
            {toast.type === 'success' && <Check className="w-4 h-4" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
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

const defaultCode = `function greetDeveloper() {
  const message = "Hello, Toolkit Lab!";
  console.log(message);
  
  return {
    status: "Happy Coding! 🚀",
    tools: ["README", "CodeSnaps"]
  };
}`;

const gradients = [
  { name: 'Sunset', value: 'from-pink-500 via-red-500 to-yellow-500' },
  { name: 'Ocean', value: 'from-blue-400 via-indigo-500 to-purple-500' },
  { name: 'Forest', value: 'from-green-400 to-emerald-600' },
  { name: 'Night', value: 'from-slate-800 to-slate-600' },
  { name: 'Aurora', value: 'from-green-300 via-blue-500 to-purple-600' },
  { name: 'Fire', value: 'from-yellow-400 via-orange-500 to-red-600' },
];

const aspectRatios = [
  { name: 'Auto', value: 'auto', width: null, height: null },
  { name: '16:9', value: '16:9', width: 16, height: 9 },
  { name: '4:3', value: '4:3', width: 4, height: 3 },
  { name: '1:1', value: '1:1', width: 1, height: 1 },
  { name: '9:16', value: '9:16', width: 9, height: 16 },
];

export default function CodeSnaps() {
  const [code, setCode] = useState(defaultCode);
  const [padding, setPadding] = useState(48);
  const [darkMode, setDarkMode] = useState(true);
  const [bgGradient, setBgGradient] = useState('from-pink-500 via-red-500 to-yellow-500');
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [aspectRatio, setAspectRatio] = useState('auto');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const captureRef = useRef<HTMLDivElement>(null);
  const { toasts, addToast, removeToast } = useToast();

  const lineCount = code.split('\n').length;

  // Get aspect ratio styles
  const getAspectRatioStyle = () => {
    const ratio = aspectRatios.find(r => r.value === aspectRatio);
    if (!ratio || ratio.value === 'auto') {
      return {};
    }
    return {
      aspectRatio: `${ratio.width}/${ratio.height}`,
    };
  };

  const handleExport = async (format: string) => {
    if (!captureRef.current) return;

    setIsExporting(true);
    setShowExportMenu(false);

    try {
      let dataUrl: string;
      const options = { pixelRatio: 3, cacheBust: true };
      const node = captureRef.current;
      
      switch (format) {
        case 'jpeg':
          dataUrl = await toJpeg(node, { ...options, quality: 0.95 });
          break;
        case 'svg':
          dataUrl = await toSvg(node, options);
          break;
        default:
          dataUrl = await toPng(node, options);
      }

      const link = document.createElement('a');
      link.download = `code-snap.${format}`;
      link.href = dataUrl;
      link.click();

      addToast(`Downloaded as ${format.toUpperCase()}`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Export failed. Try again.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      addToast('Code copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      addToast('Failed to copy', 'error');
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setPadding(48);
    setDarkMode(true);
    setBgGradient('from-pink-500 via-red-500 to-yellow-500');
    setFontSize(14);
    setShowLineNumbers(true);
    setAspectRatio('auto');
    addToast('Reset to defaults', 'info');
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
              <Camera className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Code Snaps</h1>
              <p className="text-xs text-[var(--accent-muted)]">Beautiful code screenshots</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </motion.button>

          <motion.button
            onClick={handleReset}
            className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            whileHover={{ rotate: -180 }}
            transition={{ duration: 0.3 }}
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>

          {/* Export Button with Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-1.5 bg-[var(--accent)] text-black text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              whileTap={{ scale: 0.95 }}
            >
              {isExporting ? (
                <motion.div
                  className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export
              <ChevronDown className={`w-3 h-3 transition-transform ${showExportMenu ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-1 w-32 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl overflow-hidden z-20"
                >
                  {['png', 'jpeg', 'svg'].map((format) => (
                    <button
                      key={format}
                      onClick={() => handleExport(format)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <motion.div 
          className="lg:col-span-3 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Background */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              Background
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {gradients.map((g) => (
                <motion.button
                  key={g.name}
                  onClick={() => setBgGradient(g.value)}
                  className={`aspect-square rounded-lg bg-gradient-to-br ${g.value} transition-all ${
                    bgGradient === g.value ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--card-bg)]' : ''
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              Theme
            </label>
            <div className="flex gap-2">
              {[true, false].map((isDark) => (
                <motion.button
                  key={isDark ? 'dark' : 'light'}
                  onClick={() => setDarkMode(isDark)}
                  className={`flex-1 py-2 text-xs rounded-lg transition-all ${
                    darkMode === isDark
                      ? 'bg-[var(--accent)] text-black font-medium'
                      : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDark ? 'Dark' : 'Light'}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              Aspect Ratio
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {aspectRatios.map((ratio) => (
                <motion.button
                  key={ratio.value}
                  onClick={() => setAspectRatio(ratio.value)}
                  className={`py-2 text-xs rounded-lg transition-all ${
                    aspectRatio === ratio.value
                      ? 'bg-[var(--accent)] text-black font-medium'
                      : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  {ratio.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Padding & Font */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">Padding</label>
                <span className="text-xs text-[var(--accent)] font-mono">{padding}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="80"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">Font Size</label>
                <span className="text-xs text-[var(--accent)] font-mono">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="18"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>

          {/* Line Numbers Toggle */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">Line Numbers</span>
              <motion.button
                onClick={() => setShowLineNumbers(!showLineNumbers)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  showLineNumbers ? 'bg-[var(--accent)]' : 'bg-[var(--border-color)]'
                }`}
                whileTap={{ scale: 0.95 }}
                aria-pressed={showLineNumbers}
                role="switch"
              >
                <motion.span 
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full shadow-sm ${
                    showLineNumbers ? 'bg-black' : 'bg-[var(--accent-muted)]'
                  }`}
                  animate={{ x: showLineNumbers ? 20 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Preview Area */}
        <motion.div 
          className="lg:col-span-9"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* 
            Added Custom Scrollbar Styling here:
            [&::-webkit-scrollbar]:w-1.5  -> Thin width
            [&::-webkit-scrollbar-track]:bg-transparent -> Transparent track
            [&::-webkit-scrollbar-thumb]:bg-zinc-800 -> Dark gray thumb
            [&::-webkit-scrollbar-thumb]:rounded-full -> Rounded corners
          */}
          <div 
            data-lenis-prevent
            className="bg-[#0a0a0a] border border-[var(--border-color)] rounded-xl p-6 flex min-h-[480px] overflow-auto max-h-[calc(100vh-150px)] overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700"
          >
            <motion.div
              ref={captureRef}
              className={`bg-gradient-to-br ${bgGradient} flex items-center justify-center box-border m-auto`}
              style={{ 
                padding: `${padding}px`,
                ...getAspectRatioStyle(),
                minWidth: aspectRatio === 'auto' ? 'fit-content' : '100%',
                width: aspectRatio === 'auto' ? 'auto' : '100%',
              }}
              layout
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className={`${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'} rounded-xl shadow-2xl overflow-hidden ${
                  aspectRatio === 'auto' ? 'min-w-[400px] max-w-[600px]' : 'w-full h-full'
                }`}
                layout
              >
                {/* Window Header */}
                <div className={`px-4 py-3 flex items-center gap-2 ${darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-100'} z-10 relative`}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className={`flex-1 text-center text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    snippet.js
                  </div>
                  <div className="w-[52px]" />
                </div>

                {/* Code Area */}
                <div className="flex relative">
                  <AnimatePresence>
                    {showLineNumbers && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className={`py-4 pl-4 pr-3 select-none border-r flex flex-col ${
                          darkMode ? 'text-gray-600 border-gray-700/50' : 'text-gray-400 border-gray-200'
                        }`}
                        style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
                      >
                        {Array.from({ length: lineCount }, (_, i) => (
                          <div key={i} className="text-right font-mono">{i + 1}</div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex-1 grid relative">
                    <div 
                      className="col-start-1 row-start-1 p-4 font-mono whitespace-pre-wrap break-words invisible pointer-events-none"
                      style={{ 
                        fontSize: `${fontSize}px`, 
                        lineHeight: '1.6', 
                        minHeight: '180px' 
                      }}
                      aria-hidden="true"
                    >
                      {code + '\n'}
                    </div>

                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      spellCheck={false}
                      className={`col-start-1 row-start-1 w-full h-full p-4 font-mono resize-none focus:outline-none bg-transparent overflow-hidden ${
                        darkMode ? 'text-gray-100' : 'text-gray-800'
                      }`}
                      style={{ 
                        fontSize: `${fontSize}px`, 
                        lineHeight: '1.6', 
                      }}
                      placeholder="Type or paste your code..."
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Tips */}
          <p className="text-center text-xs text-[var(--accent-muted)] mt-3">
            Tip: Edit code directly in the preview • Exports at 3x resolution
          </p>
        </motion.div>
      </div>
    </>
  );
}