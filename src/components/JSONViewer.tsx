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
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center justify-between px-6 py-4 bg-[var(--app-bg)]/30 backdrop-blur-sm border-b border-[var(--app-border)]/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-terracotta/60" />
          <span className="text-xs font-mono text-[var(--app-muted)] uppercase tracking-widest">
            {data ? 'generated-workflow.json' : 'waiting-for-input'}
          </span>
        </div>
        
        {data && (
          <div className="flex gap-2">
            <button
              onClick={copy}
              className="px-3 py-1.5 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)]/50 text-[11px] font-bold uppercase tracking-wider text-[var(--app-text)] hover:border-terracotta transition-all cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={download}
              className="px-3 py-1.5 rounded-lg bg-terracotta text-ivory text-[11px] font-bold uppercase tracking-wider hover:bg-coral transition-all cursor-pointer shadow-lg shadow-terracotta/20"
            >
              Download
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-6 font-mono text-sm scrollbar-thin">
        <HighlightedJson json={text} />
      </div>
    </div>
  )
}
