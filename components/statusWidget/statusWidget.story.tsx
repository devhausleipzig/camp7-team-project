import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import StatusWidget from "./statusWidget";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Components/StatusWidget",
	component: StatusWidget,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		status: {
			type: "boolean",
			description: "Checked or not checked."
		},
		requestInProgress: {
			type: "boolean",
			description: "Disable clicking when request in progress."
		},
		onClick: {
			type: "function",
			description: "On click handler."
		}
	}
} as ComponentMeta<typeof StatusWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StatusWidget> = (args) => (
	<StatusWidget {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	status: false,
	requestInProgess: false
};
