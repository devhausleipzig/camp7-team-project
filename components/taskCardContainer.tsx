import { useState } from "react";
import ExpandedTaskCard from "./expandedTaskCard";
import TaskCard from "./taskCard";

export default function TaskCardContainer() {
  const [selectedTask, setSelectedTask] = useState<number | undefined>(
    undefined
  );
  function deselectTask() {
    setSelectedTask(undefined);
  }
  if (selectedTask === undefined) {
    return TaskCard;
  } else {
    return ExpandedTaskCard;
  }
}
