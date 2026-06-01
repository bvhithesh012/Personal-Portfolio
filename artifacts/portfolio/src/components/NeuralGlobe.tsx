import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TECH_LABELS = [
  { label: 'Python',    angle: 0,    radius: 130, speed: 14, color: '#FFB000' },
  { label: 'React',     angle: 72,   radius: 110, speed: 20, color: '#61DAFB' },
  { label: 'SQL',       angle: 144,  radius: 130, speed: 14, color: '#FF6B00' },
  { label: 'AI/ML',     angle: 216,  radius: 110, speed: 20, color: '#B87333' },
  { label: 'FastAPI',   angle: 288,  radius: 130, speed: 14, color: '#A8A8A8' },
];

const OUTER_LABELS = [
  { label: 'Pandas',    angle: 36,  radius: 168, speed: 28, color: '#FFB000' },
  { label: 'NumPy',     angle: 132, radius: 168, speed: 28, color: '#B87333' },
  { label: 'OpenCV',    angle: 228, radius: 168, speed: 28, color: '#FF6B00' },
  { label: 'Supabase',  angle: 324, radius: 168, speed: 28, color: '#3ECF8E' },
];

function degToRad(d: number) { return (d * Math.PI) / 180; }

interface OrbiterProps {
  label: string;
  initialAngle: number;
  radius: number;
  speed: number;
  color: string;
  cx: number;
  cy: number;
}

