import { useMemo } from 'react';

// Static seeded "random" so snowflakes don't reshuffle on every render
function pseudo(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ==========================================
// SNOWFALL — overlay de neve caindo
// ==========================================
export function Snowfall({ count = 40, density = 'normal' }: { count?: number; density?: 'light' | 'normal' | 'heavy' }) {
  const flakes = useMemo(() => {
    const arr: { left: number; size: number; duration: number; delay: number; opacity: number; char: string; sway: boolean }[] = [];
    const realCount = density === 'light' ? Math.floor(count * 0.6) : density === 'heavy' ? Math.floor(count * 1.4) : count;
    for (let i = 0; i < realCount; i++) {
      arr.push({
        left: pseudo(i, 1) * 100,
        size: 8 + pseudo(i, 2) * 18,
        duration: 9 + pseudo(i, 3) * 12,
        delay: -pseudo(i, 4) * 20,
        opacity: 0.5 + pseudo(i, 5) * 0.5,
        char: pseudo(i, 6) > 0.5 ? '❄' : '❅',
        sway: pseudo(i, 7) > 0.5,
      });
    }
    return arr;
  }, [count, density]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}px`,
            opacity: f.opacity,
            animation: `${f.sway ? 'snowfall-sway' : 'snowfall'} ${f.duration}s linear ${f.delay}s infinite`,
          }}
        >
          {f.char}
        </span>
      ))}
    </div>
  );
}

// ==========================================
// CHRISTMAS LIGHTS — fileira de luzes piscando
// ==========================================
export function ChristmasLights({ count = 32, className = '' }: { count?: number; className?: string }) {
  const colors = ['#FFC72C', '#B42A2A', '#0F8B58', '#9BB8F2', '#FFC72C', '#B42A2A', '#0F8B58', '#FFE08A'];
  return (
    <div className={`relative w-full ${className}`}>
      <div className="christmas-garland"></div>
      <div className="flex items-start justify-around w-full pt-1.5">
        {Array.from({ length: count }).map((_, i) => {
          const color = colors[i % colors.length];
          return (
            <span
              key={i}
              className="christmas-light"
              style={{
                color: color,
                background: color,
                animationDelay: `${(i % 6) * 0.18}s, ${(i % 6) * 0.18}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// CHRISTMAS BADGE — pílula festiva
// ==========================================
export function ChristmasBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#B42A2A] to-[#7A1A1A] text-white text-[11px] font-black uppercase tracking-wider shadow-md border border-[#FFC72C]/40">
      <i className="ti ti-christmas-tree text-[#FFC72C]"></i>
      {children}
    </span>
  );
}

// ==========================================
// SPRIG — pequena decoração de azevinho/folhas
// ==========================================
export function HollySprig({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden="true">
      <span className="text-base">🎄</span>
    </span>
  );
}

// ==========================================
// GIFT FRAME — borda decorativa de presente
// ==========================================
export function GiftRibbonStripe() {
  return (
    <div className="relative h-1.5 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#B42A2A] via-[#FFC72C] to-[#0F8B58]"></div>
    </div>
  );
}
