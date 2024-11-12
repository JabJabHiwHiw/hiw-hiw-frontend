export async function registerAuthApi(
  name: string | null,
  email: string,
  clerk_id: string,
  profile_picture: string
) {
  try {
    const endpoint = 'http://137.184.249.83'
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
      },
      body: JSON.stringify(body),
    })

    if (!rsp.ok) {
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

export async function handleFavorite(
  menuId: string,
  isFavorite: boolean,
  sessionToken: string
): Promise<boolean> {
  const endpoint = 'http://137.184.249.83:80'
  const url = `${endpoint}/user/favorite-menus/${menuId}`

  const headers = {
    Authorization: `Bearer ${sessionToken}`,
  }

  if (isFavorite) {
    // Unfavorite (DELETE)
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      })
      if (response.ok) {
        console.log('Unfavorite success')
        return true
      } else {
        const errorText = await response.text()
        console.error(
          `Failed to delete favorite menu: ${response.status} - ${errorText}`
        )
        return false
      }
    } catch (e) {
      console.error('Error in handleFavorite:', e)
      return false
    }
  } else {
    // Favorite (POST)
    try {
      const response = await fetch(`${endpoint}/user/favorite-menus`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          menu_id: menuId,
        }),
      })
      if (response.ok) {
        console.log('Favorite success')
        return true
      } else {
        const errorText = await response.text()
        console.error(
          `Failed to favorite menu: ${response.status} - ${errorText}`
        )
        return false
      }
    } catch (e) {
      console.error('Error in handleFavorite:', e)
      return false
    }
  }
}
