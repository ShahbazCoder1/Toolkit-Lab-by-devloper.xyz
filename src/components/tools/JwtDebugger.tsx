'use client';

import { useState, useMemo, useCallback } from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Copy,
    Check,
    ArrowLeft,
    Lock,
    Trash2,
    Clock,
    User,
    Key,
    Shield,
    X,
    AlertCircle,
    Sparkles,
    FileCode,
    Info
} from 'lucide-react';
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success'
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
                        {toast.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
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

// Sample JWT for demo
const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// Custom scrollbar styles
const customScrollbarClass = `
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-gray-700
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-600
`;

interface DecodedToken {
    header: string;
    headerObj: Record<string, unknown>;
    payload: string;
    payloadObj: Record<string, unknown>;
    signature: string;
    valid: boolean;
    error?: string;
}

export default function JwtDebugger() {
    const [token, setToken] = useState('');
    const [copiedSection, setCopiedSection] = useState<string | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const { toasts, addToast, removeToast } = useToast();

    const decoded = useMemo((): DecodedToken | null => {
        if (!token.trim()) return null;
        try {
            const parts = token.trim().split('.');
            if (parts.length !== 3) {
                return {
                    valid: false,
                    error: 'Invalid JWT format. Must have 3 parts separated by dots.',
                    header: '{}',
                    headerObj: {},
                    payload: '{}',
                    payloadObj: {},
                    signature: ''
                };
            }

            const headerObj = JSON.parse(atob(parts[0]));
            const payloadObj = JSON.parse(atob(parts[1]));

            return {
                header: JSON.stringify(headerObj, null, 2),
                headerObj,
                payload: JSON.stringify(payloadObj, null, 2),
                payloadObj,
                signature: parts[2],
                valid: true
            };
        } catch (e) {
            return {
                valid: false,
                error: 'Invalid base64 encoding in header or payload.',
                header: '{}',
                headerObj: {},
                payload: '{}',
                payloadObj: {},
                signature: ''
            };
        }
    }, [token]);

    const handleCopy = async (text: string, section: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedSection(section);
            addToast(`${section} copied to clipboard!`, 'success');
            setTimeout(() => setCopiedSection(null), 2000);
        } catch {
            addToast('Failed to copy', 'error');
        }
    };

    const handleClear = () => {
        setToken('');
        addToast('Token cleared', 'info');
    };

    const handleLoadSample = () => {
        setToken(SAMPLE_JWT);
        addToast('Sample JWT loaded', 'success');
    };

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setToken(text);
            addToast('Token pasted from clipboard', 'success');
        } catch {
            addToast('Failed to paste. Check clipboard permissions.', 'error');
        }
    };

    // Parse claims for display
    const getClaims = () => {
        if (!decoded?.valid || !decoded.payloadObj) return [];

        const claimLabels: Record<string, { label: string; icon: typeof Clock }> = {
            iss: { label: 'Issuer', icon: Shield },
            sub: { label: 'Subject', icon: User },
            aud: { label: 'Audience', icon: User },
            exp: { label: 'Expiration', icon: Clock },
            nbf: { label: 'Not Before', icon: Clock },
            iat: { label: 'Issued At', icon: Clock },
            jti: { label: 'JWT ID', icon: Key },
        };

        return Object.entries(decoded.payloadObj).map(([key, value]) => {
            const claimInfo = claimLabels[key];
            let displayValue = String(value);
            let isExpired = false;

            // Format timestamps
            if (['exp', 'nbf', 'iat'].includes(key) && typeof value === 'number') {
                const date = new Date(value * 1000);
                displayValue = date.toLocaleString();
                if (key === 'exp') {
                    isExpired = date < new Date();
                }
            }

            return {
                key,
                label: claimInfo?.label || key,
                value: displayValue,
                icon: claimInfo?.icon || Info,
                isExpired
            };
        });
    };

    const claims = getClaims();
    const isExpired = claims.find(c => c.key === 'exp')?.isExpired || false;

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
                            <Lock className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold">JWT Debugger</h1>
                            <p className="text-xs text-[var(--accent-muted)]">Decode and inspect JSON Web Tokens</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={handleLoadSample}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Sample
                    </motion.button>

                    <motion.button
                        onClick={handlePaste}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FileCode className="w-3.5 h-3.5" />
                        Paste
                    </motion.button>

                    {token && (
                        <motion.button
                            onClick={handleClear}
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
                {/* Input Panel */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between">
                            <span className="text-sm font-medium">Encoded Token</span>
                            {token && (
                                <motion.button
                                    onClick={() => handleCopy(token, 'Token')}
                                    className="flex items-center gap-1.5 px-2 py-1 text-xs text-[var(--accent-muted)] hover:text-white hover:bg-white/5 rounded transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {copiedSection === 'Token' ? (
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                    )}
                                    {copiedSection === 'Token' ? 'Copied' : 'Copy'}
                                </motion.button>
                            )}
                        </div>
                        <div className="p-4">
                            <div
                                className={`relative rounded-lg border transition-all ${isInputFocused
                                        ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
                                        : 'border-[var(--border-color)]'
                                    }`}
                            >
                                <textarea
                                    className={`w-full h-[200px] bg-[var(--background)] rounded-lg p-4 font-mono text-sm focus:outline-none resize-none ${customScrollbarClass}`}
                                    placeholder="Paste your JWT here (header.payload.signature)"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    onFocus={() => setIsInputFocused(true)}
                                    onBlur={() => setIsInputFocused(false)}
                                    spellCheck={false}
                                />
                            </div>

                            {/* Status */}
                            <div className="mt-3 flex items-center gap-2">
                                <AnimatePresence mode="wait">
                                    {!token && (
                                        <motion.span
                                            key="waiting"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-sm text-[var(--accent-muted)] flex items-center gap-2"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-gray-500" />
                                            Waiting for input...
                                        </motion.span>
                                    )}
                                    {token && decoded?.valid && (
                                        <motion.span
                                            key="valid"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-sm text-green-400 flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Valid JWT Format
                                            {isExpired && (
                                                <span className="text-yellow-400 flex items-center gap-1 ml-2">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    Expired
                                                </span>
                                            )}
                                        </motion.span>
                                    )}
                                    {token && !decoded?.valid && (
                                        <motion.span
                                            key="invalid"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-sm text-red-400 flex items-center gap-2"
                                        >
                                            <AlertTriangle className="w-4 h-4" />
                                            {decoded?.error || 'Invalid Token'}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    <motion.div
                        className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-200 text-sm flex items-start gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-400" />
                        <div>
                            <p className="font-medium text-yellow-400 mb-1">Security Note</p>
                            <p className="text-yellow-200/80">
                                Tokens are decoded purely client-side. We do not validate signatures or store any data. Never share your secret keys.
                            </p>
                        </div>
                    </motion.div>

                    {/* Claims Summary */}
                    <AnimatePresence>
                        {decoded?.valid && claims.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-[var(--border-color)]">
                                    <span className="text-sm font-medium">Claims Summary</span>
                                </div>
                                <div className="p-2">
                                    {claims.map((claim, index) => (
                                        <motion.div
                                            key={claim.key}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${claim.isExpired ? 'bg-red-500/10' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 text-[var(--accent-muted)]">
                                                <claim.icon className={`w-4 h-4 ${claim.isExpired ? 'text-red-400' : ''}`} />
                                                <span className="font-medium">{claim.label}</span>
                                                <span className="text-xs text-gray-600">({claim.key})</span>
                                            </div>
                                            <span className={`font-mono text-xs ${claim.isExpired ? 'text-red-400' : 'text-white'}`}>
                                                {claim.value}
                                                {claim.isExpired && <span className="ml-2 text-red-400">(Expired)</span>}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Output Panel */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Header */}
                    <motion.div
                        className="border border-[var(--border-color)] rounded-xl overflow-hidden"
                        whileHover={{ borderColor: 'rgba(251, 1, 91, 0.3)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-[#fb015b]/10 border-b border-[#fb015b]/20 px-4 py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#fb015b]" />
                                <span className="text-[#fb015b] font-mono font-bold text-sm">HEADER</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--accent-muted)]">Algorithm & Token Type</span>
                                {decoded?.valid && (
                                    <motion.button
                                        onClick={() => handleCopy(decoded.header, 'Header')}
                                        className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/10 rounded transition-colors"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {copiedSection === 'Header' ? (
                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                        <div className="bg-[#0d1117] p-4 max-h-[150px] overflow-auto">
                            <pre className={`text-sm font-mono text-[#fb015b] whitespace-pre-wrap ${customScrollbarClass}`}>
                                {decoded?.valid ? decoded.header : '{\n  "alg": "...",\n  "typ": "JWT"\n}'}
                            </pre>
                        </div>
                    </motion.div>

                    {/* Payload */}
                    <motion.div
                        className="border border-[var(--border-color)] rounded-xl overflow-hidden"
                        whileHover={{ borderColor: 'rgba(214, 58, 255, 0.3)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-[#d63aff]/10 border-b border-[#d63aff]/20 px-4 py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#d63aff]" />
                                <span className="text-[#d63aff] font-mono font-bold text-sm">PAYLOAD</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--accent-muted)]">Claims & Data</span>
                                {decoded?.valid && (
                                    <motion.button
                                        onClick={() => handleCopy(decoded.payload, 'Payload')}
                                        className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/10 rounded transition-colors"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {copiedSection === 'Payload' ? (
                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                        <div className={`bg-[#0d1117] p-4 max-h-[200px] overflow-auto ${customScrollbarClass}`}>
                            <pre className="text-sm font-mono text-[#d63aff] whitespace-pre-wrap">
                                {decoded?.valid ? decoded.payload : '{\n  "sub": "...",\n  "name": "...",\n  "iat": 0\n}'}
                            </pre>
                        </div>
                    </motion.div>

                    {/* Signature */}
                    <motion.div
                        className="border border-[var(--border-color)] rounded-xl overflow-hidden"
                        whileHover={{ borderColor: 'rgba(0, 185, 241, 0.3)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="bg-[#00b9f1]/10 border-b border-[#00b9f1]/20 px-4 py-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#00b9f1]" />
                                <span className="text-[#00b9f1] font-mono font-bold text-sm">SIGNATURE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[var(--accent-muted)]">Verification</span>
                                {decoded?.valid && decoded.signature && (
                                    <motion.button
                                        onClick={() => handleCopy(decoded.signature, 'Signature')}
                                        className="p-1.5 text-[var(--accent-muted)] hover:text-white hover:bg-white/10 rounded transition-colors"
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {copiedSection === 'Signature' ? (
                                            <Check className="w-3.5 h-3.5 text-green-400" />
                                        ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                        )}
                                    </motion.button>
                                )}
                            </div>
                        </div>
                        <div className="bg-[#0d1117] p-4">
                            <pre className="text-sm font-mono text-[#00b9f1] whitespace-pre-wrap break-all">
                                {decoded?.valid && decoded.headerObj ? (
                                    <>
                                        <span className="text-gray-500">{decoded.headerObj.alg as string || 'HMACSHA256'}(</span>
                                        {'\n  '}base64UrlEncode(<span className="text-[#fb015b]">header</span>) + "." +
                                        {'\n  '}base64UrlEncode(<span className="text-[#d63aff]">payload</span>),
                                        {'\n  '}<span className="text-yellow-400">your-256-bit-secret</span>
                                        {'\n'}<span className="text-gray-500">)</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-500">ALGORITHM(</span>
                                        {'\n  '}base64UrlEncode(header) + "." +
                                        {'\n  '}base64UrlEncode(payload),
                                        {'\n  '}secret
                                        {'\n'}<span className="text-gray-500">)</span>
                                    </>
                                )}
                            </pre>
                        </div>
                        {decoded?.valid && decoded.signature && (
                            <div className="px-4 py-3 bg-[#0a0a0a] border-t border-gray-800">
                                <div className="text-xs text-gray-500 mb-1">Encoded Signature:</div>
                                <code className="text-xs font-mono text-[#00b9f1] break-all">
                                    {decoded.signature}
                                </code>
                            </div>
                        )}
                    </motion.div>

                    {/* Algorithm Info */}
                    {decoded?.valid && !!decoded.headerObj?.alg && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm flex items-start gap-3"
                        >
                            <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                            <div>
                                <p className="font-medium text-blue-400 mb-1">Algorithm: {decoded.headerObj.alg as string}</p>
                                <p className="text-blue-200/80 text-xs">
                                    {decoded.headerObj.alg === 'HS256' && 'HMAC using SHA-256 hash algorithm'}
                                    {decoded.headerObj.alg === 'HS384' && 'HMAC using SHA-384 hash algorithm'}
                                    {decoded.headerObj.alg === 'HS512' && 'HMAC using SHA-512 hash algorithm'}
                                    {decoded.headerObj.alg === 'RS256' && 'RSA using SHA-256 hash algorithm'}
                                    {decoded.headerObj.alg === 'RS384' && 'RSA using SHA-384 hash algorithm'}
                                    {decoded.headerObj.alg === 'RS512' && 'RSA using SHA-512 hash algorithm'}
                                    {decoded.headerObj.alg === 'ES256' && 'ECDSA using P-256 curve and SHA-256'}
                                    {decoded.headerObj.alg === 'ES384' && 'ECDSA using P-384 curve and SHA-384'}
                                    {decoded.headerObj.alg === 'ES512' && 'ECDSA using P-521 curve and SHA-512'}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </>
    );
}