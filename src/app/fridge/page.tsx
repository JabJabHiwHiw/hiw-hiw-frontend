'use client'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import type { FridgeItem, SortItem, Ingredient, FridgeRaw } from '@/app/types'
import FridgeTable from './_components/fridgeTable'
import FridgeModal from './_components/fridgeModal'
import { SelectValue } from '@radix-ui/react-select'
import axios from 'axios'
import { useSession } from '@clerk/nextjs'

export default function FridgePage() {
  const timeToExpire = [
    'Expired',
    'Expires today',
    'Expires within 3 days',
    'Expires within 7 days',
    'All',
  ]
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([])
  const [filteredFridgeItems, setFilteredFridgeItems] = useState<FridgeItem[]>(
    []
  )
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTimeToExpire, setSelectedTimeToExpire] =
    useState<string>('All')
  const [sortCriteria, setSortCriteria] = useState<SortItem[]>([
    { key: 'name', value: 'asc' },
  ])

  const { isLoaded: isSessionLoaded, session } = useSession()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    async function getIngredients() {
      try {
        const response = await axios.get(
          `http://137.184.249.83:80/food/ingredients`
        )
        setIngredients([...response.data.ingredients])
      } catch (error) {
        console.error('Error fetching ingredients:', error)
      }
    }
    getIngredients()
  }, [])

  useEffect(() => {
    setCategories(Array.from(new Set(ingredients.map((item) => item.category))))
  }, [ingredients])

  useEffect(() => {
    if (isSessionLoaded && session) {
      session
        .getToken()
        .then((fetchedToken) => {
          setToken(fetchedToken)
          console.log('Fetched token:', fetchedToken)
        })
        .catch((error) => {
          console.error('Error fetching token:', error)
        })
    }
  }, [isSessionLoaded, session])

  const calculateExpCat = (expiredDate: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const expDate = new Date(expiredDate)
    expDate.setHours(0, 0, 0, 0)

    const daysToExpire = Math.floor(
      (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysToExpire < 0) return 'Expired'
    if (daysToExpire === 0) return 'Expires today'
    if (daysToExpire <= 3) return 'Expires within 3 days'
    if (daysToExpire <= 7) return 'Expires within 7 days'
    return ''
  }
  const addExpCat = (items: FridgeRaw[]) => {
    console.log('items', items)
    return items.map((item) => ({
      id: item.id,
      name: ingredients?.find((i) => i.id === item.ingredient_id)?.name,
      quantity: item.quantity,
      addedDate: new Date(item.added_date.seconds * 1000),
      expiredDate: new Date(item.expired_date.seconds * 1000),
      expCat: calculateExpCat(new Date(item.expired_date.seconds * 1000)),
      category: ingredients?.find((i) => i.id === item.ingredient_id)?.category,
    }))
  }

  const getFridgeItems = async () => {
    if (!token || !ingredients) return
    try {
      const response = await axios.get('http://137.184.249.83:80/food/fridge', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFridgeItems(addExpCat(response.data.items || []))
      console.log('Fetch Result:', response.data)
    } catch (error) {
      console.error('Error fetching fridge items:', error)
    }
  }
  useEffect(() => {
    getFridgeItems()
  }, [token, ingredients])

  useEffect(() => {
    if (fridgeItems.length > 0) {
      let newFridgeItems: FridgeItem[] = [...fridgeItems]
      if (selectedCategories.length != 0) {
        newFridgeItems = newFridgeItems.filter(
          (item) => item.category && selectedCategories.includes(item.category)
        )
      }
      if (selectedTimeToExpire === 'Expired') {
        newFridgeItems = newFridgeItems.filter(
          (item) => item.expCat === 'Expired'
        )
      } else if (selectedTimeToExpire === 'Expires today') {
        newFridgeItems = newFridgeItems.filter(
          (item) => item.expCat === 'Expires today'
        )
      } else if (selectedTimeToExpire === 'Expires within 3 days') {
        newFridgeItems = newFridgeItems.filter(
          (item) =>
            item.expCat &&
            ['Expires today', 'Expires within 3 days'].includes(item.expCat)
        )
      } else if (selectedTimeToExpire === 'Expires within 7 days') {
        newFridgeItems = newFridgeItems.filter(
          (item) =>
            item.expCat &&
            [
              'Expires today',
              'Expires within 3 days',
              'Expires within 7 days',
            ].includes(item.expCat)
        )
      }
      newFridgeItems = sortFridgeItems(newFridgeItems)
      setFilteredFridgeItems(newFridgeItems)
    }
  }, [fridgeItems, selectedCategories, selectedTimeToExpire])

  useEffect(() => {
    setFilteredFridgeItems(sortFridgeItems(filteredFridgeItems))
  }, [sortCriteria])

  const handleSelectCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category])
    }
  }
  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    )
  }
  const handleSelectTimeToExpire = (time: string) => {
    setSelectedTimeToExpire(time)
  }

  const handleSortToggle = (key: string) => {
    setSortCriteria((prevCriteria: SortItem[]) => {
      const existingCriterion = prevCriteria.find(
        (criterion) => criterion.key === key
      )
      if (existingCriterion) {
        if (existingCriterion.value === 'asc') {
          return prevCriteria.map((criterion) =>
            criterion.key === key ? { ...criterion, value: 'desc' } : criterion
          )
        } else {
          return prevCriteria.filter((criterion) => criterion.key !== key)
        }
      } else {
        return [...prevCriteria, { key, value: 'asc' }]
      }
    })
  }

  const sortFridgeItems = (items: FridgeItem[]) => {
    const sortKeys = sortCriteria.map((criterion) => criterion.key)
    const sortOrders = sortCriteria.map((criterion) => criterion.value)
    const updatedItems = _.orderBy(items, sortKeys, sortOrders)
    return updatedItems
  }

  if (!ingredients) return null
  return (
    <div className="flex flex-col h1 text-primary-400 items-center lg:px-[150px] md:px-[100px] px-12 gap-3 py-6">
      <div className="flex w-full items-center justify-between text-gray-400">
        <div className="flex items-center gap-3">
          <div className="text-sm">Filter:</div>
          <Select onValueChange={handleSelectCategory}>
            <SelectTrigger className="md:w-[180px] w-[100px]">
              <span>Category</span>
            </SelectTrigger>
            <SelectContent className="md:w-[180px] w-[100px]">
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  showCheckIcon={false}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleSelectTimeToExpire}
            value={selectedTimeToExpire}
          >
            <SelectTrigger className="md:w-[180px] w-[100px]">
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent className="md:w-[180px] w-[100px]">
              {timeToExpire.map((time) => (
                <SelectItem key={time} value={time} showCheckIcon={false}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FridgeModal
          ingredients={ingredients}
          onFinish={() => getFridgeItems()}
        >
          <Button variant={'outline'}>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPlus} size={'1x'} />
              Add Item
            </div>
          </Button>
        </FridgeModal>
      </div>
      <div className="flex w-full gap-1 flex-wrap text-gray-400">
        {selectedCategories.map((category) => (
          <div
            key={category}
            className="flex items-center bg-primary-200 border border-2 border-primary-300 px-4 py-2 rounded-full text-sm gap-2"
          >
            <span>{category}</span>
            <button
              onClick={() => handleRemoveCategory(category)}
              className="flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} size={'1x'} />
            </button>
          </div>
        ))}
      </div>
      <FridgeTable
        fridgeItems={filteredFridgeItems}
        sortCriteria={sortCriteria}
        handleSortToggle={handleSortToggle}
        ingredients={ingredients}
        onFinish={() => getFridgeItems()}
      ></FridgeTable>
    </div>
  )
}
