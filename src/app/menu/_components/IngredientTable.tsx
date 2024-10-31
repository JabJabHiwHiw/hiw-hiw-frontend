"use client"
import TableRow from '@/components/ui/tableRow';

export default function IngredientsTable() {
  // Initial data for the table
  const initialData = [
    { ingredient: 'spaghetti', amount: '2 lbs', usedAmount: '2 lbs' },
    { ingredient: 'Olive oil', amount: '500 ml', usedAmount: '500 ml' },
    { ingredient: 'White wine', amount: '1 bottle', usedAmount: '1 bottle' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-primary-200 border border-primary-300">
            <th className="py-2 px-4 text-left h4 font-bold">Ingredient</th>
            <th className="py-2 px-4 text-left h4 font-bold">Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {initialData.map((row) => (
            <TableRow
              key={row.ingredient}
              variant="default"
              data={[row.ingredient, row.usedAmount]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
