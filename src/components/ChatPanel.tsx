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
    <div className="flex flex-col h-full overflow-hidden bg-transparent">
      {/* Top Section: Fixed Header */}
      <div className="flex-none px-8 py-8 border-b border-[var(--app-border)]/50">
        <h2 className="font-serif text-xl font-medium text-[var(--app-text)] leading-none m-0">
          Workflow Chat
        </h2>
        <p className="mt-2 text-sm text-[var(--app-muted)]">
          Natural language in, a structured workflow out.
        </p>
      </div>

      {/* Middle Section: Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
        <div className="space-y-6 p-8">
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
      </div>

      {/* Bottom Section: Fixed Input */}
      <div className="flex-none w-full px-8 py-6 border-t border-[var(--app-border)]/50 bg-[var(--app-bg)]/95 backdrop-blur-xl sticky bottom-0 z-10 shadow-[0_-10px_50px_-20px_rgba(0,0,0,0.5)]">
        <form onSubmit={submit} className="relative">
          <textarea
            rows={1}
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
            className="w-full min-h-[56px] max-h-48 resize-none bg-[var(--app-surface)]/40 rounded-2xl border border-[var(--app-border)] focus:border-terracotta/50 focus:ring-4 focus:ring-terracotta/5 transition-all duration-300 p-4 pr-14 text-sm text-[var(--app-text)] placeholder:text-[var(--app-muted)]/50 outline-none"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="absolute right-2 bottom-2 h-10 w-10 flex items-center justify-center rounded-xl bg-terracotta text-ivory shadow-lg shadow-terracotta/20 transition-all hover:bg-coral active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}
