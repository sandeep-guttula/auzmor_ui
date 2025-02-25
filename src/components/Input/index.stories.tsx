import { Input } from ".";
import type { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Input",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input",
    disabled: true,
  },
};


