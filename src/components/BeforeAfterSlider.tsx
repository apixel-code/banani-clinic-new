import { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface Props { before: string; after: string; beforeAlt?: string; afterAlt?: string; }

export default function BeforeAfterSlider({ before, after, beforeAlt = 'Before', afterAlt = 'After' }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(0, Math.min(((clientX - rect.left) / rect.width) * 100, 100)));
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const move = (e: MouseEvent) => update(e.clientX);
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    update(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const move = (e: TouchEvent) => { e.preventDefault(); update(e.touches[0].clientX); };
    const end = () => { document.removeEventListener('touchmove', move); document.removeEventListener('touchend', end); };
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', end);
    update(e.touches[0].clientX);
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-2xl" style={{ aspectRatio: '16/9' }} onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
      <img src={after} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={before} alt={beforeAlt} className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (position / 100)}%` }} draggable={false} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <MoveHorizontal size={18} style={{ color: '#1A3A5C' }} />
        </div>
      </div>
      <span className="absolute bottom-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>BEFORE</span>
      <span className="absolute bottom-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(43,124,193,0.9)' }}>AFTER</span>
    </div>
  );
}
