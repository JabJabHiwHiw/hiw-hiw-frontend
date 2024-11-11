"use client";
import React, { useState } from 'react';
import TableRow from '@/components/ui/tableRow';


export default function UpdateFridgeTable({ingredients}:{ingredients:Ingredient[]}) {
  // Initial data for the table
  const initialData = ingredients.map((item) => ({
    id: item.ingredient_id,
    ingredient: item.name,
    amount: item.required_quantity,
    usedAmount: item.required_quantity,
    remainingAmount: '',
  }));

  const [tableData, setTableData] = useState(initialData);

  const handleInputChange = (ingredientName: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.ingredient === ingredientName ? { ...row, remainingAmount: value } : row
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-primary-200 border border-primary-300">
            <th className="py-2 px-4 text-left h4 font-bold">Ingredient</th>
            <th className="py-2 px-4 text-left h4 font-bold">In Fridge Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold">Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <TableRow
              key={row.ingredient}
              variant="default"
              data={[
                row.ingredient,
                row.amount,
                <input
                    key={row.ingredient}
                    type="text"
                    value={row.remainingAmount}
                    onChange={(e) => handleInputChange(row.ingredient, e.target.value)} 
                    className=" w-full border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
                    placeholder="Enter amount"
                />
              ]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
