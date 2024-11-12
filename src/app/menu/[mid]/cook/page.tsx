'use client'
import { Button } from "@/components/ui/button"
import UpdateFridgeTable from "../../_components/UpdateFridgeTable"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import getMenu from "@/lib/getMenu";

export default function MenuCheck({params}:{params:{mid:string}}){
    const router = useRouter();
    const [menuName,setMenuName] = useState<string|null>(null);
    const mid = params.mid;
    useEffect(() => {
        const fetchData = async() =>{
          const menu = await getMenu(mid)
          console.log(menu)
          setMenuName(menu.item.name)
        }
        fetchData()
      },[mid])
    return(
        <div className="flex flex-col items-left p-16 space-y-12">
            <h1 className="h1 font-bold">{menuName}</h1>
            <h3 className='h3 font-bold'>Update Fridge Items</h3>
            <UpdateFridgeTable mid={mid}/>
            <div className='flex w-full gap-4'>
                <Button variant="secondary" className='w-1/2' onClick={() => router.back()}>Back</Button>
                <Link href='/discover' passHref className='w-1/2'>
                    <Button variant="yellow" className='w-full'>Discover more menus</Button>
                </Link>
            </div>
        </div>
    )
}