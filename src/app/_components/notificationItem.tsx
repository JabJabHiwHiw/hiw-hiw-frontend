import type { Notification } from "@/app/types";
import { useSession } from "@clerk/nextjs";
import { faCircleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

export default function NotificationItem(props: Notification) {
	const { id, body, expireDate, read } = props;
	const { session } = useSession();

	// Local state for read status
	const [isRead, setIsRead] = useState(read);

	// Handle delete and mark as read
	const handleDelete = () => {
		if (!session) return;

		session.getToken().then((token) => {
			axios
				.get(`http://137.184.249.83/notifications/read?id=${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					// Update state to mark as read and remove notification from UI
					setIsRead(true);
				})
				.catch((err) => {
					// Handle error (e.g., log it)
					console.error("Error marking notification as read:", err);
				});
		});
	};

	// Conditionally render the component based on read status
	if (isRead) return null;

	return (
		<div className="w-full h-[54px] flex items-center gap-5 lg:gap-0 lg:justify-between">
			<div className="flex gap-3 items-center">
				{!isRead && (
					<FontAwesomeIcon
						icon={faCircleExclamation}
						className="text-red-500"
						size={"1x"}
					/>
				)}
				<div className="inline-block align-bottom">
					<span className="h5 leading-none h-full pr-3">{body}</span>
					<span className="small text-gray-400 h-full ">
						{new Date(expireDate).toLocaleDateString()}
					</span>
				</div>
			</div>
			<button type="button" onClick={handleDelete}>
				<FontAwesomeIcon icon={faX} />
			</button>
		</div>
	);
}