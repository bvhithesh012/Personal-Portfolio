import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut,
  Maximize2, Minimize2, Download, ExternalLink, Shield
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  issueDate: string;
  category: string;
  accent: string;
  glow: string;
  image: string | null;
  file: string | null;
  verificationLink: string | null;
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'hackerrank-sql',
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    issuerShort: 'HR',
    issueDate: '2024',
    category: 'Database',
    accent: '#FF6B00',
    glow: 'rgba(255,107,0,0.35)',
    image: null,
    file: '/certs/hackerrank-sql.pdf',
    verificationLink: 'https://www.hackerrank.com/certificates',
  },
  {
    id: 'hackerrank-python',
    title: 'Python',
    issuer: 'HackerRank',
    issuerShort: 'HR',
    issueDate: '2024',
    category: 'Programming',
    accent: '#B87333',
    glow: 'rgba(184,115,51,0.35)',
    image: null,
    file: '/certs/hackerrank-python.pdf',
    verificationLink: 'https://www.hackerrank.com/certificates',
  },
  {
    id: 'forage-genai',
    title: 'GenAI Powered Data Analytics Job Simulation',
    issuer: 'Forage',
    issuerShort: 'FG',
    issueDate: 'February 2026',
    category: 'AI & Data',
    accent: '#FFB000',
    glow: 'rgba(255,176,0,0.35)',
    image: null,
    file: '/certs/forage-genai.pdf',
    verificationLink: null,
  },
  {
    id: 'ibm-python',
    title: 'Data Analysis with Python',
    issuer: 'IBM / cognitiveclass',
    issuerShort: 'IBM',
    issueDate: '2024',
    category: 'Data Science',
    accent: '#60a5fa',
    glow: 'rgba(96,165,250,0.3)',
    image: null,
    file: '/certs/ibm-python.pdf',
    verificationLink: null,
  },
];

// ─── Placeholder Certificate (renders when no image is available) ─────────────

function CertPlaceholder({ cert, large = false }: { cert: Certificate; large?: boolean }) {
  const pad = large ? 'p-10' : 'p-5';
  const titleSize = large ? 'text-2xl' : 'text-sm';
  const subSize = large ? 'text-base' : 'text-xs';
  const iconSize = large ? 56 : 28;
  const borderW = large ? 2 : 1;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${pad} relative overflow-hidden`}
      style={{ background: '#0e0e0e' }}
    >
      {/* Outer decorative border */}
      <div className="absolute inset-3 rounded-lg pointer-events-none"
        style={{ border: `${borderW}px solid ${cert.accent}30` }} />
      <div className="absolute inset-5 rounded-lg pointer-events-none"
        style={{ border: `${borderW}px dashed ${cert.accent}15` }} />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${cert.glow.replace('0.35','0.06').replace('0.3','0.05')}, transparent 65%)` }} />

      {/* Corner ornaments */}
      {[['top-4 left-4','br'],['top-4 right-4','bl'],['bottom-4 left-4','tr'],['bottom-4 right-4','tl']].map(([pos, corner], i) => (
        <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none`}
          style={{
            borderTop: corner.includes('t') ? `2px solid ${cert.accent}60` : 'none',
            borderBottom: corner.includes('b') ? `2px solid ${cert.accent}60` : 'none',
            borderLeft: corner.includes('l') ? `2px solid ${cert.accent}60` : 'none',
            borderRight: corner.includes('r') ? `2px solid ${cert.accent}60` : 'none',
          }} />
      ))}

      {/* Seal */}
      <div className="relative flex flex-col items-center gap-3 z-10 text-center">
        <div className="rounded-full flex items-center justify-center"
          style={{
            width: iconSize * 1.8, height: iconSize * 1.8,
            background: `${cert.accent}12`,
            border: `2px solid ${cert.accent}35`,
            boxShadow: `0 0 20px ${cert.glow}`
          }}>
          <Award size={iconSize * 0.7} style={{ color: cert.accent }} />
        </div>

        <div>
          <p className={`font-mono uppercase tracking-widest mb-1 ${subSize}`} style={{ color: cert.accent, opacity: 0.7 }}>
            Certificate of Achievement
          </p>
          <p className={`font-bold leading-snug max-w-xs ${titleSize}`} style={{ color: '#F5F5F5' }}>
            {cert.title}
          </p>
          <p className={`mt-1 font-mono ${subSize}`} style={{ color: '#71797E' }}>
            {cert.issuer} · {cert.issueDate}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <Shield size={large ? 14 : 10} style={{ color: cert.accent }} />
          <span className="font-mono uppercase tracking-widest" style={{ fontSize: large ? 11 : 8, color: cert.accent }}>
            Verified Credential
          </span>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-8 left-1/4 right-1/4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}40, transparent)` }} />
    </div>
  );
}

// ─── Certificate Card (grid item) ────────────────────────────────────────────

