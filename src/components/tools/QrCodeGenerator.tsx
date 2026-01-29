'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Download, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  ArrowLeft, 
  QrCode,
  X,
  AlertCircle,
  Sparkles,
  Trash2,
  RefreshCw,
  Smartphone,
  Mail,
  Phone,
  Wifi,
  MapPin,
  FileText,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'framer-motion';

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

// QR Types
const qrTypes = [
  { id: 'url', label: 'URL', icon: LinkIcon, placeholder: 'https://example.com' },
  { id: 'text', label: 'Text', icon: FileText, placeholder: 'Enter any text...' },
  { id: 'email', label: 'Email', icon: Mail, placeholder: 'email@example.com' },
  { id: 'phone', label: 'Phone', icon: Phone, placeholder: '+1234567890' },
  { id: 'sms', label: 'SMS', icon: Smartphone, placeholder: '+1234567890' },
  { id: 'wifi', label: 'WiFi', icon: Wifi, placeholder: 'Network name' },
];

// Preset colors
const colorPresets = [
  { fg: '#000000', bg: '#ffffff', name: 'Classic' },
  { fg: '#1a1a2e', bg: '#eaeaea', name: 'Dark' },
  { fg: '#0f4c75', bg: '#bbe1fa', name: 'Ocean' },
  { fg: '#ff2e63', bg: '#fef6e4', name: 'Coral' },
  { fg: '#6c5ce7', bg: '#ffeaa7', name: 'Purple' },
  { fg: '#00b894', bg: '#dfe6e9', name: 'Mint' },
];

// Export formats
const exportFormats = [
  { id: 'png', label: 'PNG', description: 'Best for web' },
  { id: 'svg', label: 'SVG', description: 'Scalable vector' },
  { id: 'jpeg', label: 'JPEG', description: 'Compressed' },
];

