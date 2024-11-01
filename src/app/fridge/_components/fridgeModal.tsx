import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { FridgeItem } from '@/app/types'

const ingredients = [
  { id: 'id_1a2b3c', name: 'Apple', category: 'Fruits' },
  { id: 'id_4d5e6f', name: 'Baking Powder', category: 'Baking Supplies' },
  { id: 'id_7g8h9i', name: 'Banana', category: 'Fruits' },
  { id: 'id_j1k2l3', name: 'Basil', category: 'Herbs and Spices' },
  { id: 'id_m4n5o6', name: 'Beef Steak', category: 'Meat and Poultry' },
  { id: 'id_p7q8r9', name: 'Broccoli', category: 'Vegetables' },
  { id: 'id_s1t2u3', name: 'Brown Rice', category: 'Grain' },
  { id: 'id_v4w5x6', name: 'Carrot', category: 'Vegetables' },
  { id: 'id_y7z8a9', name: 'Cheddar Cheese', category: 'Dairy' },
  { id: 'id_b1c2d3', name: 'Chicken Breast', category: 'Meat and Poultry' },
  { id: 'id_e4f5g6', name: 'Cinnamon', category: 'Herbs and Spices' },
  { id: 'id_h7i8j9', name: 'Crab', category: 'Seafood' },
  { id: 'id_k1l2m3', name: 'Flour', category: 'Baking Supplies' },
  { id: 'id_n4o5p6', name: 'Fresh Milk', category: 'Dairy' },
  { id: 'id_q7r8s9', name: 'Grapes', category: 'Fruits' },
  { id: 'id_t1u2v3', name: 'Hot Sauce', category: 'Sauce and Condiment' },
  { id: 'id_w4x5y6', name: 'Ketchup', category: 'Sauce and Condiment' },
  { id: 'id_z7a8b9', name: 'Lemonade', category: 'Beverages' },
  { id: 'id_c1d2e3', name: 'Orange Juice', category: 'Beverages' },
  { id: 'id_f4g5h6', name: 'Oregano', category: 'Herbs and Spices' },
  { id: 'id_i7j8k9', name: 'Pork Chop', category: 'Meat and Poultry' },
  { id: 'id_l1m2n3', name: 'Potato', category: 'Vegetables' },
  { id: 'id_o4p5q6', name: 'Quinoa', category: 'Grain' },
  { id: 'id_r7s8t9', name: 'Salmon Fillet', category: 'Seafood' },
  { id: 'id_u1v2w3', name: 'Shrimp', category: 'Seafood' },
  { id: 'id_x4y5z6', name: 'Soy Sauce', category: 'Sauce and Condiment' },
  { id: 'id_a7b8c9', name: 'Sparkling Water', category: 'Beverages' },
  { id: 'id_d1e2f3', name: 'Sugar', category: 'Baking Supplies' },
  { id: 'id_g4h5i6', name: 'Whole Grain Bread', category: 'Grain' },
  { id: 'id_j7k8l9', name: 'Yogurt', category: 'Dairy' },
]
const formSchema = z.object({
  ingredientId: z.string().min(1, { message: 'Name is required.' }),
  quantity: z.string().min(1, { message: 'Quantity is required.' }),
  addedDate: z
    .date()
    .refine((val) => val !== null, { message: 'Added Date is required.' }),
  expiredDate: z
    .date()
    .refine((val) => val !== null, { message: 'EXP/BB Date is required.' }),
})

export default function FridgeModal({
  mode = 'add',
  data,
  children,
}: {
  mode?: 'add' | 'edit'
  data?: FridgeItem
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [isExpEnabled, setIsExpEnabled] = useState(true)
  const [days, setDays] = useState(7)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredientId:
        ingredients.find((item) => item.name === data?.name)?.id || '',
      quantity: data?.quantity || '',
      addedDate: data?.addedDate || new Date(),
      expiredDate:
        data?.expiredDate || new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    },
  })

  useEffect(() => {
    form.reset({
      ingredientId:
        ingredients.find((item) => item.name === data?.name)?.id || '',
      quantity: data?.quantity || '',
      addedDate: data?.addedDate || new Date(),
      expiredDate:
        data?.expiredDate || new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    })
  }, [data, days, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleExpSwitchChange = (checked: boolean) => {
    setIsExpEnabled(checked)

    if (checked) {
      const newExpDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      form.setValue('expiredDate', newExpDate)
    }
  }

  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDays = Number(event.target.value)
    setDays(newDays)

    if (isExpEnabled) {
      const newExpDate = new Date(Date.now() + newDays * 24 * 60 * 60 * 1000)
      form.setValue('expiredDate', newExpDate)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-gray-400">
            {mode === 'add' ? 'Add Item To Fridge' : 'Update Fridge Item'}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mx-6 text-gray-400"
          >
            <FormField
              control={form.control}
              name="ingredientId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Popover modal={true} open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between border-input"
                        >
                          {ingredients.find(
                            (ingredient) => ingredient.id === field.value
                          )?.name || 'Select ingredient...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search ingredient..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No ingredient found.</CommandEmpty>
                            <CommandGroup>
                              {ingredients.map((ingredient) => (
                                <CommandItem
                                  key={ingredient.id}
                                  value={ingredient.id}
                                  onSelect={() => {
                                    form.setValue('ingredientId', ingredient.id)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === ingredient.id
                                        ? 'opacity-100'
                                        : 'opacity-0'
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
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Input
                type="text"
                placeholder="Category"
                className="w-full"
                value={
                  ingredients.find(
                    (ingredient) =>
                      ingredient.id === form.getValues('ingredientId')
                  )?.category || ''
                }
                readOnly
              />
            </FormItem>
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Quantity (with Unit)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. 1 liter"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Added Date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal border-input',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="exp"
                checked={isExpEnabled}
                onCheckedChange={handleExpSwitchChange}
                className="data-[state=checked]:bg-primary-400"
              />
              <Label htmlFor="exp" className="flex items-center space-x-2">
                <span>Set EXP/BB Date To</span>
                <Input
                  type="number"
                  min={1}
                  value={days}
                  onChange={handleDaysChange}
                  disabled={!isExpEnabled}
                  className="w-16"
                />
                <span>Day(s) From Today.</span>
              </Label>
            </div>
            {!isExpEnabled && (
              <FormField
                control={form.control}
                name="expiredDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>EXP/BB Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal border-input',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date <= new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="flex flex-col space-y-3 pt-6">
              {mode === 'add' ? (
                <Button variant="yellow" className="w-full" type="submit">
                  Submit
                </Button>
              ) : (
                <>
                  <Button variant="yellow" className="w-full" type="submit">
                    Save Change
                  </Button>
                  <Button variant="gray" className="w-full" type="submit">
                    Remove Item
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
