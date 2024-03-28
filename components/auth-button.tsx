import Link from 'next/link'
import Image from 'next/image'
import { getUserFromSession } from '#libs/get-user-from-session'

type Props = {
  children?: React.ReactNode
  noteId: string | null
}

export default function AuthButton({
  children,
  noteId
}: Props) {
  const user = getUserFromSession()
  const isDraft = noteId == null

  if (user) {
    return (
      // Use hard link
      <a href={`/note/edit/${noteId || ''}`} className="link--unstyled">
        <button
          className={[
            'edit-button',
            isDraft ? 'edit-button--solid' : 'edit-button--outline'
          ].join(' ')}
          role="menuitem"
        >
          {children}
          <Image
            src={`https://avatars.githubusercontent.com/${user}?s=40`}
            alt="User Avatar"
            title={user}
            className="avatar"
            width={40}
            height={40}
          />
        </button>
      </a>
    )
  }

  return (
    <Link href="/auth" className="link--unstyled">
      <button
        className={[
          'edit-button',
          isDraft ? 'edit-button--solid' : 'edit-button--outline'
        ].join(' ')}
        role="menuitem"
      >
        Login to Add
      </button>
    </Link>
  )
}