import type { WorkflowBlueprint, WorkflowNode } from '../types/workflow'

export const pastelAccents = ['sage', 'blue', 'pink', 'beige', 'lavender'] as const

function hashPrompt(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i)
  return Math.abs(h)
}

export function buildWorkflowFromPrompt(userPrompt: string): WorkflowBlueprint {
  const h = hashPrompt(userPrompt.trim() || 'workflow')
  const topic =
    userPrompt.trim().slice(0, 48) || 'your automation'

  const nodes: WorkflowNode[] = [
    {
      id: 'n1',
      name: 'Trigger',
      description: `Listens for events related to “${topic}” and normalizes the incoming payload.`,
      inputs: [
        { label: 'Webhook URL', type: 'url', required: true, hint: 'HTTPS endpoint' },
        { label: 'Signing secret', type: 'api_key', required: true },
      ],
    },
    {
      id: 'n2',
      name: 'Enrich & validate',
      description:
        'Runs schema checks, deduplicates records, and attaches lightweight metadata for downstream steps.',
      inputs: [
        { label: 'Input schema (JSON)', type: 'json', required: true },
        { label: 'Strict mode', type: 'boolean', required: false },
      ],
    },
    {
      id: 'n3',
      name: 'Agent reasoning',
      description:
        'Uses a simulated agent to clarify intent, fill gaps, and propose the next best action.',
      inputs: [
        { label: 'Model API key', type: 'api_key', required: true },
        { label: 'System prompt', type: 'text', required: false },
      ],
    },
    {
      id: 'n4',
      name: 'Execute actions',
      description:
        'Dispatches approved operations to connected systems with retries and idempotency keys.',
      inputs: [
        { label: 'Target base URL', type: 'url', required: true },
        { label: 'Service account key', type: 'api_key', required: true },
        { label: 'Payload mapping', type: 'json', required: false },
      ],
    },
    {
      id: 'n5',
      name: 'Log & notify',
      description:
        'Persists an audit trail and optionally notifies stakeholders on success or failure.',
      inputs: [
        { label: 'Notification channel', type: 'text', required: false, hint: 'email or slack hook' },
        { label: 'Retention days', type: 'text', required: false },
      ],
    },
  ]

  // Slightly vary copy from prompt hash (UI-only simulation)
  if (h % 2 === 0) {
    nodes[2] = {
      ...nodes[2],
      description:
        nodes[2].description + ' (Variant A: emphasis on safety checks before writes.)',
    }
  }

  return {
    name: `Workflow — ${topic}`,
    version: '1.0.0',
    nodes,
    connections: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
    ],
  }
}

export function blueprintToExecutableJson(blueprint: WorkflowBlueprint): object {
  return {
    $schema: 'https://example.com/workflow.schema.json',
    workflow: {
      name: blueprint.name,
      version: blueprint.version,
      steps: blueprint.nodes.map((n) => ({
        id: n.id,
        type: n.name.toLowerCase().replace(/\s+/g, '_'),
        description: n.description,
        inputs: Object.fromEntries(
          n.inputs.map((i) => [
            i.label.toLowerCase().replace(/\s+/g, '_'),
            { type: i.type, required: !!i.required },
          ]),
        ),
      })),
      edges: blueprint.connections.map((c) => ({ source: c.from, target: c.to })),
    },
    meta: {
      generatedAt: new Date().toISOString(),
      simulated: true,
    },
  }
}

