import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { FridgeItem, SortItem } from '@/app/types'
import SortButton from './sortButton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import FridgeModal from './fridgeModal'

export default function FridgeTable({
  fridgeItems,
  sortCriteria,
  handleSortToggle,
}: {
  fridgeItems: FridgeItem[]
  sortCriteria: SortItem[]
  handleSortToggle: (key: string) => void
}) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const [currentItems, setCurrentItems] = useState<FridgeItem[]>(
    fridgeItems.slice(0, itemsPerPage)
  )
  const [totalPages, setTotalPages] = useState(
    Math.ceil(fridgeItems.length / itemsPerPage)
  )

  useEffect(() => {
    const updatedTotalPages = Math.ceil(fridgeItems.length / itemsPerPage)
    let updatedCurrentPage = currentPage
    if (currentPage >= updatedTotalPages) {
      updatedCurrentPage = Math.max(updatedTotalPages, 1)
    }

    setTotalPages(updatedTotalPages)
    setCurrentPage(updatedCurrentPage)
    setCurrentItems(
      fridgeItems.slice(
        (updatedCurrentPage - 1) * itemsPerPage,
        updatedCurrentPage * itemsPerPage
      )
    )
  }, [currentPage, fridgeItems])

  const getSortOrder = (key: string) => {
    const item = sortCriteria.find((item) => item.key === key)
    return item?.value ? item.value : ''
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="w-full text-gray-400">
      <Table>
        <TableHeader className="bg-primary-300">
          <TableRow disableHover>
            <TableHead className="w-[full] pl-6">
              <SortButton
                value={getSortOrder('name')}
                handleToggle={() => handleSortToggle('name')}
              >
                Name
              </SortButton>
            </TableHead>
            <TableHead className="w-[10%] lg:w-[15%]"></TableHead>
            <TableHead className="w-[15%] lg:w-[17%]">
              <SortButton
                value={getSortOrder('quantity')}
                handleToggle={() => handleSortToggle('quantity')}
              >
                Quantity
              </SortButton>
            </TableHead>
            <TableHead className="w-[15%] lg:w-[17%]">
              <SortButton
                value={getSortOrder('dateAdded')}
                handleToggle={() => handleSortToggle('dateAdded')}
              >
                Date Added
              </SortButton>
            </TableHead>
            <TableHead className="w-[15%] lg:w-[17%]">
              <SortButton
                value={getSortOrder('exp')}
                handleToggle={() => handleSortToggle('exp')}
              >
                EXP/BB
              </SortButton>
            </TableHead>
            <TableHead className="w-[20%]">
              <SortButton
                value={getSortOrder('category')}
                handleToggle={() => handleSortToggle('category')}
              >
                Category
              </SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item, ind) => (
            <FridgeModal key={ind} mode="edit" data={item}>
              <TableRow
                className={cn(item.expCat === 'Expired' && 'bg-primary-100')}
              >
                <TableCell className="pl-6">{item.name}</TableCell>
                <TableCell
                  className={cn(
                    'small',
                    item.expCat === 'Expired' && 'text-error-hover',
                    item.expCat &&
                      [
                        'Expires today',
                        'Expires in 3 days',
                        'Expires in 7 days',
                      ].includes(item.expCat) &&
                      'text-error-default'
                  )}
                >
                  {item.expCat}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.addedDate.toLocaleDateString()}</TableCell>
                <TableCell>{item.expiredDate.toLocaleDateString()}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            </FridgeModal>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="text-gray-400"
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                className={cn(
                  buttonVariants({
                    variant: index + 1 === currentPage ? 'yellow' : 'outline',
                  })
                )}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="text-gray-400"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
