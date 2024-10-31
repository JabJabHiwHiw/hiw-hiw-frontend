'use client'
import NumberOfServing from "@/app/menu/_components/NumberOfServing"
import InFridgeIngredientsTable from "@/app/menu/_components/InFridgeIngredientsTable"
import ToBuyTable from "@/app/menu/_components/ToBuyTable"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
export default function MenuCheck({params}: {params:{mid:string}}){
    const mid = params.mid
    const router = useRouter();
    return(
        <div className="flex flex-col items-left p-16 space-y-12 ">
            <h1 className="h1 font-bold">Spaghetti With Fresh Tomato Sauce</h1>
            <NumberOfServing/>
            <h2 className='h2 font-bold'>In Fridge Ingredients</h2>
            <InFridgeIngredientsTable/>
            <h2 className='h2 font-bold'>To-buy Ingredients</h2>
            <ToBuyTable/>

            <div className='flex gap-4'>
                <Link href={`/profile`} passHref className='w-1/2'>
                    <Button variant="outline" className='w-full'>Add to my to-buy list</Button>
                </Link>
                
                <Link href={`/menu/${mid}/cook`} passHref className='w-1/2'>
                    <Button variant="yellow" className='w-full'>Cook from my fridge</Button>
                </Link>
                

            </div>

            <Button variant="secondary" className='w-full' onClick={() => router.back()}>Back</Button>
        </div>
    )
}