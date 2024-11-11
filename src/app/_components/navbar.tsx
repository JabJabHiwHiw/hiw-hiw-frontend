"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotificationItem from "./notificationItem";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Notification } from "../types";
import { useSession, useUser } from "@clerk/nextjs";

export default function Navbar() {
	const pathName = usePathname();
	const isFridge = pathName.startsWith("/fridge");
	const isDiscover = pathName.startsWith("/discover");
	const isProfile = pathName.startsWith("/profile");
	const [notification] = useState<Notification[]>([]);
	//query user data
	const { isLoaded: isUserLoaded, user } = useUser();
	const { session } = useSession();

	useEffect(() => {
		if (!session) return;
		session.getToken().then((token) => {
			axios
				.get("http://137.184.249.83/food/fridge/expiring", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log("response:", response);
					const notificationData: Notification[] = response.data;
					console.log("noti:", notificationData);
					// setNotification(notificationData)
				});
		});
	}, [session]);
	// console.log('noti:', notification)

	return (
		<div className="h4 h-20 w-full bg-primary-300 justify-between items-center flex px-8 py-3">
			<div className="h2 font-bold">HIWHIW</div>
			<div className="w-fit flex gap-6 divide">
				<Link
					href={"/discover"}
					className={cn("hover:text-neutral-600", isDiscover && "font-bold")}
				>
					Discover
				</Link>
				<div className="w-[1px] h-6 bg-black" />
				<Link
					href={"/fridge"}
					className={cn("hover:text-neutral-600", isFridge && "font-bold")}
				>
					Fridge
				</Link>
			</div>
			<div className="w-fit flex gap-6 items-center">
				<Popover>
					<PopoverTrigger type="button" className="text-gray-400">
						<FontAwesomeIcon
							icon={faBell}
							size={"1x"}
							className="hover:text-neutral-600"
						/>
					</PopoverTrigger>
					<PopoverContent
						align={"start"}
						alignOffset={28}
						side={"left"}
						sideOffset={-32}
						className={cn("w-fit lg:w-[440px]")}
					>
						{notification.length !== 0 ? (
							notification.map((item) => (
								<NotificationItem key={item.id} {...item} />
							))
						) : (
							<div className="flex items-center justify-center w-[200px] lg:w-full h-[100px] text-gray-200">
								No Notification
							</div>
						)}
					</PopoverContent>
				</Popover>
				{isProfile ? (
					<Link href={"/menu/create"}>
						<Button variant={"outline"}>Create Menu</Button>
					</Link>
				) : (
					<Link className="flex gap-2 items-center" href={"/profile"}>
						<div className="relative w-12 h-12 rounded-full">
							{isUserLoaded && user && (
								<Image
									src={user.imageUrl}
									fill={true}
									alt="logo"
									className="self-center rounded-full"
								/>
							)}
						</div>
						{isUserLoaded && user && (
							<div className="hover:text-neutral-600">{user.fullName}</div>
						)}
					</Link>
				)}
			</div>
		</div>
	);
}
