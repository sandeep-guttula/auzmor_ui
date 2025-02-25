import {
  Alert,
  AlertTitle,
  AlertDescription
} from "./"
import { Terminal } from "lucide-react"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A simple alert component.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert variant="default">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>This is a sample description for the alert.</AlertDescription>
    </Alert>
  ),
}
