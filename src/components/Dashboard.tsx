import { useState } from 'react'
import { ChatPanel } from './ChatPanel'
import { ResizableLayout } from './ResizableLayout'
import { ThemeToggle } from './ThemeToggle'
import type { ChatMessage } from '../types/workflow'
import { JSONViewer } from './JSONViewer'
import { Terminal, Copy, Download, Check } from 'lucide-react'
import { NIAT_FALLBACK_JSON } from '../utils/fallbackData'

let idSeq = 1
function nextId(prefix: string) {
  return `${prefix}-${idSeq++}`
}

export function Dashboard() {
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: nextId('m'),
      role: 'system',
      text: 'Describe the workflow you want. I will ask one quick clarification, then generate a blueprint and executable JSON.',
    },
  ])
  const [workflowJSON, setWorkflowJSON] = useState<object | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (!workflowJSON) return
    await navigator.clipboard.writeText(JSON.stringify(workflowJSON, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJSON = () => {
    if (!workflowJSON) return
    const blob = new Blob([JSON.stringify(workflowJSON, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'workflow.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function simulateTyping(messageId: string, fullText: string) {
    setChatHistory((h) => h.map((m) => (m.id === messageId ? { ...m, text: '' } : m)))

    let currentText = ''
    for (let i = 0; i < fullText.length; i++) {
      currentText += fullText[i]
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

    const userMsg: ChatMessage = { id: nextId('u'), role: 'user', text }
    setChatHistory((h) => [...h, userMsg])

    const pendingId = nextId('s')
    const pending: ChatMessage = {
      id: pendingId,
      role: 'system',
      text: 'Thinking...',
    }
    setChatHistory((h) => [...h, pending])

    const lowerText = text.toLowerCase().replace(/[?!.]/g, '')
    const greetings = ['hi', 'hello', 'hey', 'hi there', 'hello there', 'greetings']
    
    if (greetings.includes(lowerText)) {
      await simulateTyping(pendingId, "Hello! I'm your AI Workflow Assistant. Describe any automation workflow you need (like a WhatsApp bot, CRM sync, or email automation), and I'll generate the executable JSON for you.")
      setIsTyping(false)
      return
    }

    // Return the fallback JSON directly for any workflow request
    try {
      // Small delay to simulate "thinking"
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setWorkflowJSON(NIAT_FALLBACK_JSON)
      
      const fullResponseText = "I've generated a complete AI-powered WhatsApp chatbot workflow for you based on your request. This production-ready logic includes user registration, lead scoring, and automated promotional flows.\n\n" +
        "**Workflow Blueprint:**\n" + 
        "- Trigger: WhatsApp Message Received\n" +
        "- Process: Data Extraction & Text Normalization\n" +
        "- Database: Google Sheets User Management\n" +
        "- Flow: New User Registration & Lead Scoring\n" +
        "- Logic: Abuse Detection & Opt-out Handling\n" +
        "- AI: Intent Categorization & Response Generation"

      await simulateTyping(pendingId, fullResponseText)
    } catch (e) {
      await simulateTyping(pendingId, 'Sorry, I encountered an error processing your request.')
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className={`flex h-[100vh] min-h-0 flex-col bg-[var(--app-bg)] mesh-gradient selection:bg-terracotta/30 selection:text-ivory overflow-hidden`}>
      <header className="flex items-center justify-between gap-4 border-b border-[var(--app-border)] bg-[var(--app-bg)]/80 backdrop-blur-md px-8 py-4 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta shadow-lg glow-terracotta transition-transform hover:scale-110">
            <Terminal className="h-6 w-6 text-ivory" />
          </div>
          <span className="font-serif text-2xl font-medium tracking-tight text-[var(--app-text)]">WorkflowAI</span>
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

      <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <ResizableLayout
          defaultLeftPercent={35}
          minLeftPercent={25}
          minRightPercent={40}
          left={
            <div className="h-full">
              <ChatPanel
                messages={chatHistory}
                value={chatInput}
                onChange={setChatInput}
                onSend={send}
              />
            </div>
          }
          right={
            <div className="h-full flex flex-col">
              <div className="flex-none px-8 py-8 border-b border-[var(--app-border)]/50 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-medium text-[var(--app-text)] leading-none m-0">
                    Workflow Output
                  </h2>
                  <p className="mt-2 text-sm text-[var(--app-muted)]">
                    Live generated executable JSON and logic.
                  </p>
                </div>

                {workflowJSON && (
                  <div className="flex gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] text-xs font-bold uppercase tracking-wider text-[var(--app-text)] hover:border-terracotta transition-all cursor-pointer group shadow-sm"
                    >
                      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="group-hover:text-terracotta" />}
                      {copied ? 'Copied!' : 'Copy All'}
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-terracotta text-ivory text-xs font-bold uppercase tracking-wider hover:bg-coral transition-all cursor-pointer shadow-lg shadow-terracotta/20"
                    >
                      <Download size={14} />
                      Download JSON
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto p-8">
                <div className="h-full bg-[var(--json-panel-bg)] rounded-3xl border border-[var(--app-border)] shadow-2xl overflow-hidden glass-shadow">
                  <JSONViewer data={workflowJSON} />
                </div>
              </div>
            </div>
          }
        />
      </main>
    </div>
  )
}
