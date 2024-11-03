"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { IngredientComboBox } from "./IngredientComboBox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Ingredient {
  name: string
  amount: string
}

export function InputIngredientTable() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([
    { name: "", amount: "" },
  ])

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: "", amount: "" }])
  }

  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index].name = value
    setIngredients(updatedIngredients)
  }

  const handleAmountChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index].amount = value
    setIngredients(updatedIngredients)
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
          {ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td className="p-2 w-1/2">
                <IngredientComboBox
                  value={ingredient.name}
                  onChange={(value) => handleIngredientChange(index, value)}
                />
              </td>
              <td className="p-2 w-1/2">
                <input
                    type="text"
                    value={ingredient.amount}
                    onChange={(e) => handleAmountChange(index, e.target.value)} 
                    className=" w-full border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
                    placeholder="Enter amount"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="yellow" onClick={addIngredientRow} className='rounded-t-none'>
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 pr-2" /> Add Ingredient
      </Button>
    </div>
  )
}
