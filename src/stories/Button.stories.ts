import type {Meta, StoryObj} from '@storybook/react';
import {expect, fn} from '@storybook/test';

import {Button} from './Button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
  args: {onClick: fn()},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
  play: async (context) => {
    await expect(context.canvas.getByText('Button')).toBeInTheDocument();
  }
};

