import { Reveal, RevealText } from "@/components/motion/reveal";

export function Skills({ groups }: { groups: { group: string; items: string[] }[] }) {
  return (
    <section aria-labelledby="toolkit-title" className="relative mx-auto max-w-[90rem] px-5 pb-28 sm:px-8 sm:pb-40">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <RevealText
          as="h2"
          id="toolkit-title"
          text="Toolkit."
          className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.045em]"
        />
      </div>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => (
          <Reveal key={group.group} delay={(i % 3) * 0.06} y={16} className="h-full">
            <div className="group h-full bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-tight">{group.group}</h3>
                <span className="font-mono text-xs text-subtle transition-colors group-hover:text-violet-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/80 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-violet-500/10"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
