
import ClientPage from './ClientPage'
import { Suspense } from 'react'

export default function Page() {
  // Wrap client hooks (useSearchParams) usage in Suspense per Next guidance.
  // This page is fully client-controlled, so we render ClientPage inside Suspense.
  return (
    <Suspense fallback={null}>
      <ClientPage />
    </Suspense>
  )
}
