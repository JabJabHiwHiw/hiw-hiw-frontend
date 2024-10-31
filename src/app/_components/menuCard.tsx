'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import type { MenuDetail } from '../types'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
export default function MenuCard(props: MenuDetail) {
  const { id, name, description, imageUrl, isFavorite, isOwner } = props
  const router = useRouter()
  const handleCardClick = () => {
    router.push(`/menus/${id}`)
  }
  const handleCreateMenu = () => {
    router.push('/create-menu')
  }
  const handleFavorite = (isFavorite: boolean) => {
    console.log(!isFavorite)
  }
  return (
    <Card
      className="flex flex-row w-full max-w-[600px] h-[200px] justify-between hover:shadow-lg hover:cursor-pointer"
      onClick={() => {
        handleCardClick()
      }}
    >
      <CardHeader className="h4">
        <CardTitle className="h4 bold text-black">{name}</CardTitle>
        <CardDescription className="text-gray-400 h-full">
          {description}
        </CardDescription>
        {isOwner ? (
          <button
            type="button"
            className="w-fit"
            onClick={(e) => {
              e.stopPropagation()
              handleCreateMenu()
            }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              size={'1x'}
              className="text-yellow-300 hover:text-yellow-400"
            />
          </button>
        ) : (
          <button
            type="button"
            className="w-fit"
            onClick={(e) => {
              e.stopPropagation()
              handleFavorite(isFavorite)
            }}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeart : faHeartRegular}
              size={'1x'}
              className={cn(
                'hover:text-yellow-400',
                isFavorite ? 'text-yellow-300' : 'text-yellow-500'
              )}
            />
          </button>
        )}
      </CardHeader>

      <CardContent className="flex-none relative h-full p-0 w-[200px] ">
        <Image
          alt="MenuPic"
          src={imageUrl}
          fill={true}
          className="w-full h-full object-cover rounded-r-xl"
        />
      </CardContent>
    </Card>
  )
}
