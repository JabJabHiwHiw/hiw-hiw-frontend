'use client'
import MenuCard from '@/app/_components/menuCard'
import type { Menu } from '@/app/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from '@clerk/nextjs'

export default function CustomTab(props: { userId: string }) {
  const [menus, setMenus] = useState<Menu[]>([])
  const [favoriteMenusId, setFavoriteMenusId] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { session } = useSession()

  const fetchFavoriteMenus = async () => {
    if (!session) return
    const token = await session.getToken()
    if (!token) return
    setLoading(true)
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
      setFavoriteMenusId(favoriteMenus ?? [])
    } catch (error) {
      console.error('Error fetching favorite menus:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFavoriteMenus()
  }, [session])

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
      .finally(() => {
        setLoading(false)
      })
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
                    onFavoriteClick={fetchFavoriteMenus} // Pass the function here
                    key={menu.id}
                    description={menu.description}
                    id={menu.id}
                    imageUrl={
                      menu.imageUrl
                        ? menu.imageUrl
                        : 'https://www.gstatic.com/webp/gallery/1.jpg'
                    }
                    isFavorite={favoriteMenusId.includes(menu.id)}
                    isOwner={true}
                    name={menu.name}
                  />
                )
            )}
        </TabsContent>
        <TabsContent value="myfavorite" className="flex flex-col gap-2">
          {!loading &&
            menus
              .filter((menu) => favoriteMenusId.includes(menu.id))
              .map((menu) => (
                <MenuCard
                  onFavoriteClick={fetchFavoriteMenus}
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
              ))}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
