'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectCategory from '../_components/SelectCategory';
import { InputIngredientTable } from '../_components/InputIngredientTable';
import NumberOfServing from '../_components/NumberOfServing';
import { InputRecipe } from '../_components/InputRecipe';
import UploadImage from '../_components/UploadImage'

export default function CreateMenu(){
    //const image_url = "https://www.gstatic.com/webp/gallery/1.jpg";

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');


    return(
        <div className="flex flex-col items-left p-16 space-y-12">
            <h1 className='h1 font-bold'>Create Menu</h1>

            <div className='flex flex-col space-y-6'>
                <h3 className='h3 font-bold'>Menu Name</h3>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" w-full border-4 border-gray-90 rounded-full p-1 pl-4 focus:outline-none focus:border-gray-100"
                    placeholder="Enter Name"
                />
            </div>

            <div className='flex flex-col space-y-6'>
                <h3 className='h3 font-bold'>Category</h3>
                <SelectCategory setCategory={setCategory}/>
            </div>

            <UploadImage/>

            <div className='flex flex-col space-y-6'>
                <h3 className='h3 font-bold'>Ingredients</h3>
                <NumberOfServing variant='withButtons'/>
                <InputIngredientTable/>
            </div>

            <div className='flex flex-col space-y-6'>
                <h3 className='h3 font-bold'>Recipe</h3>
                <InputRecipe/>
            </div>

            <div className='flex gap-4'>
                <Button variant='discard' className='w-1/2'>Discard</Button>
                <Button variant='yellow' className='w-1/2'>Create Menu</Button>
            </div>
            <p text-white>{category}</p>
        </div>
    )
}