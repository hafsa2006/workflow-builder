import type { WorkflowNode } from '../types/workflow'

type Props = {
  node: WorkflowNode | null
}

const typeLabel: Record<WorkflowNode['inputs'][number]['type'], string> = {
  api_key: 'API key',
  url: 'URL',
  text: 'Text',
  json: 'JSON',
  boolean: 'Boolean',
}

export function NodeDetails({ node }: Props) {
  return (
    <div className="flex h-full min-h-0 flex-col border-t border-[var(--app-border)] bg-[var(--app-bg)] transition-[background-color,border-color] duration-200 ease-out">
      <div className="border-b border-[var(--app-border)] px-6 py-4">
        <div className="font-serif text-[18px] font-medium leading-snug tracking-tight text-[var(--app-text)]">
          Node details
        </div>
        <div className="mt-1 text-[13px] leading-relaxed text-[var(--app-muted)]">
          Inputs and notes for the selected step.
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
        {!node ? (
          <div className="rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-card)] p-6 text-[15px] leading-relaxed text-[var(--app-muted)] shadow-[0_8px_24px_rgba(15,17,21,0.05)]">
            Select a node on the blueprint to inspect configuration.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 shadow-[0_8px_26px_rgba(15,17,21,0.06)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                Node name
              </div>
              <div className="font-serif mt-2 text-[20px] font-medium leading-snug text-[var(--app-text)]">{node.name}</div>
            </div>

            <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-6 shadow-[0_8px_26px_rgba(15,17,21,0.06)]">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                Description
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--app-text)]">{node.description}</p>
            </div>

            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--app-muted)]">
                Required inputs
              </div>
              <ul className="mt-4 space-y-3">
                {node.inputs.map((input) => (
                  <li
                    key={input.label}
                    className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-[0_6px_18px_rgba(15,17,21,0.05)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:shadow-[0_10px_26px_rgba(15,17,21,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold text-[var(--app-text)]">{input.label}</div>
                        {input.hint ? (
                          <div className="mt-2 text-[13px] leading-relaxed text-[var(--app-muted)]">{input.hint}</div>
                        ) : null}
                      </div>
                      <span className="shrink-0 rounded-full bg-[color-mix(in_oklab,var(--ds-terracotta)_20%,var(--app-surface))] px-3 py-1 text-[12px] font-medium text-[var(--app-text)] ring-1 ring-[color-mix(in_oklab,var(--ds-terracotta)_32%,transparent)]">
                        {typeLabel[input.type]}
                      </span>
                    </div>
                    <div className="mt-3 text-[12px] font-medium text-[var(--app-muted)]">
                      {input.required ? 'Required' : 'Optional'}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
