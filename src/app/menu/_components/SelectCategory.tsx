import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  export default function SelectCategory({ setCategory }: {setCategory:(value: string) => void}){
    return(
        <div>
            <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-[200px] border-4 border-gray-90 rounded-full focus:border-gray-100">
                <SelectValue placeholder="Select Category"/>
                </SelectTrigger>
                <SelectContent>
                <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="apple"><h5 className='h5'>Thai</h5></SelectItem>
                    <SelectItem value="banana"><h5 className='h5'>Italian</h5></SelectItem>
                    <SelectItem value="blueberry"><h5 className='h5'>Chinese</h5></SelectItem>
                    <SelectItem value="grapes"><h5 className='h5'>European</h5></SelectItem>
                    <SelectItem value="pineapple"><h5 className='h5'>Mexican</h5></SelectItem>
                </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
  }


