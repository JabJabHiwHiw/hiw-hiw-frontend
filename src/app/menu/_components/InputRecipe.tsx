import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import type { Step } from '@/app/types'
import React from 'react'

export function InputRecipe(props: { setSteps: (steps: Step[]) => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [recipeSteps, setRecipeSteps] = useState<Step[]>([
    { step_no: 1, step: '' },
  ])

  const addRecipeRow = () => {
    setCurrentStep((prevStep) => prevStep + 1)
    setRecipeSteps((prevSteps) => [
      ...prevSteps,
      { step_no: currentStep + 1, step: '' },
    ])
  }

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...recipeSteps]
    updatedSteps[index].step = value
    setRecipeSteps(updatedSteps)
  }

  React.useEffect(() => {
    if (recipeSteps.length === 0) return
    props.setSteps(recipeSteps)
  }, [recipeSteps, props])

  return (
    <div className="space-y-6">
      {recipeSteps.map((step, index) => (
        <div key={step.step_no} className="space-y-4">
          <h4 className="h4 font-bold">Step {step.step_no}</h4>
          <textarea
            value={step.step}
            rows={3}
            className="h5 bg-neutral-50 h-[100px] w-full resize-none p-4 
                        rounded-lg focus:outline-none focus:border-4 focus:border-neutral-100"
            onChange={(e) => handleStepChange(index, e.target.value)}
            placeholder="Type your step here..."
          />
        </div>
      ))}
      <Button
        onClick={addRecipeRow}
        variant="gray"
        className="w-full rounded-t-none"
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 pr-2" /> Add Step
      </Button>
    </div>
  )
}
