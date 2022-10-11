interface Props {
	status: boolean;
}

export function StatusWidget({ status }: Props) {
	return <div>{status ? "+" : "-"}</div>;
}
