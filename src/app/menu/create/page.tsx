'use client'
import Image from 'next/image'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import SelectCategory from '../_components/SelectCategory';
import { InputIngredientTable } from '../_components/InputIngredientTable';
import NumberOfServing from '../_components/NumberOfServing';
import { InputRecipe } from '../_components/InputRecipe';

export default function CreateMenu(){
    //const image_url = "https://www.gstatic.com/webp/gallery/1.jpg";

    const [imageUrl, setImageUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const isValidUrl = (url: string) => {
        const pattern = new RegExp('^(https?://)', 'i'); // Regex to check for valid URL
        return pattern.test(url);
    };

    const checkImageUrl = () => {
        if (isValidUrl(inputUrl)) {
            setImageUrl(inputUrl);
            setShowImage(true);
            setImageError(false);
            setImageLoading(false);
        } else {
            setImageError(true);
            setShowImage(false); // Do not show the image if URL is invalid
        }
    };
    const handleImageError = () => {
        setImageLoading(false);
        setShowImage(false); 
    };
    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false); // Reset error if the image loads successfully
    };

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

            <div className='flex flex-col space-y-6'>
                <h3 className='h3 font-bold'>Image URL</h3>
                <div className='flex gap-4'>
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        className=" w-full border-4 border-gray-90 rounded-full p-1 pl-4 focus:outline-none focus:border-gray-100"
                        placeholder="Enter Image URL"
                    />
                    <Button variant='yellow' onClick={checkImageUrl}>Show Preview</Button>
                </div>

                {imageError && (
                    <p className="text-error-default ml-2">
                        Error: Invalid image URL or image cannot be loaded.
                    </p>
                )}

                {showImage ? (
                    <div className="relative w-full h-[400px]">
                        {imageLoading ? ( // Show loading state
                            <div className='flex justify-center items-center h-full'>
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <Image
                                alt="MenuPicture"
                                src={imageUrl}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                                onError={handleImageError}
                                onLoadingComplete={handleImageLoad}
                            />
                        )}
                    </div>
                ) : (
                    <div className='flex justify-center items-center space-x-8 border-4 border-gray-100 rounded-xl w-full h-[400px]'>
                        <FontAwesomeIcon icon={faImage} className='text-gray-100 h-[80px]' />
                        <FontAwesomeIcon icon={faPlus} className='text-gray-100 h-[80px]' />
                    </div>
                )}
            </div>

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

        </div>
    )
}