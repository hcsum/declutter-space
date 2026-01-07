'use client'

import { cn } from '../lib/utils'
import { forwardRef } from 'react'

interface ItemProps {
  text: string
  done: boolean
  active: boolean
  onToggle: () => void
  onFocus: () => void
}

const Item = forwardRef<HTMLButtonElement, ItemProps>(
  ({ text, done, active, onToggle, onFocus }, ref) => {
    return (
      <button
        ref={ref}
        onClick={() => { onToggle(); onFocus(); }}
        className={cn(
          'group text-left w-full select-text',
          'transition duration-300 ease-out',
          'py-3 md:py-4 pl-[2px]',
          'origin-left',
          // Keep color consistent regardless of active; only scale when active
          'opacity-50 hover:opacity-100',
          active && 'scale-[1.02]'
        )}
      >
        <span
          className={cn(
            'text-xl sm:text-2xl md:text-3xl leading-snug transition-colors',
            'group-hover:text-neutral-900 group-hover:opacity-100',
            done ? 'line-through opacity-40' : 'no-underline'
          )}
        >
          {text}
        </span>
      </button>
    )
  }
)
Item.displayName = 'Item'

export default Item
