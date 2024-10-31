"use client";
import React, { useState } from 'react';
import TableRow from '@/components/ui/tableRow';


export default function UpdateFridgeTable() {
  // Initial data for the table
  const initialData = [
    { id: 4, ingredient: 'Parmesan cheese', amount: '1 cups', usedAmount: '1 cups', remainingAmount: '' },
    { id: 5, ingredient: 'Fresh basil', amount: '1/2 cup', usedAmount: '1/2 cup', remainingAmount: '' },
  ];
  const [tableData, setTableData] = useState(initialData);
  const handleDelete = (ingredient: string) => {
    setTableData((prevData) => prevData.filter((row) => row.ingredient !== ingredient));
  };

  const handleInputChange = (ingredient: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.ingredient === ingredient ? { ...row, remainingAmount: value } : row
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
