"use client";

import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Bell } from "lucide-react";

export default function NotiPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="flex items-center cursor-pointer">
          <Bell className="h-6 w-6 text-black" />
        </span>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <h3 className="h4 font-bold">Notifications</h3>
          <p>No new notifications.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
