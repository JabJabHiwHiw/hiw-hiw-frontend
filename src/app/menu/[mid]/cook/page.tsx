'use client'
import { Button } from "@/components/ui/button"
import UpdateFridgeTable from "../../_components/UpdateFridgeTable"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import SuccessPopOver from "../../_components/SuccessPopOver";
import { useEffect , useState} from "react";
import getMenu from "@/lib/getMenu";

export default function MenuCheck({params}: {params:{mid:string}}){
    const mid = params.mid;
    const [menuResponse,setMenuResponse] = useState<Menu | null>(null)
    useEffect(() => {
      const fetchData = async() =>{
        const menu = await getMenu(mid)
        console.log(menu)
        setMenuResponse(menu)
      }
      fetchData()
    },[mid])
    // useEffect(() => {
    //     if (!session) return;
    //     session.getToken().then((token) => {
    //         axios
    //             .get("http://137.184.249.83/food/fridge/expiring", {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 console.log("response:", response);
    //                 const notificationData: Notification[] = response.data;
    //                 console.log("noti:", notificationData);
    //                 // setNotification(notificationData)
    //             });
    //     });
    // }, [session]);
    

    const router = useRouter();
    if(!menuResponse) return(
        <p>Check Menu is loading ...</p>
    )
    return(
        <div className="flex flex-col items-left p-16 space-y-12">
            <h1 className="h1 font-bold">{menuResponse.item.name}</h1>
            <h3 className='h3 font-bold'>Update Fridge Items</h3>
            
            <UpdateFridgeTable ingredients={menuResponse.item.ingredients}/>

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