import { useMemo, useState } from 'react'
import type { WorkflowBlueprint } from '../types/workflow'
import { JSONViewer } from './JSONViewer'

/** Warm editorial accents — terracotta, coral, olive, stone, muted green (DESIGN.md) */
const ACCENT = ['#c96442', '#d97757', '#5e5d59', '#87867f', '#6b7268'] as const

type Props = {
  blueprint: WorkflowBlueprint | null
  workflowJson: object | null
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
}

function ArrowDown() {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden>
      <svg width="12" height="28" viewBox="0 0 12 28" fill="none" className="text-[color-mix(in_oklab,var(--ds-olive)_55%,var(--app-border))]">
        <path d="M6 0v20" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <path
          d="M2.5 18.5L6 24l3.5-5.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function WorkflowGraph({
  blueprint,
  selectedNodeId,
  onSelectNode,
  zoom,
  compact,
}: {
  blueprint: WorkflowBlueprint
  selectedNodeId: string | null
  onSelectNode: (id: string) => void
  zoom: number
  compact?: boolean
}) {
  return (
    <div
      className={[
        'flex w-full justify-center',
        compact ? 'px-2 pb-6 pt-2' : 'px-4 pb-10 pt-4',
      ].join(' ')}
    >
      <div
        className="w-full max-w-md transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
      >
        <div className="flex flex-col items-stretch">
          {blueprint.nodes.map((n, idx) => (
            <div key={n.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onSelectNode(n.id)}
                className={[
                  'w-full rounded-2xl border border-dashed bg-[var(--node-surface)] px-4 py-4 text-left transition-[transform,box-shadow,border-color] duration-200 ease-out',
                  'shadow-[var(--node-shadow)]',
                  'hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--color-brand)_42%,var(--app-border))]',
                  selectedNodeId === n.id
                    ? 'ring-2 ring-[color-mix(in_oklab,var(--color-brand)_55%,transparent)] ring-offset-2 ring-offset-[var(--app-bg)] shadow-[0_0_0_1px_rgba(201,100,66,0.35),0_16px_40px_rgba(201,100,66,0.12)]'
                    : 'border-[var(--app-border)]',
                ].join(' ')}
              >
                <div className="flex items-stretch gap-4">
                  <span
                    className="w-[3px] shrink-0 rounded-full self-stretch"
                    style={{
                      background: ACCENT[idx % ACCENT.length],
                      boxShadow: `0 0 18px ${ACCENT[idx % ACCENT.length]}55`,
                      minHeight: '3.25rem',
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--app-muted)]">
                      Step {idx + 1}
                    </div>
                    <div className="mt-2 truncate text-[15px] font-semibold leading-snug text-[var(--app-text)]">
                      {n.name}
                    </div>
                    <div className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-[var(--app-muted)]">
                      {n.description}
                    </div>
                  </div>
                  <span
                    className="mt-8 h-2 w-2 shrink-0 self-start rounded-full"
                    style={{
                      background: ACCENT[idx % ACCENT.length],
                      boxShadow: `0 0 16px ${ACCENT[idx % ACCENT.length]}66`,
                    }}
                  />
                </div>
              </button>
              {idx < blueprint.nodes.length - 1 ? <ArrowDown /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WorkflowCanvas({
  blueprint,
  workflowJson,
  selectedNodeId,
  onSelectNode,
}: Props) {
  const [tab, setTab] = useState<'visual' | 'json'>('visual')
  const [zoom, setZoom] = useState(1)
  const [miniOpen, setMiniOpen] = useState(false)

  const zoomLabel = useMemo(() => `${Math.round(zoom * 100)}%`, [zoom])

  function bump(delta: number) {
    setZoom((z) => Math.min(1.35, Math.max(0.65, Math.round((z + delta) * 100) / 100)))
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] px-6 py-4">
        <div className="inline-flex rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] p-1 shadow-[0_1px_2px_rgba(15,17,21,0.05)]">
          <button
            type="button"
            onClick={() => setTab('visual')}
            className={[
              'rounded-full px-4 py-2 text-[13px] font-semibold transition-[background-color,color,box-shadow] duration-200 ease-out active:scale-[0.98]',
              tab === 'visual'
                ? 'bg-[color-mix(in_oklab,var(--ds-warm-sand)_52%,transparent)] text-[var(--app-text)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--ds-ring-warm)_65%,transparent)]'
                : 'text-[var(--app-muted)] hover:text-[var(--app-text)]',
            ].join(' ')}
          >
            Visual
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('json')
              setMiniOpen(false)
            }}
            className={[
              'rounded-full px-4 py-2 text-[13px] font-semibold transition-[background-color,color,box-shadow] duration-200 ease-out active:scale-[0.98]',
              tab === 'json'
                ? 'bg-[color-mix(in_oklab,var(--color-focus)_24%,transparent)] text-[var(--app-text)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--color-focus)_38%,transparent)]'
                : 'text-[var(--app-muted)] hover:text-[var(--app-text)]',
            ].join(' ')}
          >
            JSON
          </button>
        </div>

        {tab === 'visual' ? (
          <div className="flex items-center gap-2">
            <div className="hidden min-w-[3rem] text-right text-[12px] font-medium tabular-nums text-[var(--app-muted)] sm:block">
              {zoomLabel}
            </div>
            <button
              type="button"
              onClick={() => bump(-0.1)}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--app-border)] bg-[var(--app-surface)] text-[18px] font-medium leading-none text-[var(--app-text)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:border-[color-mix(in_oklab,var(--color-focus)_40%,var(--app-border))] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] active:scale-[0.98]"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              onClick={() => bump(0.1)}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--app-border)] bg-[var(--app-surface)] text-[18px] font-medium leading-none text-[var(--app-text)] shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:border-[color-mix(in_oklab,var(--color-focus)_40%,var(--app-border))] hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] active:scale-[0.98]"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>
        ) : (
          <div className="text-[13px] font-medium text-[var(--app-muted)]">Executable output</div>
        )}
      </div>

      <div className="relative min-h-0 flex-1">
        {tab === 'visual' ? (
          <div className="dot-grid h-full min-h-0 overflow-auto">
            {!blueprint ? (
              <div className="flex h-full items-center justify-center p-8">
                <div className="max-w-md rounded-2xl border border-dashed border-[var(--app-border)] bg-[var(--app-card)] p-8 text-center text-[15px] leading-relaxed text-[var(--app-muted)] shadow-[0_8px_28px_rgba(15,17,21,0.06)]">
                  Your blueprint will appear here after the chat completes its clarification step.
                </div>
              </div>
            ) : (
              <>
                <div className="pointer-events-none absolute left-4 top-4 z-10 sm:pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setMiniOpen(true)}
                    className="pointer-events-auto rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3 shadow-[var(--glass-shadow)] backdrop-blur-md transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(15,17,21,0.12)] active:scale-[0.98]"
                    title="Expand blueprint preview"
                  >
                    <div className="relative h-24 w-44 overflow-hidden rounded-xl bg-[var(--app-card)] ring-1 ring-[color-mix(in_oklab,var(--app-border)_85%,transparent)]">
                      <div
                        className="origin-top-left"
                        style={{
                          transform: 'scale(0.34)',
                          width: 420,
                        }}
                      >
                        <WorkflowGraph
                          blueprint={blueprint}
                          selectedNodeId={selectedNodeId}
                          onSelectNode={onSelectNode}
                          zoom={1}
                          compact
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-center text-[11px] font-medium leading-tight text-[var(--app-muted)]">
                      Mini preview · click to expand
                    </div>
                  </button>
                </div>

                <WorkflowGraph
                  blueprint={blueprint}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={onSelectNode}
                  zoom={zoom}
                />
              </>
            )}
          </div>
        ) : (
          <div className="h-full min-h-0 overflow-hidden bg-[var(--app-bg)] p-6">
            <JSONViewer data={workflowJson} />
          </div>
        )}
      </div>

      {miniOpen && blueprint ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[color-mix(in_oklab,var(--ds-near-black)_42%,transparent)] backdrop-blur-[3px] transition-opacity duration-200"
            aria-label="Close preview"
            onClick={() => setMiniOpen(false)}
          >
            <span className="sr-only">Close</span>
          </button>

          <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center p-6">
            <div
              className="pointer-events-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[color-mix(in_oklab,var(--app-bg)_92%,transparent)] shadow-[var(--glass-shadow)] backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label="Blueprint preview"
            >
              <div className="flex items-center justify-between border-b border-[var(--app-border)] px-6 py-4">
                <div className="font-serif text-[15px] font-medium text-[var(--app-text)]">Blueprint preview</div>
                <button
                  type="button"
                  onClick={() => setMiniOpen(false)}
                  className="rounded-[12px] border border-[var(--app-border)] bg-[var(--app-surface)] px-4 py-2 text-[13px] font-medium text-[var(--app-text)] shadow-[#e8e6dc_0px_0px_0px_0px,var(--ds-ring-warm)_0px_0px_0px_1px] transition-[transform,background-color] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--ds-warm-sand)_28%,var(--app-surface))] active:scale-[0.98]"
                >
                  Close
                </button>
              </div>
              <div className="dot-grid max-h-[min(72vh,860px)] overflow-auto p-6">
                <WorkflowGraph
                  blueprint={blueprint}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={onSelectNode}
                  zoom={1}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
