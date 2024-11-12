import { Input } from '@/components/ui/input'
import MenuCard from '../_components/menuCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function DiscovePage() {
  //mock prop
  const prop = [
    {
      id: "3392a6d4-c5a8-438a-ac8b-899ab1924300",
      name: 'Menu Name',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: true,
    },
    {
      id: "2ea0b8a5-75fb-4283-86b3-09c1d3d93746",
      name: 'Menu Name 2',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: true,
      isOwner: false,
    },
    {
      id: "65829b34-f716-4fb7-9844-f27c6c6ccf31",
      name: 'Menu Name 3',
      description:
        'Menu Description ja Menu Description ja Menu Description ja Menu Description ja',
      imageUrl: 'https://www.gstatic.com/webp/gallery/1.jpg',
      isFavorite: false,
      isOwner: false,
    },
  ]
  const categories = [
    'Japanese',
    'Chinese',
    'Korean',
    'Western',
    'Thai',
    'Vietnamese',
    'Indian',
    'Italian',
    'French',
    'Spanish',
    'Mexican',
    'Brazilian',
    'Turkish',
    'Middle Eastern',
    'African',
    'American',
    'Other',
  ]
  return (
    <div className="flex flex-col h1 text-primary-400 items-center px-[100px] gap-3 py-6">
      <div className="flex w-full md:justify-between gap-4 text-gray-400">
        <Input
          type="text"
          placeholder="Search by Menu Name, Ingredient"
          className="w-full min-w-[150px] md:w-[465px]"
        />
        <div className="flex gap-3 ">
          <Select>
            <SelectTrigger className="lg:w-[180px] w-[100px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="lg:w-[180px] w-[100px]">
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="lg:w-[180px] w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="lg:w-[180px] w-[100px]">
              <SelectItem value="all">All Menu</SelectItem>
              <SelectItem value="fridge">Menu From My Fridge</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {prop.map((menu) => (
          <MenuCard
            key={menu.id}
            description={menu.description}
            id={menu.id}
            imageUrl={menu.imageUrl}
            isFavorite={menu.isFavorite}
            isOwner={menu.isOwner}
            name={menu.name}
          />
        ))}
      </div>
    </div>
  )
}
