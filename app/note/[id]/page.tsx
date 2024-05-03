import NoteUI from '#components/note-ui'
import { db } from '#lib/db'
import React from 'react'

export const metadata = {
  robots: { index: false },
}

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const note = await db.note.findUnique({ where: { id: Number(params.id) } })
  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteUI note={note} isEditing={false} />
}
