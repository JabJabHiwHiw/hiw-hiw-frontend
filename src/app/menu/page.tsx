import { Button } from "@/components/ui/button"
import NumberOfServing from "@/app/menu/_components/NumberOfServing"
import InFridgeIngredientsTable from "@/app/menu/_components/InFridgeIngredientsTable"
import ToBuyTable from "@/app/menu/_components/ToBuyTable"
export default function Menu(){

    return(
        <div className="flex flex-col items-left p-16 space-y-12 ">
            <h1 className="h1 font-bold">Menu mock name</h1>
            <NumberOfServing/>
            <h2 className='h2 font-bold'>In Fridge Ingredients</h2>
            <InFridgeIngredientsTable/>
            <h2 className='h2 font-bold'>To-buy Ingredients</h2>
            <ToBuyTable/>

            <div className='flex gap-4'>
                <Button variant="outline" className='w-1/2'>Add to my to-buy list</Button>
                <Button variant="yellow" className='w-1/2'>Cook from my fridge</Button>
            </div>

            <Button variant="secondary">Back</Button>

        </div>
    )
}