import Link from "next/link";

interface props {
	label?: string;
	className?: string;
	link?: string;
}

export default function WideButton(props: props) {
	return (
		<Link href={`${props.link}`}>
			<button
				className={`w-11/12 h-10 rounded-lg text-white text-lg mb-4 ${props.className}`}
			>
				{props.label}
			</button>
		</Link>
	);
}
