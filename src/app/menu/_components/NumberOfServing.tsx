'use client'

import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function NumberOfServing(){
    const [servings, setServings] = useState(5);

    const increment = () => setServings(prevServings => prevServings + 1);
    const decrement = () => setServings(prevServings => (prevServings > 1 ? prevServings - 1 : 1));

    return (
        <div className='w-full flex items-center justify-left space-x-6 bg-gray'>
            <h3 className="h3">Number of Serving:</h3>
            {/* <Button variant="yellow" size="icon" onClick={decrement}>
                <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
            </Button> */}
            <h3 className='h3'>{servings}</h3>
            {/* <Button variant="yellow" size="icon" onClick={increment}>
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
            </Button> */}
        </div>
    );
}