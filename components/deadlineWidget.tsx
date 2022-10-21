export default function DeadlineWidget({ task: data }: any) {
	const now = new Date();
	const endTDate = new Date(data.endDate + "T" + data.endTime);
	const diffInMinutes = Math.trunc(
		(endTDate.valueOf() - now.valueOf()) / 60 / 1000
	);
	const diffInHours = Math.trunc(diffInMinutes / 60);
	const diffInDays = Math.trunc(diffInHours / 24);
	let diffString = "";

	if (diffInDays > 0) {
		diffString = `less than ${diffInDays} days`;
	} else if (diffInHours > 0) {
		diffString = `less than ${diffInHours} hours`;
	} else if (diffInMinutes > 0) {
		diffString = `less than ${diffInMinutes} minutes`;
	} else {
		diffString = "deadline past";
	}

	return (
		<>
			<p>{diffString}</p>
		</>
	);
}
