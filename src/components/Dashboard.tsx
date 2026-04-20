import { useMemo, useState, useEffect } from 'react'
import { ChatPanel } from './ChatPanel'
import { ResizableLayout } from './ResizableLayout'
import { ThemeToggle } from './ThemeToggle'
import type { ChatMessage } from '../types/workflow'
import { JSONViewer } from './JSONViewer'
import { generateWorkflowBackend } from '../utils/api'
import { useTheme } from '../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

let idSeq = 1
function nextId(prefix: string) {
  return `${prefix}-${idSeq++}`
}

export function Dashboard() {
  const { theme } = useTheme();
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
    <div className={`flex h-full min-h-0 flex-col bg-[var(--app-bg)] mesh-gradient selection:bg-terracotta/30 selection:text-ivory`}>
      <header className="flex items-center justify-between gap-4 border-b border-[var(--app-border)] bg-[var(--app-bg)]/80 backdrop-blur-md px-8 py-5 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center text-ivory font-serif text-xl font-bold glow-terracotta">
            A
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-[var(--app-text)] leading-tight">
              AI Workflow Builder
            </h1>
            <p className="text-xs font-medium tracking-wide text-[var(--app-muted)] uppercase opacity-80">
              Chat-driven planning · Executable JSON
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <a 
            href="/" 
            className="text-sm font-medium text-[var(--app-muted)] hover:text-terracotta transition-colors"
          >
            Exit to Home
          </a>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-hidden">
        <ResizableLayout
          defaultLeftPercent={35}
          minLeftPercent={25}
          minRightPercent={40}
          left={
            <div className="h-full border-r border-[var(--app-border)] bg-[var(--app-bg)]/40 backdrop-blur-sm">
              <ChatPanel
                messages={chatHistory}
                value={chatInput}
                onChange={setChatInput}
                onSend={send}
              />
            </div>
          }
          right={
            <div className="h-full bg-[var(--app-bg)]/20 p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-[var(--app-text)]">
                  Workflow Output
                </h2>
              </div>
              <div className="flex-1 min-h-0 bg-[var(--json-panel-bg)] rounded-3xl border border-[var(--app-border)] shadow-2xl overflow-hidden glass-shadow">
                <JSONViewer data={workflowJSON} />
              </div>
            </div>
          }
        />
      </main>
    </div>
  )
}
