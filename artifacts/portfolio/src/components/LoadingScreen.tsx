import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => { onComplete(); }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: '#0A0A0A' }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,107,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative flex flex-col items-center gap-8 z-10">
          {/* Animated hexagon logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{ background: 'radial-gradient(circle, #FF6B00, transparent)' }} />
            <svg width="88" height="88" viewBox="0 0 100 100" className="relative z-10">
              <motion.polygon
                points="50,8 92,31 92,69 50,92 8,69 8,31"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
              <motion.polygon
                points="50,20 80,36 80,64 50,80 20,64 20,36"
                fill="none"
                stroke="#B87333"
                strokeWidth="0.8"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
              />
              <motion.text
                x="50" y="56"
                textAnchor="middle"
                fill="#FFB000"
                fontSize="18"
                fontFamily="Space Mono, monospace"
                fontWeight="700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                BVH
              </motion.text>
            </svg>
          </motion.div>

          {/* Name reveal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="text-xl md:text-3xl font-bold tracking-[0.3em] uppercase"
              style={{ color: '#F5F5F5' }}
            >
              BOJANALA V. HITHESH
            </motion.h1>
          </div>

          {/* Loading bar */}
          <motion.div
            className="w-56 h-px rounded-full overflow-hidden"
            style={{ background: '#1A1A1A' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg, #FF6B00, #FFB000)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.6 }}
            />
          </motion.div>

          {/* Status text */}
          <motion.p
            className="font-mono text-xs tracking-[0.2em] uppercase"
            style={{ color: '#71797E' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Initializing Portfolio...
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
