import { Component, type ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei';

class WebGLErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return false;
    // Check the context isn't immediately lost
    if ((gl as WebGLRenderingContext).isContextLost()) return false;
    return true;
  } catch {
    return false;
  }
}

function FloatingShapes() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2, 1, -5]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#00f5ff" wireframe distort={0.2} speed={2} opacity={0.3} transparent />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-3, -1, -4]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <MeshDistortMaterial color="#a855f7" wireframe distort={0.3} speed={1.5} opacity={0.3} transparent />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, -2, -6]}>
          <torusGeometry args={[1, 0.4, 16, 100]} />
          <MeshDistortMaterial color="#3b82f6" wireframe distort={0.1} speed={1} opacity={0.2} transparent />
        </mesh>
      </Float>
    </>
  );
}

function CSSFallbackBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050510] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.10) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(0,245,255,0.07) 0%, transparent 50%)`,
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      {/* Glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.08), transparent)',
          animation: 'orb1 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08), transparent)',
          animation: 'orb2 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent)',
          animation: 'orb3 12s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes gridMove {
          from { transform: translateY(0); }
          to   { transform: translateY(60px); }
        }
        @keyframes orb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(30px,-30px) scale(1.1); }
        }
        @keyframes orb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-20px,20px) scale(1.05); }
        }
        @keyframes orb3 {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(20px,20px); }
          66%      { transform: translate(-10px,-20px); }
        }
      `}</style>
    </div>
  );
}

function ThreeScene({ onError }: { onError: () => void }) {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050510]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ failIfMajorPerformanceCaveat: false, antialias: false }}
        onCreated={({ gl }) => {
          gl.getContext().canvas.addEventListener('webglcontextlost', onError);
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <FloatingShapes />
        <fog attach="fog" args={['#050510', 5, 15]} />
      </Canvas>
    </div>
  );
}

export function ThreeBackground() {
  const [useWebGL, setUseWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setUseWebGL(checkWebGL());
  }, []);

  const handleError = () => setUseWebGL(false);

  if (useWebGL === null) {
    // Still checking — show CSS bg while determining
    return <CSSFallbackBackground />;
  }

  if (!useWebGL) {
    return <CSSFallbackBackground />;
  }

  return (
    <WebGLErrorBoundary onError={handleError}>
      <ThreeScene onError={handleError} />
    </WebGLErrorBoundary>
  );
}
