export async function registerAuthApi(
  name: string | null,
  email: string,
  clerk_id: string,
  profile_picture: string
) {
  try {
    const endpoint = 'http://localhost:8080'
    const body = {
      email: email,
      name: name,
      clerk_user_id: clerk_id,
      profile_picture: profile_picture,
    }
    const rsp = await fetch(`${endpoint}/user/oauth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${sessionToken}`, // Optional: Include session token
      },
      body: JSON.stringify(body),
    })

    if (!rsp.ok) {
      // Handle HTTP errors
      const errorData = await rsp.json()
      throw new Error(errorData.error || 'Failed to register user')
    }

    const data = await rsp.json()

    return data
  } catch (e) {
    console.error('Error in registerAuthApi:', e)
    return null
  }
}
