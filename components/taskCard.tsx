import React from "react";
import { Task } from "../pages";
import { TimeWidget } from "./timeWidget";
import { DateWidget } from "./dateWidget";
import Image from "next/image";
import { useState, useEffect } from "react";
import Data from "../db.json";
import CoinSelectedIcon from "../public/images/coin-selected.svg";
import ClockIcon from "../public/images/clock.svg";
import User1Icon from "../public/images/user-1.svg";
import User2Icon from "../public/images/user-2.svg";
import CheckBoxCheckedIcon from "../public/images/checkbox-checked.svg";
import { StatusWidget } from "./statusWidget";

type taskCardProps = {
	task: Task;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export default function TaskCard({
	task,
	isLoading,
	setIsLoading,
}: taskCardProps) {
	return (
		<>
			<div className="flex justify-center align-middle text-xl">
				<div className="flex justify-between items-center gap-12 text-[#064789]">
					<TimeWidget time={task.endTime} />
					<DateWidget date={task.endDate} />
					<StatusWidget
						status={task.status}
						id={task.id}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
				</div>
			</div>
		</>
	);

// export default function TaskCard({}: taskCardProps) {
//   return (
//     <>
//       {Data &&
//         Data.tasks.slice(0, 3).map((data) => {
//           const now = new Date();
//           const endTDate = new Date(data.endDate + " " + data.endTime);
//           const diffInMinutes = Math.trunc(
//             (endTDate.valueOf() - now.valueOf()) / 60 / 1000
//           );
//           const diffInHours = Math.trunc(diffInMinutes / 60);
//           const diffInDays = Math.trunc(diffInHours / 24);
//           let diffString = "";
//           if (diffInDays > 0) {
//             diffString = `less than ${diffInDays} days`;
//           } else if (diffInHours > 0) {
//             diffString = `less than ${diffInHours} Hours`;
//           } else if (diffInMinutes > 0) {
//             diffString = `less than ${diffInMinutes} Minutes`;
//           } else {
//             diffString = `DeadLine`;
//           }

//           return (
//             <div className="flex flex-col rounded-lg h-[29%] w-[88%] bg-white shadow-md+ p-1 justify-center items-center">
//               {/* <div className="container" key={data.id}> */}
//               {/* 1-first div header */}
//               <div className="flex justify-between p-2 h-[30%] w-11/12 border-b-2 border-black/20">
//                 {/* counter Component */}
//                 <div className="text-sm opacity-70">{diffString}</div>

//                 <div className="flex text-md gap-1">
//                   <div className="text-sm">{data.points}</div>
//                   <CoinSelectedIcon className="w-5 h-5" />
//                 </div>
//               </div>
//               {/* 2-second div main */}
//               <div className="flex justify-between p-2 h-[45%] w-11/12 items-center">
//                 <div className="flex h-full gap-2">
//                   <div className="w-1 h-full bg-black rounded-full"></div>
//                   <div className="flex-col">
//                     {/* Chore Title */}
//                     <div className="text-xl font-extrabold">{data.title}</div>
//                     {/* max. 32 characters */}
//                     <div className="text-xs">{data.note}</div>
//                   </div>
//                 </div>
//                 {/* && changeable checkbox */}
//                 <div className="flex">
//                   <StatusWidget status={false} />
//                   {/* <CheckBoxCheckedIcon className="w-5 h-5" /> */}
//                 </div>
//               </div>
//               {/* 3-third div footer*/}
//               <div className="flex justify-between p-2 h-[22%] w-11/12 items-end">
//                 <div className="flex justify-center gap-1">
//                   {/* Calendar. > 24H or Clock-Icon. < 24H */}
//                   <ClockIcon className="w-5 h-5" />
//                   {/* time Function Component */}
//                   <div className="text-sm">{data.endTime}</div>
//                 </div>
//                 <div className="flex w-auto rounded-full border-1 border-black gap-1">
//                   {/* && changeable Avatar Icon and max. 4 */}
//                   <User1Icon className="w-5 h-5" />
//                   <User2Icon className="w-5 h-5" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </>
//   );
}