export default function QrCodeGenerator() {
  const [qrType, setQrType] = useState('url');
  const [text, setText] = useState('https://toolkitlab.dev');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(300);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [isGenerating, setIsGenerating] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // WiFi specific fields
  const [wifiSSID, setWifiSSID] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  const { toasts, addToast, removeToast } = useToast();
  const svgRef = useRef<string>('');

  // Generate QR content based on type
  const getQRContent = useCallback(() => {
    switch (qrType) {
      case 'email':
        return `mailto:${text}`;
      case 'phone':
        return `tel:${text}`;
      case 'sms':
        return `sms:${text}`;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
      default:
        return text;
    }
  }, [qrType, text, wifiSSID, wifiPassword, wifiEncryption]);

  useEffect(() => {
    generateQR();
  }, [text, color, bgColor, size, errorCorrection, qrType, wifiSSID, wifiPassword, wifiEncryption]);

  const generateQR = async () => {
    const content = getQRContent();
    if (!content || content.length === 0) {
      setQrDataUrl('');
      return;
    }

    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: color,
          light: bgColor
        }
      });
      setQrDataUrl(url);

      // Also generate SVG for vector export
      const svg = await QRCode.toString(content, {
        type: 'svg',
        width: size,
        margin: 2,
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: color,
          light: bgColor
        }
      });
      svgRef.current = svg;
    } catch (err) {
      console.error(err);
      addToast('Failed to generate QR code', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: string) => {
    setShowExportDropdown(false);
    
    if (!qrDataUrl) {
      addToast('Generate a QR code first', 'warning');
      return;
    }

    try {
      const link = document.createElement('a');
      
      if (format === 'svg') {
        const blob = new Blob([svgRef.current], { type: 'image/svg+xml' });
        link.href = URL.createObjectURL(blob);
        link.download = 'qrcode.svg';
      } else if (format === 'jpeg') {
        // Convert to JPEG
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.download = 'qrcode.jpg';
            resolve();
          };
          img.src = qrDataUrl;
        });
      } else {
        link.href = qrDataUrl;
        link.download = 'qrcode.png';
      }
      
      link.click();
      addToast(`Downloaded as ${format.toUpperCase()}`, 'success');
    } catch (err) {
      addToast('Download failed', 'error');
    }
  };

  const handleCopy = async () => {
    if (!qrDataUrl) {
      addToast('Generate a QR code first', 'warning');
      return;
    }

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      addToast('QR code copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: copy data URL
      try {
        await navigator.clipboard.writeText(qrDataUrl);
        setCopied(true);
        addToast('QR code URL copied!', 'success');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        addToast('Failed to copy', 'error');
      }
    }
  };

  const handleReset = () => {
    setText('https://toolkitlab.dev');
    setColor('#000000');
    setBgColor('#ffffff');
    setSize(300);
    setErrorCorrection('M');
    setQrType('url');
    setWifiSSID('');
    setWifiPassword('');
    addToast('Reset to defaults', 'info');
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setColor(preset.fg);
    setBgColor(preset.bg);
    addToast(`Applied ${preset.name} theme`, 'success');
  };

  const currentType = qrTypes.find(t => t.id === qrType) || qrTypes[0];
  const TypeIcon = currentType.icon;

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
              <QrCode className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">QR Studio</h1>
              <p className="text-xs text-[var(--accent-muted)]">Generate customizable QR codes</p>
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
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>

          {/* Export Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[var(--accent)] text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-3.5 h-3.5" />
              Export
              <ChevronDown className={`w-3 h-3 transition-transform ${showExportDropdown ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showExportDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 mt-1 w-40 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl overflow-hidden z-20"
                >
                  {exportFormats.map((format) => (
                    <button
                      key={format.id}
                      onClick={() => handleDownload(format.id)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span>{format.label}</span>
                      <span className="text-xs text-[var(--accent-muted)]">{format.description}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* QR Type Selector */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              QR Type
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {qrTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => { setQrType(type.id); setText(''); }}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-all ${
                      qrType === type.id
                        ? 'bg-[var(--accent)] text-black'
                        : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10 hover:text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{type.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content Input */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              <TypeIcon className="w-3.5 h-3.5" />
              Content
            </label>

            {qrType === 'wifi' ? (
              <div className="space-y-3">
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'ssid' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="text"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="Network Name (SSID)"
                    value={wifiSSID}
                    onChange={(e) => setWifiSSID(e.target.value)}
                    onFocus={() => setFocusedField('ssid')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <motion.div
                  className={`relative rounded-lg border transition-all ${
                    focusedField === 'password' 
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                      : 'border-[var(--border-color)]'
                  }`}
                >
                  <input
                    type="password"
                    className="w-full bg-[var(--background)] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    placeholder="Password"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                </motion.div>
                <div className="flex gap-2">
                  {['WPA', 'WEP', 'nopass'].map((enc) => (
                    <motion.button
                      key={enc}
                      onClick={() => setWifiEncryption(enc)}
                      className={`flex-1 py-2 text-xs rounded-lg transition-all ${
                        wifiEncryption === enc
                          ? 'bg-[var(--accent)] text-black font-medium'
                          : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {enc === 'nopass' ? 'Open' : enc}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className={`relative rounded-lg border transition-all ${
                  focusedField === 'content' 
                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20' 
                    : 'border-[var(--border-color)]'
                }`}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-muted)]">
                  <TypeIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  className="w-full bg-[var(--background)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                  placeholder={currentType.placeholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onFocus={() => setFocusedField('content')}
                  onBlur={() => setFocusedField(null)}
                />
              </motion.div>
            )}
          </div>

          {/* Color Presets */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              Color Presets
            </label>
            <div className="grid grid-cols-6 gap-2">
              {colorPresets.map((preset, i) => (
                <motion.button
                  key={i}
                  onClick={() => applyPreset(preset)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    color === preset.fg && bgColor === preset.bg
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                      : 'border-transparent hover:border-[var(--border-hover)]'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={preset.name}
                >
                  <div className="absolute inset-0" style={{ backgroundColor: preset.bg }} />
                  <div 
                    className="absolute inset-2 rounded"
                    style={{ backgroundColor: preset.fg }}
                  />
                  {color === preset.fg && bgColor === preset.bg && (
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <Check className="w-4 h-4 text-[var(--accent)]" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4">
            <label className="block text-xs text-[var(--accent-muted)] mb-3 uppercase tracking-wide">
              Custom Colors
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[var(--accent-muted)] mb-2">Foreground</label>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none uppercase"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[var(--accent-muted)] mb-2">Background</label>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Size & Quality */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-4 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-[var(--accent-muted)] uppercase tracking-wide">Size</label>
                <span className="text-xs text-[var(--accent)] font-mono">{size}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs text-[var(--accent-muted)] mb-2 uppercase tracking-wide">
                Error Correction
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                  <motion.button
                    key={level}
                    onClick={() => setErrorCorrection(level)}
                    className={`py-2 text-xs rounded-lg transition-all ${
                      errorCorrection === level
                        ? 'bg-[var(--accent)] text-black font-medium'
                        : 'bg-white/5 text-[var(--accent-muted)] hover:bg-white/10'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level}
                    <span className="block text-[10px] opacity-70">
                      {level === 'L' && '7%'}
                      {level === 'M' && '15%'}
                      {level === 'Q' && '25%'}
                      {level === 'H' && '30%'}
                    </span>
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-[var(--accent-muted)] mt-2">
                Higher = more recoverable but denser QR code
              </p>
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
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-6 flex flex-col items-center justify-center min-h-[500px]">
            {/* QR Preview */}
            <AnimatePresence mode="wait">
              {qrDataUrl ? (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                >
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-10">
                      <motion.div
                        className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  )}
                  <motion.img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="rounded-xl shadow-2xl"
                    style={{ maxWidth: '100%', maxHeight: '350px' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                    <QrCode className="w-12 h-12 text-[var(--accent-muted)]" />
                  </div>
                  <p className="text-[var(--accent-muted)] text-sm">
                    Enter content to generate QR code
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content Preview */}
            {(text || (qrType === 'wifi' && wifiSSID)) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-3 bg-white/5 rounded-lg w-full max-w-sm"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--accent-muted)] mb-1">
                  <TypeIcon className="w-3 h-3" />
                  <span className="uppercase">{currentType.label}</span>
                </div>
                <p className="text-sm text-white truncate font-mono">
                  {qrType === 'wifi' ? `SSID: ${wifiSSID}` : text}
                </p>
              </motion.div>
            )}
          </div>

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
                Use high error correction (H) if adding a logo overlay
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                SVG format is best for print materials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Ensure good contrast between colors for scanning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Test your QR code before sharing
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}