function CertCard({ cert, onClick }: { cert: Certificate; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="cursor-pointer group relative rounded-xl overflow-hidden"
      style={{
        background: hovered ? 'rgba(20,20,20,0.95)' : 'rgba(17,17,17,0.85)',
        border: `1px solid ${hovered ? cert.accent + '40' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 12px 40px ${cert.glow}` : 'none',
        transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      {/* Top glow accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)`, opacity: hovered ? 1 : 0 }} />

      {/* Certificate preview */}
      <div className="aspect-[4/3] overflow-hidden relative">
        {cert.image ? (
          <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
        ) : (
          <CertPlaceholder cert={cert} />
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: `rgba(0,0,0,0.55)`,
            opacity: hovered ? 1 : 0,
            backdropFilter: 'blur(2px)'
          }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: `${cert.accent}25`, border: `1px solid ${cert.accent}60` }}>
              <ZoomIn size={20} style={{ color: cert.accent }} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#F5F5F5' }}>View</span>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-sm leading-snug" style={{ color: '#F5F5F5' }}>{cert.title}</h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
            style={{ background: `${cert.accent}15`, border: `1px solid ${cert.accent}30`, color: cert.accent }}>
            {cert.category}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold font-mono"
              style={{ background: `${cert.accent}20`, color: cert.accent }}>
              {cert.issuerShort}
            </div>
            <span className="text-xs font-mono" style={{ color: '#71797E' }}>{cert.issuer}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield size={10} style={{ color: cert.accent }} />
            <span className="text-[10px] font-mono" style={{ color: cert.accent }}>Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile Carousel ─────────────────────────────────────────────────────────

function MobileCarousel({ certs, onSelect }: { certs: Certificate[]; onSelect: (i: number) => void }) {
  const [current, setCurrent] = useState(0);

  const goTo = (i: number) => {
    if (i < 0 || i >= certs.length) return;
    setCurrent(i);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-4 overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: -current * (320 + 16) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: -(certs.length - 1) * (320 + 16), right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60 && current < certs.length - 1) goTo(current + 1);
            if (info.offset.x > 60 && current > 0) goTo(current - 1);
          }}
        >
          {certs.map((cert, i) => (
            <div key={cert.id} className="flex-shrink-0 w-72">
              <CertCard cert={cert} onClick={() => onSelect(i)} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {certs.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{ background: i === current ? '#FF6B00' : 'rgba(255,255,255,0.15)', transform: i === current ? 'scale(1.3)' : 'scale(1)' }} />
        ))}
      </div>
    </div>
  );
}

// ─── Certificate Viewer Modal ─────────────────────────────────────────────────

