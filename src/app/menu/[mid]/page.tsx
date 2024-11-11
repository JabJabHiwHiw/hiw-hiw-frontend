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
import { MenuItem } from '../../../../interface'
import { useState, useEffect } from 'react'
import { useSession } from '@clerk/nextjs'
import axios from 'axios'
import { handleFavorite } from '@/app/api/auth/auth'

export default function MenuDetailPage({
  params,
}: {
  params: { mid: string }
}) {
  const mid = params.mid
  const mockMenuItem: MenuItem = {
    ingredients: [
      {
        id: '',
        name: 'Spaghetti',
        required_quantity: '250 g',
        ingredient_id: '3',
      },
      {
        id: '',
        name: 'Egg',
        required_quantity: '2',
        ingredient_id: '4',
      },
    ],
    steps: [
      {
        step_no: 1,
        step: 'Boil spaghetti until al dente.',
      },
      {
        step_no: 2,
        step: 'Cook pancetta until crispy.',
      },
      {
        step_no: 3,
        step: 'Mix the egg with cheese and add to the pasta. Stir to combine.',
      },
    ],
    id: '6717940510bcec401af9a15c',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs and pancetta',
    category: 'Italian',
    servings: 2,
    created_by: 'JayJacka',
    image_url: 'https://www.gstatic.com/webp/gallery/1.jpg',
  }

  const [isFavorite, setIsFavorite] = useState(false)
  const { session } = useSession()

  const fetchFavoriteMenus = async () => {
    if (!session) return
    const token = await session.getToken()
    if (!token) return

    try {
      const response = await axios.get(
        'http://localhost:8080/user/favorite-menus',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const favoriteMenus: string[] = response.data.favorite_menus
      setIsFavorite(favoriteMenus.includes(mockMenuItem.id))
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
      const rsp = await handleFavorite(mockMenuItem.id, isFavorite, token ?? '')
      fetchFavoriteMenus()
    }
  }

  return (
    <div className="flex flex-col items-left p-16 space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="h1 font-bold">
          {mockMenuItem.name} id:{mid}
        </h1>

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
        <Image
          alt="MenuPic"
          src={mockMenuItem.image_url}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      <h5 className="h4 text-gray-400">{mockMenuItem.description}</h5>

      <div className="flex flex-col space-y-6">
        <h2 className="h3 font-bold">Ingredients</h2>
        <NumberOfServing variant="default" initialServings={5} />
        <IngredientsTable />
      </div>

      <div className="flex flex-col space-y-6">
        <h2 className="h3 font-bold">Recipe</h2>
        {mockMenuItem.steps.map((step) => (
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
