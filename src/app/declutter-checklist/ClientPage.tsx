'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import data from '@/const/declutter-checklist.json'
import CategoryList from './components/CategoryList'
import Checklist from './components/Checklist'

export type DeclutterCategory = { category: string; items: string[] }
const checklist = data as DeclutterCategory[]

export default function ClientPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Lock page scroll only on this route; release on unmount (CSS-only inner scroll areas)
  useEffect(() => {
    document.documentElement.classList.add('no-scroll')
    document.body.classList.add('no-scroll')
    return () => {
      document.documentElement.classList.remove('no-scroll')
      document.body.classList.remove('no-scroll')
    }
  }, [])

  // Keep done state per category index; store as a Map for simplicity
  const [doneByCategory, setDoneByCategory] = useState<Map<number, Set<number>>>(new Map())

  // Derive active index from query string (?c=<index>) to support browser back/forward.
  const activeIndex: number | null = (() => {
    const c = searchParams.get('c')
    if (c == null) return null
    const n = Number(c)
    return Number.isInteger(n) && n >= 0 && n < checklist.length ? n : null
  })()

  const onSelect = (_c: DeclutterCategory, index: number) => {
    router.push(`${pathname}?c=${index}`, { scroll: false })
  }

  const activeCategory = activeIndex === null ? null : checklist[activeIndex]

  const doneForActive = (() => {
    if (activeIndex === null) return new Set<number>()
    const found = doneByCategory.get(activeIndex)
    return found ?? new Set<number>()
  })()

  const toggleDone = (idx: number) => {
    if (activeIndex === null) return
    setDoneByCategory((prev) => {
      const next = new Map(prev)
      const set = new Set(next.get(activeIndex) ?? new Set<number>())
      if (set.has(idx)) set.delete(idx)
      else set.add(idx)
      next.set(activeIndex, set)
      return next
    })
  }

  const containerClasses = 'max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12'

  return (
    // Full-height page area; disable document scroll and let columns scroll (this route only)
    <main className={`h-full overflow-hidden ${containerClasses}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 h-full min-h-0 overflow-hidden">
        {/* Left column: fixed-height container; CategoryList handles its own scroll */}
        <section className={`pt-14 sm:pt-20 md:pt-24 pb-8 md:pb-12 self-stretch flex flex-col h-full overflow-hidden min-h-0 ${activeCategory === null ? 'md:col-span-2' : ''}`}>
          {activeCategory === null ? (
            <CategoryList onSelect={onSelect} />
          ) : (
            <div>
              <button
                type="button"
                onClick={() => router.push(pathname, { scroll: false })}
                className="text-sm sm:text-base text-neutral-500 hover:opacity-80 underline underline-offset-4"
                aria-label="Back to all categories"
              >
                Back
              </button>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.05] cursor-pointer hover:opacity-80"
                onClick={() => router.push(pathname, { scroll: false })}
                title="Back to all categories"
              >
                {activeCategory.category}
              </h1>
              <p className="mt-6 text-neutral-600 text-base sm:text-lg">
                {doneForActive.size} of {activeCategory.items.length} done
              </p>
            </div>
          )}
        </section>

        {/* Right column: fix container height; only list scrolls */}
        {activeCategory && (
          <section className="pt-6 md:pt-24 pb-24 flex flex-col h-full overflow-hidden min-h-0">
            {/* activeIndex is non-null in this block; cast to satisfy types in callbacks */}
            <Checklist items={activeCategory.items} done={doneForActive} onToggle={toggleDone} />
          </section>
        )}
      </div>
    </main>
  )
}

