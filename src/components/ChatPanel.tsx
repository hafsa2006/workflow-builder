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
    <div className="flex h-full min-h-0 flex-col border-r border-[var(--app-border)] bg-[var(--app-bg)] transition-[background-color,border-color] duration-200 ease-out">
      <div className="border-b border-[var(--app-border)] px-4 py-4">
        <div className="font-serif text-lg font-medium leading-snug tracking-tight text-[var(--app-text)]">
          Workflow chat
        </div>
        <div className="mt-1 text-[13px] leading-relaxed text-[var(--app-muted)]">
          Natural language in, a structured workflow out.
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={[
              'flex w-full',
              m.role === 'user' ? 'justify-end' : 'justify-start',
            ].join(' ')}
          >
            <div
              className={[
                'max-w-[min(92%,420px)] rounded-[16px] px-4 py-3 text-[15px] leading-relaxed transition-[transform,box-shadow,background-color] duration-200 ease-out',
                m.role === 'user'
                  ? 'rounded-br-[8px] bg-[var(--color-brand)] text-[var(--text-on-brand)] shadow-[0_10px_26px_rgba(201,100,66,0.28)] hover:-translate-y-px hover:shadow-[0_14px_34px_rgba(201,100,66,0.35)]'
                  : 'rounded-bl-[8px] border border-[var(--app-border)] bg-[var(--chat-system-bg)] text-[var(--app-text)] shadow-[var(--chat-system-shadow)] hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]',
              ].join(' ')}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="border-t border-[var(--app-border)] p-4">
        <div className="flex items-end gap-2 rounded-[12px] border border-[var(--app-border)] bg-[var(--app-surface)] px-2 py-2 pl-4 shadow-[#e8e6dc_0px_0px_0px_0px,var(--ds-ring-warm)_0px_0px_0px_1px] transition-[box-shadow,border-color] duration-200 ease-out focus-within:border-[color-mix(in_oklab,var(--color-focus)_45%,var(--app-border))] focus-within:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-focus)_22%,transparent)]">
          <label className="sr-only" htmlFor="wf-chat-input">
            Describe your workflow
          </label>
          <textarea
            id="wf-chat-input"
            rows={2}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your workflow..."
            disabled={disabled}
            className="min-h-[48px] w-full resize-none bg-transparent py-2 text-[15px] leading-relaxed text-[var(--app-text)] outline-none placeholder:text-[color-mix(in_oklab,var(--app-muted)_78%,transparent)]"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="mb-0.5 inline-flex h-11 shrink-0 items-center justify-center rounded-[12px] bg-[var(--color-brand)] px-5 text-[14px] font-medium text-[var(--text-on-brand)] shadow-[var(--color-brand)_0px_0px_0px_0px,var(--color-brand)_0px_0px_0px_1px] transition-[transform,background-color,box-shadow,opacity] duration-200 ease-out hover:bg-[color-mix(in_oklab,var(--color-brand)_92%,var(--ds-near-black))] hover:shadow-[0_10px_22px_rgba(201,100,66,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
