'use client'
import MenuCard from '../_components/menuCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import type { Menu } from '../types'
import _ from 'lodash'

import { Input } from '@/components/ui/input'
import { useSession, useUser } from '@clerk/nextjs'

export default function DiscovePage() {
  const { isLoaded: isUserLoaded, user } = useUser()
  useEffect(() => {
    if (!user) return
    console.log('user:', user)
  }, [user])

  //fetch favorite menu

  //mock props
  const [menus, setMenus] = useState<Menu[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favoriteMenusId, setFavoriteMenusId] = useState<string[]>([])
  const [filterByCategory, setFilterByCategory] = useState<string>('all')
  const [filterByFridge, setFilterByFridge] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [viewMenus, setViewMenus] = useState<Menu[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchMenus, setSearchMenus] = useState<Menu[]>([])
  const [filterCategoryMenus, setFilterCategoryMenus] = useState<Menu[]>([])
  const [filterFridgeMenus, setFilterFridgeMenus] = useState<Menu[]>([])
  const { session } = useSession()

  useEffect(() => {
    if (!user) return
    console.log('user:', user)
  }, [user])

  const fetchFavoriteMenus = async () => {
    if (!session || !user) return
    const token = await session.getToken()
    if (!token) return
    setLoading(true)
    try {
      axios
        .get('http://137.184.249.83:80/user/favorite-menus', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const favoriteMenus: string[] = response.data.favorite_menus
          setFavoriteMenusId(favoriteMenus ?? [])
        })
    } catch (error) {
      console.error('Error fetching favorite menus:', error)
    } finally {
      setLoading(false)
    }
  }

  //fetch favorite menu
  useEffect(() => {
    fetchFavoriteMenus()
  }, [session, user])

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://137.184.249.83/food/menus')
      .then((response) => {
        const menusData: Menu[] = response.data.menus
        setMenus(menusData)
        setViewMenus(menusData)
      })
      .catch((error) => {
        console.error('Error fetching menus:', error)
      })
    setLoading(false)
  }, [])

  useEffect(() => {
    if (filterByCategory !== 'all') {
      setLoading(true)
      axios
        .get(
          `http://137.184.249.83:80/food/menu/search?query=${filterByCategory}`
        )
        .then((response) => {
          const menusData: Menu[] = response.data.menus
          setFilterCategoryMenus(menusData)
        })
    } else {
      setFilterCategoryMenus(menus)
    }
  }, [filterByCategory, menus])

  useEffect(() => {
    if (filterByFridge !== 'all') {
      setLoading(true)

      if (!session) return
      session.getToken().then((token) => {
        const fridgeItems = axios
          .get('http://137.184.249.83:80/food/fridge', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const fridgeData = response.data.items
            console.log('fridgeData:', fridgeData)
            const filterByFridge = fridgeData.map(
              (item: { ingredient_id: string }) => {
                return item.ingredient_id
              }
            )
            return filterByFridge
          })
        fridgeItems.then((items) => {
          const ingredient_requests = items.map((item: string) =>
            axios.get(`http://137.184.249.83:80/food/ingredient/${item}`)
          )
          const ingredientData = Promise.all(ingredient_requests).then(
            (responses) => {
              return responses.flatMap((response) => response.data)
            }
          )
          const requests = ingredientData.then((response) =>
            response.map((item) =>
              axios.get(
                `http://137.184.249.83:80/food/menu/search?query=${item.ingredient.name}`
              )
            )
          )

          requests
            .then((reqs) => Promise.all(reqs))
            .then((responses) => {
              const menusData = responses.flatMap(
                (response) => response.data.menus
              )
              setFilterFridgeMenus(menusData)
            })
        })
        setLoading(false)
      })
    } else {
      setFilterFridgeMenus(menus)
    }
  }, [filterByFridge, menus, session])

  const debouncedSearch = useCallback(
    _.debounce(async (term) => {
      if (term) {
        try {
          setLoading(true)
          const response = await axios.get(
            `http://137.184.249.83:80/food/menu/search?query=${term}`
          )
          setSearchMenus(response.data.menus)
          setLoading(false)
        } catch (error) {
          console.error('Search error:', error)
          setLoading(false)
        }
      } else {
        setSearchMenus(menus)
      }
    }, 500),
    [menus]
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  useEffect(() => {
    setLoading(true)
    const intersection = _.intersectionWith(
      filterCategoryMenus,
      searchMenus,
      filterFridgeMenus,
      _.isEqual
    )
    setViewMenus(intersection)
    setLoading(false)
  }, [filterCategoryMenus, searchMenus, filterFridgeMenus])
  console.log('viewmenus', viewMenus)

  const categories: string[] = _.uniq(menus.map((menu) => menu.category))
  return (
    <div className="flex flex-col h1 text-primary-400 items-center md:px-[200px] px-[100px] gap-3 py-6">
      <div className="flex w-full md:justify-between gap-4 text-gray-400">
        <Input
          type="text"
          placeholder="Search by Menu Name, Ingredient"
          className="w-full min-w-[150px] md:w-[465px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setSearchMenus(searchMenus)
          }}
        />
        <div className="flex gap-3 ">
          <Select
            defaultValue="all"
            onValueChange={(e) => {
              setFilterByCategory(e)
            }}
          >
            <SelectTrigger className="lg:w-[180px] w-[100px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="lg:w-[180px] w-[100px]">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue="all"
            onValueChange={(e) => {
              setFilterByFridge(e)
            }}
          >
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
      <div className="flex flex-wrap justify-center gap-6">
        {isUserLoaded &&
          user &&
          !loading &&
          viewMenus &&
          viewMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              description={menu.description}
              id={menu.id}
              imageUrl={
                menu.image_url
                  ? menu.image_url
                  : 'https://utfs.io/f/Rik3NdCrElaD7sKaSFBM2XYUtdbmOQz1iZwSvlJMNngGoR6E'
              }
              isFavorite={favoriteMenusId.includes(menu.id)}
              isOwner={menu.created_by === user.id}
              name={menu.name}
              onFavoriteClick={fetchFavoriteMenus} // Pass the function here
            />
          ))}
      </div>
    </div>
  )
}
