import { Test } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof Test> = {
  title: "Components/Test",
  component: Test,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Tests sjdfhshfusfuhsufyuyf ",
  },
};

