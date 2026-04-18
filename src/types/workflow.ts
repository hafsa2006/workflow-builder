export type WorkflowInput = {
  label: string
  type: 'api_key' | 'url' | 'text' | 'json' | 'boolean'
  required?: boolean
  hint?: string
}

export type WorkflowNode = {
  id: string
  name: string
  description: string
  inputs: WorkflowInput[]
}

export type WorkflowConnection = {
  from: string
  to: string
}

export type WorkflowBlueprint = {
  name: string
  version: string
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
}

export type ChatMessage = {
  id: string
  role: 'user' | 'system'
  text: string
}

export type ThemeMode = 'light' | 'dark'
