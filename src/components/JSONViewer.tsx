import { useMemo, useState } from 'react'
import { HighlightedJson } from '../utils/highlightJson'

type Props = {
  data: object | null
}

export function JSONViewer({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const text = useMemo(
    () => (data ? JSON.stringify(data, null, 2) : '// Send another message to generate JSON'),
    [data],
  )

  async function copy() {
    if (!data) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  function download() {
    if (!data) return
    const blob = new Blob([text], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copy}
          disabled={!data}
          className="rounded-[12px] border border-[var(--app-border)] bg-[color-mix(in_oklab,var(--ds-warm-sand)_34%,var(--app-surface))] px-4 py-2 text-[13px] font-medium text-[var(--app-text)] shadow-[var(--ds-border-warm)_0px_0px_0px_0px,var(--ds-ring-warm)_0px_0px_0px_1px] transition-[transform,background-color,border-color,box-shadow,opacity] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--ds-warm-sand)_22%,var(--app-surface))] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button
          type="button"
          onClick={download}
          disabled={!data}
          className="rounded-[12px] bg-[var(--color-brand)] px-4 py-2 text-[13px] font-medium text-[var(--text-on-brand)] shadow-[var(--color-brand)_0px_0px_0px_0px,var(--color-brand)_0px_0px_0px_1px] transition-[transform,background-color,box-shadow,opacity] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--color-brand)_92%,var(--ds-near-black))] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
        >
          Download JSON
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[var(--app-border)] bg-[var(--json-panel-bg)] p-5 shadow-[inset_0_1px_0_var(--json-panel-inset)] transition-[background-color,border-color] duration-200 ease-out">
        <HighlightedJson json={text} />
      </div>
    </div>
  )
}
