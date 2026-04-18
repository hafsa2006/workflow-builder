import { Fragment } from 'react'

type Kind = 'key' | 'string' | 'number' | 'bool' | 'null' | 'punct' | 'plain'

type Tok = { text: string; kind: Kind }

function scanJson(s: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  const pushWs = (start: number) => {
    if (start < i) out.push({ text: s.slice(start, i), kind: 'plain' })
  }
  while (i < s.length) {
    const start = i
    const c = s[i]
    if (/\s/.test(c)) {
      i++
      while (i < s.length && /\s/.test(s[i])) i++
      pushWs(start)
      continue
    }
    if ('{}[],:'.includes(c)) {
      out.push({ text: c, kind: 'punct' })
      i++
      continue
    }
    if (c === '"') {
      const q = i
      i++
      while (i < s.length) {
        const ch = s[i]
        if (ch === '\\') {
          i += 2
          continue
        }
        if (ch === '"') {
          i++
          break
        }
        i++
      }
      const raw = s.slice(q, i)
      const nextNonWs = (() => {
        let j = i
        while (j < s.length && /\s/.test(s[j])) j++
        return s[j]
      })()
      out.push({ text: raw, kind: nextNonWs === ':' ? 'key' : 'string' })
      continue
    }
    if (c === '-' || (c >= '0' && c <= '9')) {
      const n0 = i
      i++
      while (i < s.length && /[0-9.eE+-]/.test(s[i])) i++
      out.push({ text: s.slice(n0, i), kind: 'number' })
      continue
    }
    if (s.startsWith('true', i)) {
      out.push({ text: 'true', kind: 'bool' })
      i += 4
      continue
    }
    if (s.startsWith('false', i)) {
      out.push({ text: 'false', kind: 'bool' })
      i += 5
      continue
    }
    if (s.startsWith('null', i)) {
      out.push({ text: 'null', kind: 'null' })
      i += 4
      continue
    }
    out.push({ text: c, kind: 'plain' })
    i++
  }
  return out
}

const kindClass: Record<Kind, string> = {
  key: 'text-[var(--json-key)]',
  string: 'text-[var(--json-string)]',
  number: 'text-[var(--json-number)]',
  bool: 'text-[var(--json-bool)]',
  null: 'text-[var(--json-null)]',
  punct: 'text-[var(--json-punct)]',
  plain: 'text-[var(--app-text)]',
}

export function HighlightedJson({ json }: { json: string }) {
  const parts = scanJson(json)
  return (
    <code className="font-mono text-[14px] leading-relaxed whitespace-pre-wrap break-words">
      {parts.map((p, idx) => (
        <Fragment key={`${idx}`}>
          <span className={kindClass[p.kind]}>{p.text}</span>
        </Fragment>
      ))}
    </code>
  )
}
