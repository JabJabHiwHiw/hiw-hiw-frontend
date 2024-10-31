"use client";
import React, { useState } from 'react';
import TableRow from '@/components/ui/tableRow';

export default function InFridgeIngredientsTable() {
  // Initial data for the table
  const initialData = [
    { ingredient: 'spaghetti', amount: '2 lbs', usedAmount: '2 lbs' },
    { ingredient: 'Olive oil', amount: '500 ml', usedAmount: '500 ml' },
    { ingredient: 'White wine', amount: '1 bottle', usedAmount: '1 bottle' },
  ];

  // State to manage table data
  const [tableData, setTableData] = useState(initialData);

  // Function to handle deleting a row
  const handleDelete = (ingredient: string) => {
    // Filter out the row with the given ingredient
    setTableData((prevData) => prevData.filter((row) => row.ingredient !== ingredient));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-primary-200 border border-primary-300">
            <th className="py-2 px-4 text-left h4 font-bold">Ingredient</th>
            <th className="py-2 px-4 text-left h4 font-bold">In Fridge Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold">Used Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <TableRow
              key={row.ingredient}
              variant="add-delete"
              data={[row.ingredient, row.amount, row.usedAmount]}
              onDelete={() => handleDelete(row.ingredient)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
