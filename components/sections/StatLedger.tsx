import type { ImpactStat } from '@/content/types';
import { IllustrativeNote } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';

/** Impact figures set like an annual-report ledger. Always prints the illustrative label. */
export function StatLedger({ stats, dark = false, showNotes = false }: { stats: ImpactStat[]; dark?: boolean; showNotes?: boolean }) {
  return (
    <div>
      <IllustrativeNote dark={dark} className="mb-6" />
      <Reveal as="ol" stagger className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
        {stats.map((s, i) => (
          <li key={s.id} data-reveal-item className={`flex flex-col rounded-[var(--radius-card)] p-6 ${dark ? 'bg-white/10' : 'bg-band'}`}>
            <span aria-hidden="true" className={`tabular text-sm font-medium ${dark ? 'text-ink-muted' : 'text-ink-soft'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={`tabular mt-6 font-display text-5xl font-light tracking-tight ${dark ? 'text-accent-tint' : 'text-ink'}`}>
              {s.value}
              <span className="sr-only"> (illustrative)</span>
            </span>
            <span className="mt-3 text-base font-medium">{s.label}</span>
            {showNotes && <span className={`mt-3 text-sm ${dark ? 'text-ink-muted' : 'text-ink-soft'}`}>{s.note}</span>}
          </li>
        ))}
      </Reveal>
    </div>
  );
}
