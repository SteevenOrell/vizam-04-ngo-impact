import type { ImpactStat } from '@/content/types';
import { IllustrativeNote } from '@/components/ui/primitives';
import { Reveal } from '@/components/motion/Reveal';

/** Impact figures set like an annual-report ledger. Always prints the illustrative label. */
export function StatLedger({ stats, dark = false, showNotes = false }: { stats: ImpactStat[]; dark?: boolean; showNotes?: boolean }) {
  return (
    <div>
      <IllustrativeNote dark={dark} className="mb-6" />
      <Reveal as="ol" stagger className={`grid gap-px sm:grid-cols-2 lg:grid-cols-4 ${dark ? 'bg-white/15' : 'bg-rule'}`}>
        {stats.map((s, i) => (
          <li key={s.id} data-reveal-item className={`flex flex-col p-6 ${dark ? 'bg-ink' : 'bg-loom'}`}>
            <span aria-hidden="true" className={`tabular text-sm font-bold ${dark ? 'text-ink-muted' : 'text-ink-soft'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={`tabular mt-6 font-display text-5xl font-bold tracking-tight ${dark ? 'text-turmeric' : 'text-ink'}`}>
              {s.value}
              <span className="sr-only"> (illustrative)</span>
            </span>
            <span className="mt-3 text-base font-bold">{s.label}</span>
            {showNotes && <span className={`mt-3 text-sm ${dark ? 'text-ink-muted' : 'text-ink-soft'}`}>{s.note}</span>}
          </li>
        ))}
      </Reveal>
    </div>
  );
}
