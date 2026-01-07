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
          // Match category list hover behavior; no base opacity reduction
          'hover:opacity-90 dark:hover:opacity-100',
          active && 'scale-[1.02]'
        )}
      >
        <span
          className={cn(
            'text-xl sm:text-2xl md:text-3xl leading-snug transition-colors',
            'text-neutral-900 dark:text-neutral-100',
            'group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:opacity-100',
            done ? 'line-through opacity-40 dark:opacity-50' : 'no-underline'
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
