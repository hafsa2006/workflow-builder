import { useMemo, useState } from 'react'
import { ChatPanel } from './components/ChatPanel'
import { NodeDetails } from './components/NodeDetails'
import { ResizableLayout } from './components/ResizableLayout'
import { ThemeToggle } from './components/ThemeToggle'
import { WorkflowCanvas } from './components/WorkflowCanvas'
import type { ChatMessage, ThemeMode, WorkflowBlueprint } from './types/workflow'
import { blueprintToExecutableJson, buildWorkflowFromPrompt } from './utils/buildWorkflow'

let idSeq = 1
function nextId(prefix: string) {
  return `${prefix}-${idSeq++}`
}

export default function App() {
  const [userPrompt, setUserPrompt] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: nextId('m'),
      role: 'system',
      text: 'Describe the workflow you want. I will ask one quick clarification, then generate a blueprint and executable JSON.',
    },
  ])
  const [turnPhase, setTurnPhase] = useState<'first' | 'later'>('first')
  const [workflowBlueprint, setWorkflowBlueprint] = useState<WorkflowBlueprint | null>(null)
  const [workflowJSON, setWorkflowJSON] = useState<object | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)

  const [lockedTheme, setLockedTheme] = useState<ThemeMode>('light')
  const [previewTheme, setPreviewTheme] = useState<ThemeMode | null>(null)

  const effectiveTheme = previewTheme ?? lockedTheme

  const selectedNode = useMemo(() => {
    if (!workflowBlueprint || !selectedNodeId) return null
    return workflowBlueprint.nodes.find((n) => n.id === selectedNodeId) ?? null
  }, [workflowBlueprint, selectedNodeId])

  function send() {
    const text = chatInput.trim()
    if (!text) return

    setChatInput('')
    setUserPrompt(text)

    const userMsg: ChatMessage = { id: nextId('u'), role: 'user', text }
    setChatHistory((h) => [...h, userMsg])

    if (turnPhase === 'first') {
      const clarify: ChatMessage = {
        id: nextId('s'),
        role: 'system',
        text: 'Quick check: should this run on a schedule (for example nightly), or only when you trigger it manually? Reply with your preference and any constraints (timeouts, approvals).',
      }
      window.setTimeout(() => setChatHistory((h) => [...h, clarify]), 220)
      setTurnPhase('later')
      return
    }

    const pending: ChatMessage = {
      id: nextId('s'),
      role: 'system',
      text: 'Generating a blueprint and JSON from your conversation…',
    }
    window.setTimeout(() => setChatHistory((h) => [...h, pending]), 160)

    window.setTimeout(() => {
      const bp = buildWorkflowFromPrompt(text)
      const json = blueprintToExecutableJson(bp)
      setWorkflowBlueprint(bp)
      setWorkflowJSON(json)
      setSelectedNodeId(bp.nodes[0]?.id ?? null)

      const done: ChatMessage = {
        id: nextId('s'),
        role: 'system',
        text: 'Done. Review the visual blueprint on the right, inspect JSON, and click a node for step-level inputs.',
      }
      setChatHistory((h) => [...h, done])
    }, 520)
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
            Chat-driven planning · Visual blueprint · Executable JSON
          </div>
          {userPrompt ? (
            <div className="sr-only" aria-live="polite">
              Latest submitted prompt: {userPrompt}
            </div>
          ) : null}
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
          <div className="grid h-full min-h-0 grid-rows-[minmax(0,65fr)_minmax(0,35fr)] bg-[var(--app-bg)] transition-colors duration-300">
            <div className="min-h-0 overflow-hidden">
              <WorkflowCanvas
                blueprint={workflowBlueprint}
                workflowJson={workflowJSON}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
              />
            </div>
            <div className="min-h-0 overflow-hidden">
              <NodeDetails node={selectedNode} />
            </div>
          </div>
        }
      />
    </div>
  )
}
