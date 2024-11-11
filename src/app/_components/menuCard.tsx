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
import { useSession } from '@clerk/nextjs'
import { handleFavorite } from '../api/auth/auth'

interface MenuCardProps extends MenuDetail {
  onFavoriteClick: () => void
}

export default function MenuCard(props: MenuCardProps) {
  const {
    id,
    name,
    description,
    imageUrl,
    isFavorite,
    isOwner,
    onFavoriteClick,
  } = props
  const router = useRouter()
  const handleCardClick = () => {
    router.push(`/menu/${id}`)
  }
  const handleCreateMenu = () => {
    router.push('/menu/create')
  }
  const { session } = useSession()

  const handleFavoriteClick = async () => {
    if (session) {
      const token = await session.getToken()
      await handleFavorite(id, isFavorite, token ?? '')
      // console.log('session:', token)
    }
    onFavoriteClick()
  }

  return (
    <Card
      className="flex flex-row w-full min-w-[450px] max-w-[550px] h-[200px] justify-between hover:shadow-lg hover:cursor-pointer"
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
              handleFavoriteClick()
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
