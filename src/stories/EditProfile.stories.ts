import type {Meta, StoryObj} from '@storybook/react';
import {EditProfile} from './EditProfile.tsx';
import {expect, fn, userEvent, waitFor} from "@storybook/test";

const meta: Meta<typeof EditProfile> = {
  title: 'Edit Profile',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {control: 'text'},
    email: {control: 'text'},
  },
  args: {
    name: '',
    email: '',
    onSubmit: fn(),
  },
  component: EditProfile
};

export default meta;
type Story = StoryObj<typeof EditProfile>;

export const Default: Story = {
}

export const WithPrefilledData: Story = {
  args: {
    name: "Johannes",
    email: "johannes.klauss@spaceteams.de"
  }
};

export const Opened: Story = {
  ...WithPrefilledData,
  play: async ({canvas}) => {
    await userEvent.click(canvas.getByRole('button', {name: /edit your spaceteams profile/i}));

    await expect(canvas.getByLabelText(/name/i)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/email/i)).toBeInTheDocument();
    await expect(canvas.getByRole('button', {name: /save changes/i})).toBeInTheDocument();
  }
}

export const ChangeSettings: Story = {
  ...WithPrefilledData,
  play: async (context) => {
    await Opened.play?.(context)

    await context.step('change profile data', async () => {
      await userEvent.clear(context.canvas.getByLabelText(/name/i))
      await userEvent.type(context.canvas.getByLabelText(/name/i), 'Kassem')

      await userEvent.clear(context.canvas.getByLabelText(/email/i))
      await userEvent.type(context.canvas.getByLabelText(/email/i), 'kassem.thome@spaceteams.de')
    })

    await userEvent.click(context.canvas.getByRole('button', {name: /save changes/i}))

    await waitFor(() => expect(context.args.onSubmit).toHaveBeenCalledWith('Kassem', 'kassem.thome@spaceteams.de'))

    await expect(context.canvas.queryByRole('button', {name: /save changes/i})).not.toBeInTheDocument();
  }
}