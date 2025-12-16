'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  name: string;
  options: Option[];
  defaultSelected?: string[];
  placeholder?: string;
  searchable?: boolean;
  maxWidth?: string | number;
};

const ACCENT = '#1A8CFF';
const BG = '#0A0F1A';

export function MultiSelect({
  name,
  options,
  defaultSelected = [],
  placeholder = 'Izberi možnost',
  searchable = true,
  maxWidth = '100%',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
  }, [options, query]);

  const toggleValue = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const clearAll = () => setSelected([]);

  const selectedLabels = selected
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean)
    .join(', ');

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ maxWidth, minWidth: '260px' }}
    >
      {selected.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md border border-white/20 bg-black/20 px-3 py-2 text-left text-sm text-white shadow"
        style={{ borderColor: 'rgba(255,255,255,0.2)', backgroundColor: BG }}
      >
        <span className="truncate">
          {selected.length > 0 ? selectedLabels : <span className="text-white/50">{placeholder}</span>}
        </span>
        <span
          className="ml-3 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold"
          style={{ backgroundColor: ACCENT, color: '#fff' }}
        >
          {selected.length}
        </span>
      </button>

      {open && (
        <div
          className="absolute z-20 mt-2 w-full rounded-md border border-white/15 bg-[#0f1725]/95 backdrop-blur shadow-2xl"
          style={{ boxShadow: '0 18px 45px rgba(0,0,0,0.4)' }}
        >
          <div className="flex items-center justify-between px-3 py-2">
            {searchable ? (
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Išči..."
                className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/40"
              />
            ) : (
              <span className="text-xs text-white/60">Izberi več možnosti</span>
            )}
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-2 rounded-md px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                Počisti
              </button>
            )}
          </div>

          <div className="max-h-64 overflow-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-xs text-white/60">Ni rezultatov.</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleValue(opt.value)}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm ${
                      isSelected ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-sm border border-white/40 text-[10px] font-bold"
                      style={{
                        backgroundColor: isSelected ? ACCENT : 'transparent',
                        borderColor: isSelected ? ACCENT : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
