import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  left: ReactNode
  right: ReactNode
  defaultLeftPercent?: number
  minLeftPercent?: number
  minRightPercent?: number
}

export function ResizableLayout({
  left,
  right,
  defaultLeftPercent = 30,
  minLeftPercent = 22,
  minRightPercent = 35,
}: Props) {
  const [leftPct, setLeftPct] = useState(defaultLeftPercent)
  const dragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback(
    (clientX: number) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = (x / rect.width) * 100
      const maxLeft = 100 - minRightPercent
      setLeftPct(Math.min(maxLeft, Math.max(minLeftPercent, pct)))
    },
    [minLeftPercent, minRightPercent],
  )

  useEffect(() => {
    const up = () => {
      dragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    const move = (e: MouseEvent) => {
      if (!dragging.current) return
      onMove(e.clientX)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
  }, [onMove])

  return (
    <div ref={containerRef} className="flex min-h-0 min-w-0 flex-1">
      <div
        className="min-h-0 min-w-0 overflow-hidden"
        style={{ flex: `0 0 ${leftPct}%` }}
      >
        {left}
      </div>

      <button
        type="button"
        aria-label="Resize panels"
        className="group relative w-3 shrink-0 cursor-col-resize select-none border-x border-transparent bg-transparent px-0 outline-none transition-[background-color] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--color-focus)_14%,transparent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--color-focus)_45%,transparent)]"
        onMouseDown={(e) => {
          e.preventDefault()
          dragging.current = true
          document.body.style.cursor = 'col-resize'
          document.body.style.userSelect = 'none'
        }}
      >
        <span className="pointer-events-none absolute inset-y-2 left-1/2 w-px -translate-x-1/2 rounded-full bg-[color-mix(in_oklab,var(--ds-olive)_45%,var(--app-border))] opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          <span className="text-[10px] leading-none text-[var(--app-muted)]">⟨</span>
          <span className="text-[10px] leading-none text-[var(--app-muted)]">⟩</span>
        </span>
      </button>

      <div className="min-h-0 min-w-0 flex-1 overflow-hidden">{right}</div>
    </div>
  )
}
