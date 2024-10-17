import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'

import { type MenuDetail } from '../types'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { cn } from '@/lib/utils'
export default function MenuCard(props: MenuDetail) {
  const { id, name, description, imageUrl, isFavorite, isOwner } = props
  return (
    <Card className="flex flex-row w-auto h-[200px] p justify-between">
      <CardHeader className="h4">
        <CardTitle className="h4 bold text-black">{name}</CardTitle>
        <CardDescription className="text-gray-400 h-full">
          {description}
        </CardDescription>
        {isOwner ? (
          <button className="w-fit">
            <FontAwesomeIcon
              icon={faPenToSquare}
              size={'1x'}
              className="text-yellow-300"
            ></FontAwesomeIcon>
          </button>
        ) : (
          <button className="w-fit">
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
        ></Image>
      </CardContent>
    </Card>
  )
}
