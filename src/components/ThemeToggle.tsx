import type { ThemeMode } from '../types/workflow'

type Props = {
  locked: ThemeMode
  preview: ThemeMode | null
  onPreview: (mode: ThemeMode | null) => void
  onLock: (mode: ThemeMode) => void
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M21 13.2A8.5 8.5 0 0 1 10.8 3a7 7 0 1 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ThemeToggle({ locked, preview, onPreview, onLock }: Props) {
  const active = preview ?? locked

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] p-1 shadow-[0_1px_2px_rgba(15,17,21,0.06)] transition-[box-shadow,background-color,border-color] duration-200 ease-out"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        title="Light theme — hover to preview, click to save"
        onMouseEnter={() => onPreview('light')}
        onMouseLeave={() => onPreview(null)}
        onClick={() => {
          onLock('light')
          onPreview(null)
        }}
        className={[
          'flex h-10 w-10 items-center justify-center rounded-full transition-[background-color,box-shadow,color,transform] duration-200 ease-out active:scale-[0.98]',
          active === 'light'
            ? 'bg-[color-mix(in_oklab,var(--ds-warm-sand)_48%,var(--app-surface))] text-[var(--app-text)] shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--ds-ring-warm)_70%,transparent)]'
            : 'text-[var(--app-muted)] hover:bg-[color-mix(in_oklab,var(--ds-warm-sand)_26%,transparent)] hover:text-[var(--app-text)]',
        ].join(' ')}
        aria-pressed={locked === 'light'}
      >
        <IconSun />
        <span className="sr-only">Light</span>
      </button>
      <button
        type="button"
        title="Dark theme — hover to preview, click to save"
        onMouseEnter={() => onPreview('dark')}
        onMouseLeave={() => onPreview(null)}
        onClick={() => {
          onLock('dark')
          onPreview(null)
        }}
        className={[
          'flex h-10 w-10 items-center justify-center rounded-full transition-[background-color,box-shadow,color,transform] duration-200 ease-out active:scale-[0.98]',
          active === 'dark'
            ? 'bg-[color-mix(in_oklab,var(--ds-stone)_28%,var(--app-surface))] text-[var(--app-text)] shadow-[0_0_22px_rgba(0,0,0,0.2),inset_0_0_0_1px_color-mix(in_oklab,var(--ds-warm-silver)_38%,transparent)]'
            : 'text-[var(--app-muted)] hover:bg-[color-mix(in_oklab,var(--ds-stone)_18%,transparent)] hover:text-[var(--app-text)]',
        ].join(' ')}
        aria-pressed={locked === 'dark'}
      >
        <IconMoon />
        <span className="sr-only">Dark</span>
      </button>
    </div>
  )
}
