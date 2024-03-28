import './style.css'

import React from 'react'
import Sidebar from '#components/sidebar'
import AuthButton from '#components/auth-button'
import prisma from '#prisma/prisma'
import { Note } from '#types/index'
import LogoutButton from '#components/logout-button'

export const metadata = {
  title: 'Next.js App Router + React Server Components Demo',
  description: 'Demo of React Server Components in Next.js.',
  openGraph: {
    title: 'Next.js App Router + React Server Components Demo',
    description:
      'Demo of React Server Components in Next.js.',
    images: ['https://next-rsc-notes.vercel.app/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const notes = await prisma.note.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  let notesArray: Note[] = notes
    ? (Object.values(notes) as Note[]).sort(
      (a, b) => Number(a.id) - Number(b.id)
    )
    : []

  return (
    <html lang="en">
      <body>
        <div className="container">
          <div className="banner">
            <a
              href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
              target="_blank"
            >
              Learn more →
            </a>
          </div>
          <div className="logout-section">
            <LogoutButton />
          </div>
          <div className="main">
            <Sidebar notes={notesArray}>
              <AuthButton noteId={null}>Add</AuthButton>
            </Sidebar>
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}