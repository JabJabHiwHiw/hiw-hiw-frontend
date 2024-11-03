'use client'
import { Button } from "@/components/ui/button"
import UpdateFridgeTable from "../../_components/UpdateFridgeTable"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import SuccessPopOver from "../../_components/SuccessPopOver";
export default function MenuCheck({params}: {params:{mid:string}}){
    const mid = params.mid;
    const router = useRouter();
    return(
        <div className="flex flex-col items-left p-16 space-y-12">
            <h1 className="h1 font-bold">Spaghetti With Fresh Tomato Sauce id:{mid}</h1>
            <h3 className='h3 font-bold'>Update Fridge Items</h3>
            
            <UpdateFridgeTable/>

            <div className='flex flex-col space-y-4 pt-8'>
                <SuccessPopOver name="Update Fridge Items"/>
                <div className='flex w-full gap-4'>
                    <Button variant="secondary" className='w-1/2' onClick={() => router.back()}>Back</Button>
                    <Link href='/discover' passHref className='w-1/2'>
                        <Button variant="yellow" className='w-full'>Discover more menus</Button>
                    </Link>
                </div>
                
            </div>
        </div>
    )
}