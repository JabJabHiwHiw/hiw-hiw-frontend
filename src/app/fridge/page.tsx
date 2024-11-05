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

import type { FridgeItem, SortItem } from '@/app/types'
import FridgeTable from './_components/fridgeTable'
import FridgeModal from './_components/fridgeModal'
import { SelectValue } from '@radix-ui/react-select'

export default function FridgePage() {
  const categories = [
    'Baking Supplies',
    'Beverages',
    'Dairy',
    'Fruits',
    'Grain',
    'Herbs and Spices',
    'Meat and Poultry',
    'Sauce and Condiment',
    'Seafood',
    'Vegetables',
  ]
  const timeToExpire = [
    'Expired',
    'Expires today',
    'Expires within 3 days',
    'Expires within 7 days',
    'All',
  ]
  const mockFridgeItems = [
    {
      name: 'Fresh Milk',
      quantity: '1 liter',
      addedDate: new Date('2024-10-25'),
      expiredDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      category: 'Dairy',
    },
    {
      name: 'Fresh Milk',
      quantity: '10 liter',
      addedDate: new Date('2024-10-26'),
      expiredDate: new Date('2024-10-30'),
      category: 'Dairy',
    },
    {
      name: 'Apple',
      quantity: '1 kilo',
      addedDate: new Date('2024-10-25'),
      expiredDate: new Date(Date.now()),
      category: 'Fruits',
    },
    {
      name: 'Apple',
      quantity: '10 kilo',
      addedDate: new Date('2024-6-25'),
      expiredDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
      category: 'Fruits',
    },
    {
      name: 'Apple',
      quantity: '100 kilo',
      addedDate: new Date('2024-10-25'),
      expiredDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      category: 'Fruits',
    },
    {
      name: 'Carrot',
      quantity: '500 grams',
      addedDate: new Date('2024-10-01'),
      expiredDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      category: 'Vegetables',
    },
    {
      name: 'Chicken Breast',
      quantity: '9 kilo',
      addedDate: new Date('2024-10-19'),
      expiredDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      category: 'Meat and Poultry',
    },
    {
      name: 'Chicken Breast',
      quantity: '5 kilo',
      addedDate: new Date('2024-10-18'),
      expiredDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      category: 'Meat and Poultry',
    },
    {
      name: 'Chicken Breast',
      quantity: '20 kilo',
      addedDate: new Date('2024-10-11'),
      expiredDate: new Date('2024-10-30'),
      category: 'Meat and Poultry',
    },
    {
      name: 'Salmon Fillet',
      quantity: '250 grams',
      addedDate: new Date('2024-10-10'),
      expiredDate: new Date('2024-10-27'),
      category: 'Seafood',
    },
    {
      name: 'Brown Rice',
      quantity: '2 kilos',
      addedDate: new Date('2024-10-01'),
      expiredDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      category: 'Grain',
    },
    {
      name: 'Ketchup',
      quantity: '500 ml',
      addedDate: new Date('2024-01-01'),
      expiredDate: new Date(Date.now() + 500 * 24 * 60 * 60 * 1000),
      category: 'Sauce and Condiment',
    },
    {
      name: 'Basil',
      quantity: '100 grams',
      addedDate: new Date('2024-10-20'),
      expiredDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      category: 'Herbs and Spices',
    },
    {
      name: 'Orange Juice',
      quantity: '1 liter',
      addedDate: new Date('2024-10-24'),
      expiredDate: new Date(Date.now() + 1 * 5 * 60 * 60 * 1000),
      category: 'Beverages',
    },
    {
      name: 'Flour',
      quantity: '5 kilos',
      addedDate: new Date('2024-01-01'),
      expiredDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
      category: 'Baking Supplies',
    },
  ]

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
  const addExpCat = (items: FridgeItem[]) => {
    return items.map((item) => ({
      ...item,
      expCat: calculateExpCat(item.expiredDate),
    }))
  }
  // data from backend
  const fridgeItems = addExpCat(mockFridgeItems)
  const [filteredFridgeItems, setFilteredFridgeItems] =
    useState<FridgeItem[]>(fridgeItems)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTimeToExpire, setSelectedTimeToExpire] =
    useState<string>('All')
  const [sortCriteria, setSortCriteria] = useState<SortItem[]>([
    { key: 'name', value: 'asc' },
  ])

  useEffect(() => {
    let newFridgeItems: FridgeItem[] = [...fridgeItems]
    if (selectedCategories.length != 0) {
      newFridgeItems = newFridgeItems.filter((item) =>
        selectedCategories.includes(item.category)
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
  }, [selectedCategories, selectedTimeToExpire])

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
        <FridgeModal>
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
      ></FridgeTable>
    </div>
  )
}
