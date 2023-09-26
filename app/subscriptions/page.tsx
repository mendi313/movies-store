'use client'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Subscriptions() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/subscriptions')
    }
})
  return (
    <div>subscriptions</div>
  )
}
