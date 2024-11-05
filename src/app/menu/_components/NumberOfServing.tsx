import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button'; 

interface NumberOfServingProps {
  variant?: 'default' | 'withButtons';
  initialServings?: number;
}

const NumberOfServing: React.FC<NumberOfServingProps> = ({ variant = 'default' , initialServings = 4}) => {
  const [servings, setServings] = React.useState(initialServings);

  const increment = () => setServings((prev) => prev + 1);
  const decrement = () => setServings((prev) => (prev > 1 ? prev - 1 : 1));

  if (variant === 'default') {
    return (
      <div className='w-full flex items-center justify-left space-x-6 bg-gray'>
        <h3 className="h3">Number of Serving:</h3>
        <h3 className='h3'>{servings}</h3>
      </div>
    );
  }

  // Variant with buttons
  return (
    <div className='w-full flex items-center justify-left space-x-6 bg-gray'>
      <h3 className="h3">Number of Serving:</h3>
      <Button variant="yellow" size="icon" onClick={decrement}>
        <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
      </Button>
      <h3 className='h3'>{servings}</h3>
      <Button variant="yellow" size="icon" onClick={increment}>
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default NumberOfServing;