function CertificateViewer({
  certs, initialIndex, onClose
}: { certs: Certificate[]; initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cert = certs[index];
  const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const zoomIdx = ZOOM_STEPS.indexOf(zoom);

  const zoomIn = () => setZoom(ZOOM_STEPS[Math.min(zoomIdx + 1, ZOOM_STEPS.length - 1)]);
  const zoomOut = () => setZoom(ZOOM_STEPS[Math.max(zoomIdx - 1, 0)]);
  const prev = () => { setIndex(i => Math.max(0, i - 1)); setZoom(1); };
  const next = () => { setIndex(i => Math.min(certs.length - 1, i + 1)); setZoom(1); };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // ESC / keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === '+') zoomIn();
      if (e.key === '-') zoomOut();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, zoomIdx]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Exit fullscreen on close
  useEffect(() => {
    return () => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
      >
        {/* Modal panel */}
        <motion.div
          className="relative flex flex-col rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: 'min(92vw, 860px)',
            maxHeight: '90vh',
            background: 'rgba(14,14,14,0.97)',
            border: `1px solid ${cert.accent}30`,
            boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 40px ${cert.glow}`,
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
            style={{ borderBottom: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(0,0,0,0.4)' }}>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold font-mono"
                style={{ background: `${cert.accent}20`, color: cert.accent }}>
                {cert.issuerShort}
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight" style={{ color: '#F5F5F5' }}>{cert.title}</p>
                <p className="text-[11px] font-mono" style={{ color: '#71797E' }}>{cert.issuer} · {cert.issueDate}</p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1.5">
              {/* Zoom out */}
              <ToolButton icon={<ZoomOut size={15} />} onClick={zoomOut} disabled={zoomIdx === 0}
                title="Zoom out (−)" color={cert.accent} />
              {/* Zoom label */}
              <span className="text-xs font-mono px-2 py-1 rounded min-w-[3.5rem] text-center"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#A8A8A8' }}>
                {Math.round(zoom * 100)}%
              </span>
              {/* Zoom in */}
              <ToolButton icon={<ZoomIn size={15} />} onClick={zoomIn} disabled={zoomIdx === ZOOM_STEPS.length - 1}
                title="Zoom in (+)" color={cert.accent} />

              <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Fullscreen */}
              <ToolButton icon={isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                onClick={toggleFullscreen} title="Toggle fullscreen" color={cert.accent} />

              {/* Verification link */}
              {cert.verificationLink && (
                <ToolButton icon={<ExternalLink size={15} />}
                  onClick={() => window.open(cert.verificationLink!, '_blank')}
                  title="Verify certificate" color={cert.accent} />
              )}

              {/* Download PDF */}
              {cert.file && (
                <a href={cert.file} download>
                  <ToolButton icon={<Download size={15} />} onClick={() => {}} title="Download certificate" color={cert.accent} />
                </a>
              )}

              <div className="w-px h-4 mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} />

              {/* Close */}
              <ToolButton icon={<X size={16} />} onClick={onClose} title="Close (Esc)" color="#ff4444" danger />
            </div>
          </div>

          {/* Certificate display */}
          <div className="flex-1 flex flex-col" style={{ minHeight: 0, background: '#080808' }}>
            {cert.file ? (
              <motion.div
                key={index}
                className="flex-1 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                <iframe
                  src={`${cert.file}#toolbar=1&navpanes=0&view=FitH`}
                  title={cert.title}
                  className="w-full flex-1 border-0"
                  style={{ minHeight: '60vh' }}
                />
              </motion.div>
            ) : cert.image ? (
              <motion.div
                key={index}
                className="flex-1 flex items-center justify-center p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: zoom }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: 'center center' }}
              >
                <img src={cert.image} alt={cert.title}
                  className="max-w-full max-h-full object-contain rounded-lg" />
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full rounded-lg overflow-hidden" style={{ maxWidth: 720, aspectRatio: '4/3', border: `1px solid ${cert.accent}25` }}>
                  <CertPlaceholder cert={cert} large />
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar — nav + counter */}
          <div className="flex items-center justify-between px-5 py-3 flex-shrink-0"
            style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(0,0,0,0.4)' }}>
            <button onClick={prev} disabled={index === 0}
              className="flex items-center gap-2 text-sm font-mono transition-colors duration-200 disabled:opacity-30"
              style={{ color: index === 0 ? '#71797E' : '#A8A8A8' }}
              onMouseEnter={e => { if (index > 0) (e.currentTarget as HTMLElement).style.color = '#FF6B00'; }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = index === 0 ? '#71797E' : '#A8A8A8'}
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {/* Dot navigation */}
            <div className="flex items-center gap-2">
              {certs.map((c, i) => (
                <button key={i} onClick={() => { setIndex(i); setZoom(1); }}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{
                    background: i === index ? cert.accent : 'rgba(255,255,255,0.15)',
                    transform: i === index ? 'scale(1.4)' : 'scale(1)',
                  }} />
              ))}
              <span className="ml-2 text-xs font-mono" style={{ color: '#71797E' }}>
                {index + 1} / {certs.length}
              </span>
            </div>

            <button onClick={next} disabled={index === certs.length - 1}
              className="flex items-center gap-2 text-sm font-mono transition-colors duration-200 disabled:opacity-30"
              style={{ color: index === certs.length - 1 ? '#71797E' : '#A8A8A8' }}
              onMouseEnter={e => { if (index < certs.length - 1) (e.currentTarget as HTMLElement).style.color = '#FF6B00'; }}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = index === certs.length - 1 ? '#71797E' : '#A8A8A8'}
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ToolButton({
  icon, onClick, title, disabled, color, danger
}: {
  icon: React.ReactNode; onClick: () => void; title: string;
  disabled?: boolean; color?: string; danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-7 h-7 rounded flex items-center justify-center transition-all duration-150 disabled:opacity-30"
      style={{ background: 'rgba(255,255,255,0.04)', color: '#A8A8A8' }}
      onMouseEnter={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLElement;
          el.style.background = danger ? 'rgba(255,68,68,0.15)' : `${color}20`;
          el.style.color = danger ? '#ff4444' : (color || '#FF6B00');
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.04)';
        el.style.color = '#A8A8A8';
      }}
    >
      {icon}
    </button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function Certificates() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openViewer = useCallback((i: number) => setViewerIndex(i), []);
  const closeViewer = useCallback(() => setViewerIndex(null), []);

  return (
    <>
      <section id="certificates" className="py-24 relative z-10">
        <div className="container mx-auto px-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4" style={{ color: '#F5F5F5' }}>
              <Award size={36} style={{ color: '#FF6B00' }} />
              Certifications
            </h2>
            <div className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg,#FF6B00,#B87333)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm mb-12 max-w-xl"
            style={{ color: '#71797E' }}
          >
            Click any certificate to open the full viewer with zoom, navigation, and verification links.
          </motion.p>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTIFICATES.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} onClick={() => openViewer(i)} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="sm:hidden">
            <MobileCarousel certs={CERTIFICATES} onSelect={openViewer} />
          </div>


        </div>
      </section>

      {/* Viewer modal — rendered at portal level via z-index */}
      {viewerIndex !== null && (
        <CertificateViewer
          certs={CERTIFICATES}
          initialIndex={viewerIndex}
          onClose={closeViewer}
        />
      )}
    </>
  );
}
