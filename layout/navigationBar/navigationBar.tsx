import React from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Tasks from "../../pages/tasks";

type navigationBarProps = {};

export default function NavigationBar({}: navigationBarProps) {
	return (
		<div
			id="rer"
			className="flex flex-col justify-end bottom-0 h-auto p-2 bg-[#7A9BA9]"
		>
			<div id="ttt" className="flex flex-row justify-around items-center">
				<div className="relative">
					{/* replace Tasks with list of tasks data object */}
					{Tasks.length > 0 && (
						<div className="bg-red-500 rounded-full h-4 w-4 absolute top-0 right-0"></div>
					)}
					<Link href="/tasks">
						<ClipboardDocumentListIcon className="h-10 w-10 text-white" />
					</Link>
				</div>

				<Link href="/addTask">
					<PlusCircleIcon className="h-16 w-16 text-white" />
				</Link>

				<Link href="/rewards">
					<ShoppingCartIcon className="h-10 w-10 text-white" />
				</Link>
			</div>
		</div>
	);
}
