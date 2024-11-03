'use client'
// import { signIn } from '@/app/api/signin'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function TestSigninButton() {
  const [response, setResponse] = useState('')
  const handleClick = async () => {
    // const rsp = await signIn({
    //   email: '1234234@gmail.com',
    //   name: 'fgwfgdfgfdg',
    //   clerk_id: 'fgdsfsrgregsfr',
    //   profile_picture: 'wrtewqregrwregr',
    // })
    // setResponse(rsp)
  }
  return (
    <div>
      <Button
        onClick={() => {
          handleClick()
        }}
      >
        Sign in
      </Button>
      <div>{response}</div>
    </div>
  )
}
