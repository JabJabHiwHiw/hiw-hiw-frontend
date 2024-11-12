"use client";
import React, {useEffect, useState } from 'react';
import TableRow from '@/components/ui/tableRow';
import getMenu from "@/lib/getMenu";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import SuccessPopOver from './SuccessPopOver';
import { Button } from '@/components/ui/button';


export default function UpdateFridgeTable({mid}:{mid:string}) {
    const [token,setToken] = useState<string|null>(null);
    const [menuIngredients, setMenuIngredients] = useState<Ingredient[]|null>(null);
    const [fridgeResponse, setFridgeResponse] = useState<FridgeItem[]|null>(null)
    const [tableData, setTableData] = useState<FridgeItemToUpdate[]>([]);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
      const fetchData = async() =>{
        const menu = await getMenu(mid)
        console.log(menu)
        setMenuIngredients(menu.item.ingredients)
      }
      fetchData()
    },[mid])

    const { session } = useSession()
    useEffect(() => {
            if (!session) return;
            session.getToken().then((token) => {
                console.log(token);
                setToken(token);
                axios
                    .get("http://137.184.249.83/food/fridge", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => {
                        console.log("response:", response);
                        if (response.data && Array.isArray(response.data.items)) {
                            setFridgeResponse(response.data.items); 
                          } else {
                            console.error("Unexpected response structure:", response.data);
                            setFridgeResponse(null);
                          }
                    });
            });
        }, [session]);

    useEffect(() => {
    if (menuIngredients && fridgeResponse) {
      const updatedData = menuIngredients
        .filter((ingredient:Ingredient) =>
          fridgeResponse.some((item) => item.ingredient_id === ingredient.ingredient_id)
        )
        .map((ingredient:Ingredient) => {
          const fridgeItem = fridgeResponse.find(
            (item) => item.ingredient_id === ingredient.ingredient_id
          );
          return {
            id: fridgeItem?.id || '',
            ingredient_id: ingredient.ingredient_id,
            name: ingredient.name,
            quantity: fridgeItem ? fridgeItem.quantity : "-",
            remaining_amount: "",
            added_date: fridgeItem?.added_date || { seconds: 0 },
            expired_date: fridgeItem?.expired_date || { seconds: 0 },
            deleteMode: false,
          } as FridgeItemToUpdate;
        });
      setTableData(updatedData);
    }
  }, [menuIngredients, fridgeResponse]);

  const handleInputChange = (ingredientName: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.name === ingredientName ? { ...row, remaining_amount: value } : row
      )
    );
  };
  const handleToggleDeleteMode = (ingredientId: string) => {
      setTableData((prevData) =>
          prevData.map((row) =>
              row.ingredient_id === ingredientId ? { ...row, deleteMode: !row.deleteMode } : row
          )
      );
  };

  const handleUpdate = async () => {
    const incompleteEntries = tableData.some((row) => !row.deleteMode && row.remaining_amount.trim() === '');

    if (incompleteEntries) {
        setErrorMessage('Please fill in the remaining amount for all ingredients before updating.');
        return;
    }

    setErrorMessage('');

    // Send PUT request for each ingredient
    try {
      if (token) {
        const requests = tableData.map((row) =>
          row.deleteMode
                        ? axios.delete(`http://137.184.249.83/food/fridge/item/${row.id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                        })
          :axios.put(
            `http://137.184.249.83/food/fridge/item/`,
            {
              id:row.id,
              user_id:row.user_id,
              ingredient_id: row.ingredient_id,
              quantity: row.remaining_amount,
              added_date: row.added_date,
              expired_date: row.expired_date,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
        await Promise.all(requests);
      }
    } catch (error) {
      console.error('Error updating fridge items:', error);
      setErrorMessage('Failed to update some items. Please try again.');
    }
  };
  

  return (
    <div className="overflow-x-auto space-y-6 w-full">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      
      {tableData.length > 0 ? (
        <>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-primary-200 border border-primary-300">
            <th className="py-2 px-4 text-left h4 font-bold">Ingredient</th>
            <th className="py-2 px-4 text-left h4 font-bold">In Fridge Amount</th>
            <th className="py-2 px-4 text-left h4 font-bold">Remaining Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <TableRow
              key={row.ingredient_id}
              variant="default"
              data={[
                row.name,
                row.quantity,
                <input
                    key={row.ingredient_id}
                    type="text"
                    value={row.remaining_amount}
                    onChange={(e) => handleInputChange(row.name, e.target.value)} 
                    className=" w-full border border-primary-300 rounded-full p-1 pl-4 focus:outline-none focus:border-primary-300 focus:bg-primary-100"
                    placeholder="Enter amount"
                    disabled={row.deleteMode}
                />,
                <Button
                    variant={row.deleteMode ? "outline" : "discard"}
                    key={row.ingredient_id}
                    onClick={() => handleToggleDeleteMode(row.ingredient_id)}
                    className='w-full'
                >
                    {row.deleteMode ? "Edit" : "Delete"}
                </Button>
              ]}
            />
          ))}
        </tbody>
      </table>
      <SuccessPopOver name="Update Fridge Items" onClick={handleUpdate}/>
      </>
    ):(
      <div className='h4 font-bold text-enterm text-center'>🎉 You have nothing to update 🎉</div>
    )} 

    </div>
  );
}
