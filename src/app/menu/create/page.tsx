'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import SelectCategory from '../_components/SelectCategory'
import { InputIngredientTable } from '../_components/InputIngredientTable'
import NumberOfServing from '../_components/NumberOfServing'
import { InputRecipe } from '../_components/InputRecipe'
import UploadImage from '../_components/UploadImage'
import axios from 'axios'
import type { RequireIngredient, Step } from '@/app/types'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function CreateMenu() {
  const { user } = useUser()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [steps, setSteps] = useState<Step[]>([])
  const [description, setDescription] = useState('')
  const [servings, setServings] = useState<number>()
  const [requiredIngredients, setRequiredIngredients] = useState<
    RequireIngredient[]
  >([])
  const [imageUrl, setImageUrl] = useState<string>(
    'https://utfs.io/f/Rik3NdCrElaD7sKaSFBM2XYUtdbmOQz1iZwSvlJMNngGoR6E'
  )
  const router = useRouter()
  const submitHandler = () => {
    if (name === '' || category === '' || steps.length === 0 || !user) return
    axios
      .post('http://137.184.249.83/food/menu', {
        name: name,
        description: description,
        category: category,
        ingredients: requiredIngredients,
        servings: servings,
        created_by: user.id,
        steps: steps,
        image_url: imageUrl,
      })
      .then((response) => {
        console.log(response.data)
        router.push(`/menu/${response.data.item.id}`)
      })
  }

  return (
    <div className="flex flex-col items-left p-16 space-y-12">
      <h1 className="h1 font-bold">Create Menu</h1>

      <div className="flex flex-col space-y-6">
        <h3 className="h3 font-bold">Menu Name</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" w-full border-4 border-gray-90 rounded-full p-1 pl-4 focus:outline-none focus:border-gray-100"
          placeholder="Enter Name"
        />
      </div>

      <div className="flex flex-col space-y-6">
        <h3 className="h3 font-bold">Description</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" w-full border-4 border-gray-90 rounded-lg p-1 pl-4 focus:outline-none focus:border-gray-100 min-h-[100px]"
          placeholder="Enter Description"
        />
      </div>

      <div className="flex flex-col space-y-6">
        <h3 className="h3 font-bold">Category</h3>
        <SelectCategory setCategory={setCategory} />
      </div>

      <UploadImage setImageUrl={setImageUrl} />

      <div className="flex flex-col space-y-6">
        <h3 className="h3 font-bold">Ingredients</h3>
        <NumberOfServing variant="withButtons" setServings={setServings} />
        <InputIngredientTable setRequiredIngredients={setRequiredIngredients} />
      </div>

      <div className="flex flex-col space-y-6">
        <h3 className="h3 font-bold">Recipe</h3>
        <InputRecipe setSteps={setSteps} />
      </div>

      <div className="flex gap-4">
        <Button variant="discard" className="w-1/2">
          Discard
        </Button>
        <Button variant="yellow" className="w-1/2" onClick={submitHandler}>
          Create Menu
        </Button>
      </div>
    </div>
  )
}
