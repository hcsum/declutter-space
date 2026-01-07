'use client'

import { useEffect, useRef, useState } from 'react'
import Item from './Item'

export default function Checklist({
  items,
  done,
  onToggle,
}: {
  items: string[]
  done: Set<number>
  onToggle: (idx: number) => void
}) {
  // Start with no emphasized item; becomes active on first interaction
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    if (activeIdx === null) return
    const el = refs.current[activeIdx]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeIdx])

  return (
    // Scrollable items list: fill available height of the right column; bottom fade only
    <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 flex-1 pr-2 min-h-0 scrollbar-stable scroll-area edge-fade-bottom">
      {items.map((text, idx) => (
        <Item
          key={idx}
          ref={(el) => { refs.current[idx] = el }}
          text={text}
          done={done.has(idx)}
          active={activeIdx !== null && idx === activeIdx}
          onToggle={() => onToggle(idx)}
          onFocus={() => setActiveIdx(idx)}
        />
      ))}
    </div>
  )
}
