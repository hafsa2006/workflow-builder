import { useTheme } from '../context/ThemeContext'

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
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
      width="20"
      height="20"
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

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-[var(--app-border)] bg-[var(--app-surface)]/50 backdrop-blur-sm p-1 shadow-sm transition-all duration-300"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        title="Switch to Light mode"
        onClick={() => theme === 'dark' && toggleTheme()}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'bg-terracotta text-ivory shadow-lg shadow-terracotta/20'
            : 'text-[var(--app-muted)] hover:text-[var(--app-text)] hover:bg-[var(--app-border)]'
        }`}
        aria-pressed={theme === 'light'}
      >
        <IconSun />
      </button>
      <button
        type="button"
        title="Switch to Dark mode"
        onClick={() => theme === 'light' && toggleTheme()}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-terracotta text-ivory shadow-lg shadow-terracotta/20'
            : 'text-[var(--app-muted)] hover:text-[var(--app-text)] hover:bg-[var(--app-border)]'
        }`}
        aria-pressed={theme === 'dark'}
      >
        <IconMoon />
      </button>
    </div>
  )
}
