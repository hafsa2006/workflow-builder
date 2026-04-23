import { useMemo } from 'react'
import { HighlightedJson } from '../utils/highlightJson'

type Props = {
  data: object | null
}

export function JSONViewer({ data }: Props) {
  const text = useMemo(
    () => (data ? JSON.stringify(data, null, 2) : '// Send another message to generate JSON'),
    [data],
  )

  return (
    <div className="flex flex-col h-full bg-transparent relative overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 font-mono text-sm scrollbar-thin">
        <HighlightedJson json={text} />
      </div>
    </div>
  )
}
