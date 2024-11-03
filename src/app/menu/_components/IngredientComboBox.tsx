"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface IngredientComboBoxProps {
  value: string
  onChange: (value: string) => void
}

const ingredients = [
  {
    value: "flour",
    label: "Flour",
  },
  {
    value: "sugar",
    label: "Sugar",
  },
  {
    value: "salt",
    label: "Salt",
  },
  {
    value: "butter",
    label: "Butter",
  },
  {
    value: "eggs",
    label: "Eggs",
  },
  {
    value: "milk",
    label: "Milk",
  },
  {
    value: "baking_powder",
    label: "Baking Powder",
  },
  {
    value: "vanilla_extract",
    label: "Vanilla Extract",
  },
]

export function IngredientComboBox({ value, onChange }: IngredientComboBoxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            "border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
          )}
          onClick={() => setOpen(!open)} // Toggles the popover when clicked
        >
          {value
            ? ingredients.find((ingredient) => ingredient.value === value)?.label
            : "Select ingredient..."}
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
                  key={ingredient.value}
                  value={ingredient.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue) // Call the parent's onChange function
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === ingredient.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ingredient.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}