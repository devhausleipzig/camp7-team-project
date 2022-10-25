import { useRouter } from "next/router";
import { useState } from "react";
import ExpandedTaskCard from "../../components/expandedTaskCard";
import TaskCard from "../../components/taskCard";
import { useGetTasks } from "../../hooks/useGetTasks";

export default function TaskCardContainer() {
  const router = useRouter();
  const { taskId } = router.query;
  console.log(taskId);
  const { setIsLoading, isLoading, tasks, setTasks } = useGetTasks();
  return tasks.length > 0 ? (
    <TaskCard
      type="extended"
      task={tasks[0]}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    />
  ) : (
    <p>no data</p>
  );
}
