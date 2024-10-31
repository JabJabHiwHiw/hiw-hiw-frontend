import IngredientsTable from "../_components/IngredientTable"
import NumberOfServing from "../_components/NumberOfServing"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { MenuItem } from "../../../../interface"
export default async function MenuDetailPage({params}: {params:{mid:string}}){
    const mid = params.mid
    const mockMenuItem: MenuItem =  {
        "ingredients": [
            {
                "id": "",
                "name": "Spaghetti",
                "required_quantity": "250 g",
                "ingredient_id": "3"
            },
            {
                "id": "",
                "name": "Egg",
                "required_quantity": "2",
                "ingredient_id": "4"
            }
        ],
        "steps": [
            {
                "step_no": 1,
                "step": "Boil spaghetti until al dente."
            },
            {
                "step_no": 2,
                "step": "Cook pancetta until crispy."
            },
            {
                "step_no": 3,
                "step": "Mix the egg with cheese and add to the pasta. Stir to combine."
            }
        ],
        "id": "6717940510bcec401af9a15c",
        "name": "Spaghetti Carbonara",
        "description": "Classic Italian pasta with eggs and pancetta",
        "category": "Italian",
        "servings": 2,
        "created_by": "JayJacka",
        "image_url": "https://www.gstatic.com/webp/gallery/1.jpg"
    };

    const more_info = {
        isFavorite: false,
        isOwner: false,
    }

    return(
        <div className="flex flex-col items-left p-16 space-y-12 ">
            <div className='flex justify-between items-center'>
                <h1 className="h1 font-bold">{mockMenuItem.name} id:{mid}</h1>

                <button type="button" className="w-fit">
                    <FontAwesomeIcon
                        icon={more_info.isFavorite ? faHeart : faHeartRegular}
                        size={'2x'}
                        className={cn(
                        'hover:text-yellow-400',
                        more_info.isFavorite ? 'text-yellow-300' : 'text-yellow-500'
                        )}
                    />
                </button>
            </div>
            <div className="relative w-full h-[400px]"> {/* Set a specific height */}
                <Image
                    alt="MenuPic"
                    src={mockMenuItem.image_url}
                    layout="fill"  // Make the image fill the parent container
                    objectFit="cover"  // Maintain aspect ratio and cover the container
                    className="rounded-xl"  // Rounded edges
                />
            </div>

            <h5 className='h4 text-gray-400'>{mockMenuItem.description}</h5>
            
            <div className='flex flex-col space-y-6'>
                <h2 className="h3 font-bold">Ingredients</h2>
                <NumberOfServing/>
                <IngredientsTable/>
            </div>

            <div className='flex flex-col space-y-6'>
                <h2 className="h3 font-bold">Recipe</h2>
                {
                    mockMenuItem.steps.map((step)=>(
                        <div key={step.step_no}>
                            <h4 className='h4 font-bold'>Step {step.step_no}</h4>
                            <h4 className='h4'>{step.step}</h4>
                        </div>
                    ))
                }
            </div>

            <div className='flex gap-4'>
                <Link href={`/menu/${mid}/check`} passHref className='w-1/2'>
                    <Button variant="outline" className='w-full'>Check my ingredients</Button>
                </Link>
                
                <Link href={`/menu/${mid}/cook`} passHref className='w-1/2'>
                    <Button variant="yellow" className='w-full'>Cook from my fridge</Button>
                </Link>
                

            </div>

            <Link href={`/discover`} passHref className='w-full'>
                <Button variant="secondary" className='w-full'>Back</Button>
            </Link>

        </div>

    )
}