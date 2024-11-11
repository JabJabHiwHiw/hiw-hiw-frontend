'use client'
import MenuCard from '@/app/_components/menuCard'
import type { Menu } from '@/app/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function CustomTab(props: { userId: string }) {
  const [menus, setMenus] = useState<Menu[]>([])
  const [favoriteMenus, setFavoriteMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://137.184.249.83/food/menus')
      .then((response) => {
        const menusData: Menu[] = response.data.menus
        setMenus(menusData)
      })
      .catch((error) => {
        console.error('Error fetching menus:', error)
      })
    setLoading(false)
  }, [])

  return (
    <Tabs defaultValue="myrecipe" className="w-full max-w-full lg:w-[565px]">
      <TabsList>
        <TabsTrigger value="myrecipe">My Recipe</TabsTrigger>
        <TabsTrigger value="myfavorite">My Favorite</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-screen lg:h-[65vh] w-full lg:p-4">
        <TabsContent value="myrecipe" className="flex flex-col gap-2">
          {!loading &&
            menus.map(
              (menu) =>
                menu.created_by === props.userId && (
                  <MenuCard
                    key={menu.id}
                    description={menu.description}
                    id={menu.id}
                    imageUrl={
                      menu.imageUrl
                        ? menu.imageUrl
                        : 'https://www.gstatic.com/webp/gallery/1.jpg'
                    }
                    isFavorite={false}
                    isOwner={true}
                    name={menu.name}
                  />
                )
            )}
        </TabsContent>
        <TabsContent value="myfavorite" className="flex flex-col gap-2">
          {!loading &&
            menus.map(
              (menu) =>
                menu.id in favoriteMenus && (
                  <MenuCard
                    key={menu.id}
                    description={menu.description}
                    id={menu.id}
                    imageUrl={
                      menu.imageUrl
                        ? menu.imageUrl
                        : 'https://www.gstatic.com/webp/gallery/1.jpg'
                    }
                    isFavorite={true}
                    isOwner={false}
                    name={menu.name}
                  />
                )
            )}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
