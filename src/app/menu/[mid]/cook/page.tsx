'use client'
import { Button } from "@/components/ui/button"
import UpdateFridgeTable from "../../_components/UpdateFridgeTable"
import Link from "next/link"
import { useRouter } from 'next/navigation';

export default function MenuCheck({params}: {params:{mid:string}}){
    const mid = params.mid;
    const router = useRouter();
    return(
        <div className="flex flex-col items-left p-16 space-y-12 ">
            <h1 className="h1 font-bold">Spaghetti With Fresh Tomato Sauce</h1>
            <h3 className='h3 font-bold'>Update Fridge Items</h3>
            
            <UpdateFridgeTable/>

            <Link href={`/discover`} passHref className='w-full'>
                <Button variant="outline" className='w-full'>Update Fridge Items</Button>
            </Link>

            <Button variant="secondary" className='w-full' onClick={() => router.back()}>Back</Button>
        </div>
    )
}