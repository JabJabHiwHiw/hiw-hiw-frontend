"use client";
import React, { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


export default function SuccessPopOver({ name, onClick }: SuccessPopOverProps) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 2500); // Close after 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <span className="flex items-center cursor-pointer">
          <Button variant='outline' className='w-full' onClick={() => { onClick(); setOpen(true); }}>{name}</Button>
        </span>
      </PopoverTrigger>
      {open && (
            <PopoverContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            flex flex-col items-center justify-center p-6 text-center bg-white rounded-lg shadow-md border w-[400px] h-[250px]"
            side={undefined} align={undefined}>
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full m-4">
                  <FontAwesomeIcon icon={faCheck} className="text-white w-1/2 h-1/2" />
              </div>
              <div className="font-bold text-lg">Successfully Updated Fridge Items</div>
              <div className='h5 text-gray-300'>Your fridge is updated!</div>
            </PopoverContent>
      )}
    </Popover>
  );
}
