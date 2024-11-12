"use client"
import TableRow from '@/components/ui/tableRow';

export default function IngredientsTable({ingredients}:{ingredients:Ingredient[]}) {
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
          {ingredients.map((ingredient) => (
            <TableRow
              key={ingredient.ingredient_id}
              variant="default"
              data={[
                ingredient.name,  
                ingredient.required_quantity, 
              ]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
