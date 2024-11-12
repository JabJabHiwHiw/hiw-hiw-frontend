'use client'

import IngredientsTable from '../_components/IngredientTable'
import NumberOfServing from '../_components/NumberOfServing'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'
import getMenu from '@/lib/getMenu'
import { useEffect } from 'react'
import { useSession } from '@clerk/nextjs'
import axios from 'axios'
import { handleFavorite } from '@/app/api/auth/auth'

export default function MenuDetailPage({
  params,
}: {
  params: { mid: string }
}) {
  const mid = params.mid
  console.log('mid = ' + mid)
  const [menuResponse, setMenuResponse] = useState<Menu | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { session } = useSession()

  const fetchFavoriteMenus = async () => {
    if (!session) return
    const token = await session.getToken()
    if (!token) return

    try {
      const response = await axios.get(
        'http://137.184.249.83:80/user/favorite-menus',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const favoriteMenus: string[] = response.data.favorite_menus
      console.log(favoriteMenus)
      setIsFavorite(favoriteMenus.includes(mid))
    } catch (error) {
      console.error('Error fetching favorite menus:', error)
    }
  }

  useEffect(() => {
    fetchFavoriteMenus()
  }, [session])

  const handleFavoriteClick = async () => {
    if (session) {
      const token = await session.getToken()
      await handleFavorite(mid, isFavorite, token ?? '')
      // console.log('session:', token)
    }
    fetchFavoriteMenus()
  }

  useEffect(() => {
    const fetchData = async () => {
      const menu = await getMenu(mid)
      console.log(menu)
      setMenuResponse(menu)
    }
    fetchData()
  }, [mid])

  const default_image =
    'https://utfs.io/f/Rik3NdCrElaD7sKaSFBM2XYUtdbmOQz1iZwSvlJMNngGoR6E'
  if (!menuResponse) return <p>Menu is loading ...</p>
  return (
    <div className="flex flex-col items-left p-16 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="h1 font-bold">{menuResponse.item.name}</h1>

        <button type="button" className="w-fit" onClick={handleFavoriteClick}>
          <FontAwesomeIcon
            icon={isFavorite ? faHeart : faHeartRegular}
            size={'2x'}
            className={cn(
              'hover:text-yellow-400',
              isFavorite ? 'text-yellow-300' : 'text-yellow-500'
            )}
          />
        </button>
      </div>
      <div className="relative w-full h-[400px]">
        {menuResponse.item.image_url == null ? (
          <Image
            alt="MenuPic"
            src={default_image}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        ) : (
          <Image
            alt="MenuPic"
            src={menuResponse.item.image_url}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        )}
      </div>

      <h5 className="h4 text-gray-400">{menuResponse.item.description}</h5>

      <div className="flex flex-col space-y-6">
        <h2 className="h3 font-bold">Ingredients</h2>
        <NumberOfServing
          variant="default"
          initialServings={menuResponse.item.servings}
        />
        {menuResponse.item.ingredients ? (
          <IngredientsTable ingredients={menuResponse.item.ingredients} />
        ) : (
          <p>No ingredients available.</p>
        )}
      </div>

      <div className="flex flex-col space-y-6">
        <h2 className="h3 font-bold">Recipe</h2>
        {menuResponse.item.steps.map((step) => (
          <div key={step.step_no}>
            <h4 className="h4 font-bold">Step {step.step_no}</h4>
            <h4 className="h4">{step.step}</h4>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4 pt-8">
        <Link href={`/menu/${mid}/cook`} passHref className="w-full">
          <Button variant="yellow" className="w-full">
            Cook from my fridge
          </Button>
        </Link>

        <Link href={`/discover`} passHref className="w-full">
          <Button variant="secondary" className="w-full">
            Back
          </Button>
        </Link>
      </div>
    </div>
  )
}
