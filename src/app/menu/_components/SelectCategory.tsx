import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectCategory({
  setCategory,
}: {
  setCategory: (value: string) => void
}) {
  return (
    <div>
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-[200px] border-4 border-gray-90 rounded-full focus:border-gray-100">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem value="thai">
              <h5 className="h5">Thai</h5>
            </SelectItem>
            <SelectItem value="italian">
              <h5 className="h5">Italian</h5>
            </SelectItem>
            <SelectItem value="chinese">
              <h5 className="h5">Chinese</h5>
            </SelectItem>
            <SelectItem value="european">
              <h5 className="h5">European</h5>
            </SelectItem>
            <SelectItem value="maxican">
              <h5 className="h5">Mexican</h5>
            </SelectItem>
            <SelectItem value="korean">
              <h5 className="h5">Korean</h5>
            </SelectItem>
            <SelectItem value="japanese">
              <h5 className="h5">Japanese</h5>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
