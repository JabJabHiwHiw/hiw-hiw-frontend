'use client'

import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Ingredient } from '@/app/types'
import { useState } from 'react'

interface IngredientComboBoxProps {
  value: string
  onChange: (value: string) => void
  ingredients: Ingredient[]
}

export function IngredientComboBox({
  value,
  onChange,
  ingredients,
}: IngredientComboBoxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            'border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100'
          )}
          onClick={() => setOpen(!open)} // Toggles the popover when clicked
        >
          {ingredients && value
            ? ingredients.find((ingredient) => ingredient.id === value)?.name
            : 'Select ingredient...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search ingredient..." />
          <CommandList>
            <CommandEmpty>No ingredient found.</CommandEmpty>
            <CommandGroup>
              {ingredients.map((ingredient) => (
                <CommandItem
                  key={ingredient.id}
                  value={ingredient.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? '' : currentValue) // Call the parent's onChange function
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === ingredient.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {ingredient.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