function Orbiter({ label, initialAngle, radius, speed, color, cx, cy }: OrbiterProps) {
  const [angle, setAngle] = useState(initialAngle);
  const raf = useRef<number>(0);
  const prev = useRef<number>(0);

  useEffect(() => {
    const tick = (now: number) => {
      const dt = prev.current ? (now - prev.current) / 1000 : 0;
      prev.current = now;
      setAngle(a => a + (360 / speed) * dt);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [speed]);

  const rad = degToRad(angle);
  const x = cx + Math.cos(rad) * radius;
  const y = cy + Math.sin(rad) * radius;

  return (
    <g>
      {/* Dot */}
      <circle cx={x} cy={y} r={3.5} fill={color} opacity={0.9} />
      <circle cx={x} cy={y} r={7} fill={color} opacity={0.12} />
      {/* Label */}
      <text
        x={x}
        y={y - 11}
        textAnchor="middle"
        fontSize={9}
        fill={color}
        fontFamily="'JetBrains Mono', monospace"
        opacity={0.85}
      >
        {label}
      </text>
    </g>
  );
}

export function NeuralGlobe() {
  const W = 340;
  const H = 340;
  const CX = W / 2;
  const CY = H / 2;
  const [pulse, setPulse] = useState(0);
  const raf = useRef<number>(0);
  const start = useRef<number>(0);

  useEffect(() => {
    const tick = (now: number) => {
      if (!start.current) start.current = now;
      setPulse((now - start.current) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const coreGlow = 0.5 + 0.5 * Math.sin(pulse * 1.8);
  const ring1Rot = pulse * 18;   // degrees
  const ring2Rot = -pulse * 12;
  const ring3Rot = pulse * 8;

  // Neural network node positions (static seed)
  const nodes = [
    [CX, CY - 50], [CX + 42, CY - 28], [CX + 42, CY + 28],
    [CX, CY + 52], [CX - 42, CY + 28], [CX - 42, CY - 28],
    [CX + 68, CY - 48], [CX + 72, CY + 52], [CX - 68, CY + 48],
    [CX - 72, CY - 52], [CX, CY - 88], [CX, CY + 88],
  ] as [number, number][];

  // Connections between nodes
  const connections: [number, number][] = [
    [0,1],[0,5],[0,4],[0,2],[0,3],
    [1,2],[2,3],[3,4],[4,5],[5,1],
    [1,6],[2,7],[3,8],[4,9],[5,10],
    [6,7],[7,8],[8,9],[9,10],[10,11],[11,6],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center select-none"
      style={{ width: W, height: H }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 320, height: 320,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          background: `radial-gradient(circle, rgba(255,107,0,${0.04 + coreGlow * 0.04}), transparent 65%)`,
          filter: 'blur(20px)',
        }}
      />

      <svg width={W} height={H} style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
        <defs>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.9} />
            <stop offset="60%" stopColor="#B87333" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#FFB000" stopOpacity={0} />
          </radialGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.35 + coreGlow * 0.2} />
            <stop offset="100%" stopColor="#FF6B00" stopOpacity={0} />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Neural network connections */}
        {connections.map(([a, b], i) => {
          const opacity = 0.08 + 0.06 * Math.sin(pulse * 0.8 + i * 0.4);
          return (
            <line
              key={i}
              x1={nodes[a][0]} y1={nodes[a][1]}
              x2={nodes[b][0]} y2={nodes[b][1]}
              stroke="#FF6B00"
              strokeWidth={0.6}
              opacity={opacity}
            />
          );
        })}

        {/* Neural network nodes */}
        {nodes.map(([x, y], i) => {
          const nodeGlow = 0.4 + 0.6 * Math.abs(Math.sin(pulse * 1.2 + i * 0.7));
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={5} fill="#FF6B00" opacity={nodeGlow * 0.9} filter="url(#glow)" />
              <circle cx={x} cy={y} r={10} fill="#FF6B00" opacity={nodeGlow * 0.06} />
            </g>
          );
        })}

        {/* Orbit ring 1 */}
        <ellipse
          cx={CX} cy={CY}
          rx={95} ry={30}
          fill="none"
          stroke="#FF6B00"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          opacity={0.3}
          transform={`rotate(${ring1Rot}, ${CX}, ${CY})`}
        />
        {/* Orbit ring 2 */}
        <ellipse
          cx={CX} cy={CY}
          rx={80} ry={95}
          fill="none"
          stroke="#B87333"
          strokeWidth={0.6}
          strokeDasharray="3 8"
          opacity={0.25}
          transform={`rotate(${ring2Rot}, ${CX}, ${CY})`}
        />
        {/* Orbit ring 3 */}
        <ellipse
          cx={CX} cy={CY}
          rx={110} ry={60}
          fill="none"
          stroke="#FFB000"
          strokeWidth={0.5}
          strokeDasharray="2 10"
          opacity={0.18}
          transform={`rotate(${ring3Rot}, ${CX}, ${CY})`}
        />

        {/* Concentric circle guides (static) */}
        {[60, 90, 130, 168].map((r, i) => (
          <circle
            key={i}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="rgba(255,107,0,0.07)"
            strokeWidth={0.5}
          />
        ))}

        {/* Core glow sphere */}
        <circle cx={CX} cy={CY} r={35} fill="url(#glowGrad)" />
        <circle cx={CX} cy={CY} r={22} fill="url(#coreGrad)" opacity={0.85} />
        <circle cx={CX} cy={CY} r={10} fill="#FF6B00" opacity={0.9} filter="url(#glow)" />
        {/* Highlight */}
        <circle cx={CX - 7} cy={CY - 7} r={4} fill="white" opacity={0.25} />

        {/* Inner label */}
        <text x={CX} y={CY + 42} textAnchor="middle" fontSize={8}
          fill="#FF6B00" fontFamily="'JetBrains Mono', monospace" opacity={0.6}
          letterSpacing="2">
          CORE_AI
        </text>

        {/* Orbiters — inner ring */}
        {TECH_LABELS.map(o => (
          <Orbiter key={o.label} label={o.label}
            initialAngle={o.angle} radius={o.radius}
            speed={o.speed} color={o.color}
            cx={CX} cy={CY} />
        ))}

        {/* Orbiters — outer ring */}
        {OUTER_LABELS.map(o => (
          <Orbiter key={o.label} label={o.label}
            initialAngle={o.angle} radius={o.radius}
            speed={o.speed} color={o.color}
            cx={CX} cy={CY} />
        ))}
      </svg>
    </motion.div>
  );
}
