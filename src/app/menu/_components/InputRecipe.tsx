import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface RecipeStep {
    stepNo: number;
    stepInfo: string;
}

export function InputRecipe() {
    const [currentStep, setCurrentStep] = useState(1);
    const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([
        { stepNo: 1, stepInfo: '' }
    ]);

    const addRecipeRow = () => {
        setCurrentStep(prevStep => prevStep + 1);
        setRecipeSteps(prevSteps => [
            ...prevSteps,
            { stepNo: currentStep + 1, stepInfo: '' }
        ]);
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...recipeSteps];
        updatedSteps[index].stepInfo = value;
        setRecipeSteps(updatedSteps);
    };

    return (
        <div className='space-y-6'>
            {recipeSteps.map((step, index) => (
                <div key={step.stepNo} className='space-y-4'>
                    <h4 className='h4 font-bold'>Step {step.stepNo}</h4>
                    <textarea
                        value={step.stepInfo}
                        rows={3}
                        className='h5 bg-neutral-50 h-[100px] w-full resize-none p-4 
                        rounded-lg focus:outline-none focus:border-4 focus:border-neutral-100'
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        placeholder="Type your step here..."
                    />
                </div>
            ))}
            <Button onClick={addRecipeRow} variant='gray' className='w-full rounded-t-none'>
                <FontAwesomeIcon icon={faPlus} className="w-3 h-3 pr-2" /> Add Step
            </Button>
        </div>
    );
}
