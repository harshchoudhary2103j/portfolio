import { useScrollProgress } from '../hooks/useEffects';

export default function NebulaBackground() {
  const scroll = useScrollProgress();

  return (
    <div className="nebula-void">
      {/* Layer 1 — Deep purple nebula */}
      <div
        className="nebula-layer"
        style={{
          width: '900px',
          height: '900px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.6), rgba(88, 28, 135, 0.3), transparent 70%)',
          top: '-15%',
          right: '-15%',
          animation: 'nebula-drift-1 25s ease-in-out infinite',
          transform: `translateY(${scroll * -200}px)`,
        }}
      />
      {/* Layer 2 — Cyan nebula */}
      <div
        className="nebula-layer"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.4), rgba(6, 182, 212, 0.2), transparent 70%)',
          bottom: '10%',
          left: '-12%',
          animation: 'nebula-drift-2 30s ease-in-out infinite',
          transform: `translateY(${scroll * -150}px)`,
        }}
      />
      {/* Layer 3 — Rose accent */}
      <div
        className="nebula-layer"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35), rgba(139, 92, 246, 0.15), transparent 65%)',
          top: '40%',
          right: '20%',
          animation: 'nebula-drift-3 35s ease-in-out infinite',
          transform: `translateY(${scroll * -100}px)`,
        }}
      />
      {/* Layer 4 — Deep void core */}
      <div
        className="nebula-layer"
        style={{
          width: '1200px',
          height: '1200px',
          background: 'radial-gradient(circle, rgba(15, 23, 42, 0.8), transparent 60%)',
          top: '20%',
          left: '30%',
          opacity: 0.4,
        }}
      />
      {/* Star field dots */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
        {[...Array(60)].map((_, i) => (
          <circle
            key={i}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r={Math.random() * 1.2 + 0.3}
            fill="white"
            opacity={Math.random() * 0.5 + 0.1}
          />
        ))}
      </svg>
    </div>
  );
}
