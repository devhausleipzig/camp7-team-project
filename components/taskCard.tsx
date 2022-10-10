import React from "react";

type taskCardProps = {};

export default function TaskCard({}: taskCardProps) {
  return (
    <div className="flex flex-col bg-black rounded-md h-[29%] w-[88%] shadow-md">
      <div className="flex ">1</div>
      <div className="flex">1</div>
      <div className="flex">1</div>
    </div>
  );
}
