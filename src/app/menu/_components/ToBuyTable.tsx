"use client";
import React, { useState } from 'react';
import TableRow from '@/components/ui/tableRow';


export default function ToBuyTable() {
  // Initial data for the table
  const initialData = [
    { id: 4, ingredient: 'Parmesan cheese', amount: '1 cups', usedAmount: '1 cups', toBuyAmount: '' },
    { id: 5, ingredient: 'Fresh basil', amount: '1/2 cup', usedAmount: '1/2 cup', toBuyAmount: '' },
  ];

  // State to manage table data
  const [tableData, setTableData] = useState(initialData);

  // Function to handle deleting a row
  const handleDelete = (ingredient: string) => {
    // Filter out the row with the given ingredient
    setTableData((prevData) => prevData.filter((row) => row.ingredient !== ingredient));
  };

  // Function to handle input changes in the "To Buy Amount" field
  const handleInputChange = (ingredient: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.ingredient === ingredient ? { ...row, toBuyAmount: value } : row
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
            <th className="py-2 px-4 text-left h4 font-bold">Used Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold">To Buy Amount</th> {/* New column */}
            <th className="py-2 px-4 text-left h4 font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <TableRow
              key={row.ingredient}
              variant="delete"
              data={[
                row.ingredient,
                row.amount,
                row.usedAmount,
                <input
                    key={row.ingredient}
                    type="text"
                    value={row.toBuyAmount}
                    onChange={(e) => handleInputChange(row.ingredient, e.target.value)}
                    className=" w-full border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
                    placeholder="Enter amount"
                />
              ]}
              onDelete={() => handleDelete(row.ingredient)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
