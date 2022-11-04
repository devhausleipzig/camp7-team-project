import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskCard, { TaskCardTypes } from "./taskCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Components/TaskCard",
	component: TaskCard,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		type: {
			type: "string",
			description: "Different Task Card layout variations.",
			control: "select",
			options: Object.values(TaskCardTypes)
		}
	}
} as ComponentMeta<typeof TaskCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskCard> = (args) => (
	<div className="w-80">
		<TaskCard
			{...args}
			task={{
				title: "Example Title",
				points: 123,
				endDate: "",
				endTime: "",
				note: "Description of Task",
				createdAt: new Date(),
				updatedAt: new Date(),
				completed: false,
				creatorId: "sdjklfhsd",
				id: "sdoifhsfd",
				assignedTo: []
			}}
		/>
	</div>
);

export const Preview = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Preview.args = {
	type: TaskCardTypes.preview
};
