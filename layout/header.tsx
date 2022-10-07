import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";

type headerProps = {};

export default function Header({}: headerProps) {
	return (
		<div className="h-auto top-0 p-2">
			<div className="flex justify-between">
				<Link href="/">
					<HomeIcon className="h-10 w-10" />
				</Link>
				<Link href="/avatar">
					<UserCircleIcon className="h-10 w-10" />
				</Link>
			</div>
		</div>
	);
}
