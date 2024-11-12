'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { IngredientComboBox } from './IngredientComboBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import type { Ingredient, RequireIngredient } from '@/app/types'
import { useSession } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import axios from 'axios'


export function InputIngredientTable(props: {
  setRequiredIngredients: (ingredients: RequireIngredient[]) => void
}) {
  const [reqIngredients, setReqIngredients] = React.useState<
    RequireIngredient[]
  >([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const { session } = useSession()
  useEffect(() => {
    if (!session) return
    session.getToken().then((token) => {
      axios
        .get('http://137.184.249.83:80/food/ingredients', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const ingredients = response.data.ingredients
          setIngredients(ingredients)
        })
    })
  }, [session])

  const addIngredientRow = () => {
    setReqIngredients([
      ...reqIngredients,
      { name: '', required_quantity: '', ingredient_id: '' },
    ])
  }

  React.useEffect(() => {
    if (reqIngredients.length === 0) return
    props.setRequiredIngredients(reqIngredients)
  }, [reqIngredients, props])

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...reqIngredients]
    updatedIngredients[index].ingredient_id = value
    updatedIngredients[index].name =
      ingredients.find((ing) => ing.id === value)?.name || ''
    setReqIngredients(updatedIngredients)
  }

  const handleAmountChange = (index: number, value: string) => {
    const updatedIngredients = [...reqIngredients]
    updatedIngredients[index].required_quantity = value
    setReqIngredients(updatedIngredients)
  }

  return (
    <div className="flex flex-col space-y-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-primary-200 border border-primary-300">
            <th className="py-2 px-4 text-left h4 font-bold">Ingredient</th>
            <th className="py-2 px-4 text-left h4 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {reqIngredients.map((ingredient, index) => (
            <tr key={index}>
              <td className="p-2 w-1/2">
                <IngredientComboBox
                  value={ingredient.ingredient_id}
                  onChange={(value) => handleIngredientChange(index, value)}
                  ingredients={ingredients}
                />
              </td>
              <td className="p-2 w-1/2">
                <input
                  type="text"
                  value={ingredient.required_quantity}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  className=" w-full border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
                  placeholder="Enter amount"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant="yellow"
        onClick={addIngredientRow}
        className="rounded-t-none"
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 pr-2" /> Add
        Ingredient
      </Button>
    </div>
  )
}
