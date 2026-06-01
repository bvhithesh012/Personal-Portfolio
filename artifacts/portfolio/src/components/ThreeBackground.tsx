import { Component, type ReactNode, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

class WebGLErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError(); }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;
    if ((gl as WebGLRenderingContext).isContextLost()) return false;
    return true;
  } catch { return false; }
}

// ─── Neural Network Nodes + Lines ─────────────────────────────────────────────

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const t = useRef(0);

  const { nodes, connections } = useMemo(() => {
    const rng = (s: number) => {
      let x = Math.sin(s) * 43758.5453;
      return x - Math.floor(x);
    };
    const n: [number, number, number][] = [];
    for (let i = 0; i < 28; i++) {
      n.push([
        (rng(i * 3 + 1) - 0.5) * 18,
        (rng(i * 3 + 2) - 0.5) * 10,
        (rng(i * 3 + 3) - 0.5) * 8 - 4,
      ]);
    }

    const c: [number, number][] = [];
    for (let i = 0; i < n.length; i++) {
      for (let j = i + 1; j < n.length; j++) {
        const dx = n[i][0] - n[j][0];
        const dy = n[i][1] - n[j][1];
        const dz = n[i][2] - n[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 4.5) c.push([i, j]);
      }
    }
    return { nodes: n, connections: c };
  }, []);

  // Build line segments geometry
  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      positions[i * 6 + 0] = nodes[a][0];
      positions[i * 6 + 1] = nodes[a][1];
      positions[i * 6 + 2] = nodes[a][2];
      positions[i * 6 + 3] = nodes[b][0];
      positions[i * 6 + 4] = nodes[b][1];
      positions[i * 6 + 5] = nodes[b][2];
    });
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [nodes, connections]);

  useFrame((_, delta) => {
    t.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = t.current * 0.04;
      groupRef.current.rotation.x = Math.sin(t.current * 0.025) * 0.08;
    }
    if (linesRef.current) {
      (linesRef.current.material as THREE.LineBasicMaterial).opacity =
        0.06 + 0.04 * Math.sin(t.current * 0.9);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={linesGeo}>
        <lineBasicMaterial color="#FF6B00" opacity={0.08} transparent />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.065, 6, 6]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#FF6B00' : i % 3 === 1 ? '#B87333' : '#FFB000'} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Floating Geometric Shapes ────────────────────────────────────────────────

function FloatingShapes() {
  return (
    <>
      <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[2.5, 1, -5]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#FF6B00" wireframe distort={0.15} speed={1.5} opacity={0.18} transparent />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={1.8}>
        <mesh position={[-3, -1, -4]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <MeshDistortMaterial color="#B87333" wireframe distort={0.2} speed={1.2} opacity={0.15} transparent />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.9} floatIntensity={1}>
        <mesh position={[0, -2.5, -6]}>
          <torusGeometry args={[1, 0.35, 16, 100]} />
          <MeshDistortMaterial color="#FFB000" wireframe distort={0.08} speed={0.8} opacity={0.12} transparent />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-1.5, 2, -7]}>
          <tetrahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial color="#FF6B00" wireframe distort={0.1} speed={1} opacity={0.1} transparent />
        </mesh>
      </Float>
    </>
  );
}

// ─── Subtle camera drift ──────────────────────────────────────────────────────

function CameraRig() {
  const { camera } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta;
    camera.position.x = Math.sin(t.current * 0.07) * 0.4;
    camera.position.y = Math.sin(t.current * 0.05) * 0.2;
  });
  return null;
}

// ─── CSS Fallback ─────────────────────────────────────────────────────────────

function CSSFallbackBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(ellipse at 15% 50%, rgba(255,107,0,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 20%, rgba(184,115,51,0.07) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 85%, rgba(255,176,0,0.05) 0%, transparent 45%)`
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(255,107,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,107,0,0.035) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        animation: 'gridMove 25s linear infinite'
      }} />
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,107,0,0.8) 40px, rgba(255,107,0,0.8) 41px)`
      }} />
      <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.07), transparent)', animation: 'orb1 9s ease-in-out infinite' }} />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(184,115,51,0.07), transparent)', animation: 'orb2 12s ease-in-out infinite' }} />
      <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,176,0,0.05), transparent)', animation: 'orb3 15s ease-in-out infinite' }} />
      <style>{`
        @keyframes gridMove { from { transform: translateY(0); } to { transform: translateY(80px); } }
        @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(25px,-25px) scale(1.08); } }
        @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-18px,18px) scale(1.05); } }
        @keyframes orb3 { 0%,100% { transform: translate(0,0); } 33% { transform: translate(15px,15px); } 66% { transform: translate(-8px,-15px); } }
      `}</style>
    </div>
  );
}

// ─── WebGL Scene ──────────────────────────────────────────────────────────────

function ThreeScene({ onError }: { onError: () => void }) {
  return (
    <div className="fixed inset-0 z-[-1]" style={{ background: '#0A0A0A' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ failIfMajorPerformanceCaveat: false, antialias: false }}
        onCreated={({ gl }) => {
          gl.getContext().canvas.addEventListener('webglcontextlost', onError);
        }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[10, 10, 10]} intensity={0.7} color="#FF6B00" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B87333" />
        <Stars radius={100} depth={50} count={3500} factor={3} saturation={0} fade speed={0.5} />
        <NeuralNetwork />
        <FloatingShapes />
        <CameraRig />
        <fog attach="fog" args={['#0A0A0A', 8, 20]} />
      </Canvas>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ThreeBackground() {
  const [useWebGL, setUseWebGL] = useState<boolean | null>(null);
  useEffect(() => { setUseWebGL(checkWebGL()); }, []);
  const handleError = () => setUseWebGL(false);
  if (useWebGL === null) return <CSSFallbackBackground />;
  if (!useWebGL) return <CSSFallbackBackground />;
  return (
    <WebGLErrorBoundary onError={handleError}>
      <ThreeScene onError={handleError} />
    </WebGLErrorBoundary>
  );
}
