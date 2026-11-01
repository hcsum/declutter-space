This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Printable checklist assets

Kitchen, bedroom and closet PDFs and first-page WebP previews are committed in
`public/checklists/{locale}/`. They use the same translated item data as the
interactive lists. To regenerate after changing that data:

```bash
npm run assets:checklists
```

The generator needs a local Chrome installation (macOS/Linux), or `CHROME_PATH`
pointing to its executable. Install CJK fonts when generating on Linux, and verify
Chinese/Japanese text in both the PDF and preview. It checks translation item
counts and layout overflow before exporting. PDF text remains selectable.

Edit `src/lib/checklist/printables.json` for featured rooms, localized resource
copy and items per PDF page. Commit regenerated assets with the source changes;
normal deployments serve these static files without running Chrome.

Supported content languages are defined in `src/i18n/page-locales.ts`, shared by
metadata (which rejects untranslated pages), language navigation and sitemap.
When adding a translation, update this registry along with the actual page copy.

To check a running production preview's status codes, metadata, internal links,
sitemap and downloadable assets, run `npm run check:seo`. It defaults to
`http://localhost:3107`; set `SEO_BASE_URL` to check another preview.

## Target keywords

1. how to declutter your home
2. 30 day declutter challenge
3. declutter checklist
4. how to declutter digital files
5. digital declutter checklist

## Second Look sharing

Second Look and the dashboard offer **Share item** for an individual belonging.
The dialog supports a photo, an optional story (600 characters), a live card
preview, an 1800-pixel-wide PNG download, and a public link. The new UI is
translated into English, Chinese, Japanese, German, and Spanish.

### Behavior and data

- Publishing requires the item's owner to be logged in. Recipients can open
  `/{locale}/share/{token}` and download the card without an account.
- PNG export does not publish anything. Uploaded photos are saved immediately
  to the owning item and appear in the item list, even if the dialog is closed
  without publishing. The public card's description and photo update only when
  **Create share link** or **Save changes** is clicked.
- Existing shares show **Saved** when there are no changes, using a normal cursor.
  Editing enables **Save changes**, which updates the existing public page without
  changing its URL. Reverting edits restores the saved state.
- The public card exposes the item's name, quantity, photo, and published story.
  It does not expose the owner's account details or the private review deadline.
- Updating a share keeps its URL. Turning sharing off deletes the `ItemShare`
  record and immediately invalidates the URL. Publishing again creates a new
  token; old links stay invalid. Deleting the item cascades to its share.
- Links are not searchable listings: share pages are dynamic and marked
  `noindex, nofollow`. Anyone who has a link can view and forward it.
- Photos accept JPG, PNG, and WebP up to 15 MB. Browser-side processing converts
  them to JPEG, at most 1800 pixels on the longest side, and compresses them below
  1.8 million base64 characters to fit the existing 2 MB server-action limit.
  Photos are currently stored in PostgreSQL on `Item.image`, with a published
  snapshot on `ItemShare.image`;
  consider object storage if image volume grows substantially.
- Preview and PNG use the same canvas renderer. Description edits retain the
  previous preview while the next version is prepared; source photos are cached
  instead of fetched for every keystroke. Text wraps and card height grows with
  the story. Existing remote item images need CORS permission; uploading a
  replacement photo avoids this dependency.
- Adding, keeping, and removing items show distinct loading labels, prevent
  duplicate submissions, and remain busy through the list refresh. Sharing,
  photo saving, revocation, and copying each show feedback on the relevant control.
  Failed saves retain editable input; a failed refresh reports that the mutation
  already succeeded and offers a list-only retry.
- This version shares one item per link. Collections, claiming/purchasing items,
  PDF export, and dedicated print layouts are not implemented.

### Deployment and verification

Production deployment is triggered by pushing `main` to
`hcsum/declutter-space`, which is connected to Vercel's `declutter-space` project.
Apply the additive migration **before** releasing the new application code:

```bash
npx prisma migrate deploy
npm run build
```

Migration: `prisma/migrations/20261101000000_add_item_shares/migration.sql`.
It adds only `ItemShare`, its unique indexes, and a cascading foreign key to `Item`.
The follow-up `20261101010000_sync_shared_item_photos` backfills legacy share-only
photos into empty item photos without overwriting existing ones, then snapshots
existing item photos onto their published cards.
Run migrations against the intended production connection; never point QA data
or test-session tooling at production.

Pre-release verification used an isolated local PostgreSQL database and Brave:
publishing/updating Unicode stories, PNG signature/filename/1800px width,
anonymous access, another user's rejected update, photo upload/compression,
revocation, fresh tokens on re-publishing, and 390px mobile layouts all passed.
The production build, TypeScript check, and targeted ESLint check also passed;
the full build reports existing `next/image` recommendations on older pages.

Key files: `src/actions/item-shares.ts`, `src/components/item-share/`, and
`src/app/[lang]/share/[token]/page.tsx`.

Browser regression checks for loading duration, repeat submits, description
editing/photo reuse, stable share URLs, photo persistence, and failure recovery:

```bash
SHARING_QA_DATABASE_URL="$LOCAL_QA_DATABASE_URL" \
SHARING_QA_SESSION_SECRET="$LOCAL_QA_SESSION_SECRET" \
node scripts/check-second-look-interactions.mjs
```

These checks require a running web-access browser proxy and a local app using
the same QA database and session secret. The script rejects non-local databases
and database names not ending in `_qa`; it creates only `interaction-qa-*` fixtures.
