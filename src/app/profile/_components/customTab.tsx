import MenuCard from '@/app/_components/menuCard'
import type { Menus } from '@/app/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function CustomTab(props: Menus) {
  const { menus } = props
  return (
    <Tabs defaultValue="myrecipe" className="w-full max-w-full lg:w-[565px]">
      <TabsList>
        <TabsTrigger value="myrecipe">My Recipe</TabsTrigger>
        <TabsTrigger value="myfavorite">My Favorite</TabsTrigger>
      </TabsList>
      <ScrollArea className="h-screen lg:h-[65vh] w-full lg:p-4">
        <TabsContent value="myrecipe" className="flex flex-col gap-2">
          {menus.map(
            (menu) =>
              menu.isOwner && (
                <MenuCard
                  key={menu.id}
                  description={menu.description}
                  id={menu.id}
                  imageUrl={menu.imageUrl}
                  isFavorite={menu.isFavorite}
                  isOwner={menu.isOwner}
                  name={menu.name}
                />
              )
          )}
        </TabsContent>
        <TabsContent value="myfavorite" className="flex flex-col gap-2">
          {menus.map(
            (menu) =>
              menu.isFavorite && (
                <MenuCard
                  key={menu.id}
                  description={menu.description}
                  id={menu.id}
                  imageUrl={menu.imageUrl}
                  isFavorite={menu.isFavorite}
                  isOwner={menu.isOwner}
                  name={menu.name}
                />
              )
          )}
        </TabsContent>
      </ScrollArea>
    </Tabs>
  )
}
