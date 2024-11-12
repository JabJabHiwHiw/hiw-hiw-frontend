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
import type { FridgeItem, Ingredient } from '@/app/types'
import { ConfirmationModal } from './confirmationModal'
import axios from 'axios'
import { useSession } from '@clerk/nextjs'

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
  ingredients,
  onFinish,
}: {
  mode?: 'add' | 'edit'
  data?: FridgeItem
  children: React.ReactNode
  ingredients: Ingredient[]
  onFinish: () => void
}) {
  const { isLoaded: isSessionLoaded, session } = useSession()
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    if (isSessionLoaded && session) {
      session
        .getToken()
        .then((fetchedToken) => {
          setToken(fetchedToken)
          console.log('Fetched token:', fetchedToken)
        })
        .catch((error) => {
          console.error('Error fetching token:', error)
        })
    }
  }, [isSessionLoaded, session])
  const [open, setOpen] = useState(false)
  const [openCombobox, setOpenCombobox] = useState(false)
  const [isExpEnabled, setIsExpEnabled] = useState(false)
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
  }, [data])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === 'add') {
      createFridgeItem(values)
    } else if (mode === 'edit') {
      updateFridgeItem(values)
    }
  }

  const createFridgeItem = async (values: z.infer<typeof formSchema>) => {
    console.log('Creating fridge item', values)
    try {
      const response = await axios.post(
        `http://137.184.249.83:80/food/fridge/item`,
        {
          ingredient_id: values.ingredientId,
          quantity: values.quantity,
          added_date: {
            seconds: Math.floor(values.addedDate.getTime() / 1000),
          },
          expired_date: {
            seconds: Math.floor(values.expiredDate.getTime() / 1000),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Create Result:', response.data)
      setOpen(false)
      onFinish()
    } catch (error) {
      console.error('Error creating fridge item:', error)
    }
  }

  const updateFridgeItem = async (values: z.infer<typeof formSchema>) => {
    console.log('Updating fridge item', values)
    try {
      if (!data) return new Error('No item to update')
      const response = await axios.put(
        `http://137.184.249.83:80/food/fridge/item`,
        {
          id: data.id,
          ingredient_id: values.ingredientId,
          quantity: values.quantity,
          added_date: {
            seconds: Math.floor(values.addedDate.getTime() / 1000),
          },
          expired_date: {
            seconds: Math.floor(values.expiredDate.getTime() / 1000),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Update Result:', response.data)
      setOpen(false)
      onFinish()
    } catch (error) {
      console.error('Error updating fridge item:', error)
    }
  }

  const handleRemoveFridgeItem = async (id: string) => {
    console.log('Removing fridge item', id)
    try {
      const response = await axios.delete(
        `http://137.184.249.83:80/food/fridge/item/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('Deleted Result:', response.data)
      setOpen(false)
      onFinish()
    } catch (error) {
      console.error('Error deleting fridge item:', error)
    }
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
    <Dialog open={open} onOpenChange={setOpen}>
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
                    <Popover
                      modal={true}
                      open={openCombobox}
                      onOpenChange={setOpenCombobox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombobox}
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
                                  value={ingredient.name}
                                  onSelect={() => {
                                    form.setValue('ingredientId', ingredient.id)
                                    setOpenCombobox(false)
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
                  <ConfirmationModal
                    title="Are you sure you want to remove this item?"
                    desc=""
                    onConfirm={() => handleRemoveFridgeItem(data?.id || '')}
                  >
                    <Button variant="gray" className="w-full" type="button">
                      Remove Item
                    </Button>
                  </ConfirmationModal>
                </>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
