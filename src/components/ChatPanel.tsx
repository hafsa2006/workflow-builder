import { useEffect, useRef, type FormEvent } from 'react'
import type { ChatMessage } from '../types/workflow'

type Props = {
  messages: ChatMessage[]
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
}

export function ChatPanel({ messages, value, onChange, onSend, disabled }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function submit(e: FormEvent) {
    e.preventDefault()
    onSend()
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-transparent">
      <div className="px-6 py-6 border-b border-[var(--app-border)]/50">
        <h3 className="font-serif text-xl font-medium text-[var(--app-text)]">
          Workflow Chat
        </h3>
        <p className="mt-1 text-sm text-[var(--app-muted)]">
          Natural language in, a structured workflow out.
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6 scrollbar-thin">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed transition-all duration-300 ${
                m.role === 'user'
                  ? 'rounded-tr-none bg-terracotta text-ivory shadow-lg shadow-terracotta/20'
                  : 'rounded-tl-none bg-[var(--app-surface)]/60 backdrop-blur-sm border border-[var(--app-border)] text-[var(--app-text)] glass-shadow'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="p-6 border-t border-[var(--app-border)]/50">
        <div className="relative group">
          <textarea
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (!disabled && value.trim()) {
                  onSend()
                }
              }
            }}
            placeholder="Describe your workflow..."
            disabled={disabled}
            className="w-full resize-none rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)]/50 backdrop-blur-sm p-4 pr-16 text-sm text-[var(--app-text)] placeholder:text-[var(--app-muted)]/50 outline-none focus:border-terracotta/50 focus:ring-4 focus:ring-terracotta/5 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta text-ivory shadow-lg shadow-terracotta/20 transition-all hover:bg-coral active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
