import { useMemo, useState } from 'react'
import { ChatPanel } from './ChatPanel'
import { ResizableLayout } from './ResizableLayout'
import { ThemeToggle } from './ThemeToggle'
import type { ChatMessage, ThemeMode } from '../types/workflow'
import { JSONViewer } from './JSONViewer'
import { generateWorkflowBackend } from '../utils/api'

let idSeq = 1
function nextId(prefix: string) {
  return `${prefix}-${idSeq++}`
}

export function Dashboard() {
  const [userPrompt, setUserPrompt] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: nextId('m'),
      role: 'system',
      text: 'Describe the workflow you want. I will ask one quick clarification, then generate a blueprint and executable JSON.',
    },
  ])
  const [workflowJSON, setWorkflowJSON] = useState<object | null>(null)
  const [workflowBlueprint, setWorkflowBlueprint] = useState<any[] | null>(null)
  const [clarification, setClarification] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [fullResponse, setFullResponse] = useState('')

  const [lockedTheme, setLockedTheme] = useState<ThemeMode>('light')
  const [previewTheme, setPreviewTheme] = useState<ThemeMode | null>(null)

  const effectiveTheme = previewTheme ?? lockedTheme

  async function simulateTyping(messageId: string, fullText: string) {
    setFullResponse(fullText)

    setChatHistory((h) => h.map((m) => (m.id === messageId ? { ...m, text: '' } : m)))

    let currentText = ''
    for (let i = 0; i < fullText.length; i++) {
      currentText += fullText[i]
      setDisplayedText(currentText)

      setChatHistory((h) => h.map((m) => (m.id === messageId ? { ...m, text: currentText } : m)))

      await new Promise((resolve) => setTimeout(resolve, 25))
    }
  }

  async function send() {
    if (isTyping) return

    const text = chatInput.trim()
    if (!text) return

    setIsTyping(true)
    setChatInput('')
    setUserPrompt(text)

    const userMsg: ChatMessage = { id: nextId('u'), role: 'user', text }
    setChatHistory((h) => [...h, userMsg])

    const pendingId = nextId('s')
    const pending: ChatMessage = {
      id: pendingId,
      role: 'system',
      text: 'Thinking...',
    }
    setChatHistory((h) => [...h, pending])

    try {
      const result = await generateWorkflowBackend(text)
      setWorkflowJSON(result.json || result.executableJSON)
      setWorkflowBlueprint(result.blueprint || null)
      setClarification(result.clarification || [])

      let fullResponseText = ''
      if (result.message) {
        fullResponseText += result.message + '\n\n'
      }
      
      if (result.clarification && result.clarification.length > 0) {
        fullResponseText += "I have a few clarification questions:\n" + result.clarification.map((q: string) => "- " + q).join('\n')
      }

      if (fullResponseText.trim()) {
        await simulateTyping(pendingId, fullResponseText.trim())
      } else {
        await simulateTyping(pendingId, 'Done. Review the JSON output on the right.')
      }
    } catch (e) {
      await simulateTyping(pendingId, 'Sorry, I encountered an error generating the workflow.')
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div
      className={[
        effectiveTheme === 'dark' ? 'theme-dark' : 'theme-light',
        'flex h-full min-h-0 flex-col',
      ].join(' ')}
    >
      <header className="flex items-center justify-between gap-4 border-b border-[var(--app-border)] bg-[var(--app-bg)] px-6 py-4 transition-[background-color,border-color] duration-200 ease-out">
        <div className="min-w-0">
          <div className="font-serif text-[1.625rem] font-medium leading-[1.2] tracking-tight text-[var(--app-text)]">
            AI Workflow Builder
          </div>
          <div className="mt-1 truncate text-[14px] leading-relaxed text-[var(--app-muted)]">
            Chat-driven planning · Executable JSON
          </div>
        </div>
        <ThemeToggle
          locked={lockedTheme}
          preview={previewTheme}
          onPreview={setPreviewTheme}
          onLock={setLockedTheme}
        />
      </header>

      <ResizableLayout
        defaultLeftPercent={30}
        minLeftPercent={22}
        minRightPercent={34}
        left={
          <ChatPanel
            messages={chatHistory}
            value={chatInput}
            onChange={setChatInput}
            onSend={send}
          />
        }
        right={
          <div className="h-full bg-[var(--app-bg)] transition-colors duration-300 p-6">
            <JSONViewer data={workflowJSON} />
          </div>
        }
      />
    </div>
  )
}
