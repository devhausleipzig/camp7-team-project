import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ButtonSizes } from "./button";

import Button from "./button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Components/Button",
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		label: {
			type: "string",
			description: "The text inside the button."
		},
		size: {
			type: "string",
			description: "Various size variants of the button.",
			control: "select",
			options: Object.values(ButtonSizes)
		}
	}
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
	<div className="w-24">
		<Button {...args} />
	</div>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	label: "Example",
	size: ButtonSizes.default
};

export const Wide = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Wide.args = {
	label: "Example",
	size: ButtonSizes.wide
};
