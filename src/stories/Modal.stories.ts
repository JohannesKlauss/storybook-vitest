import type {Meta, StoryObj} from '@storybook/react';
import {Modal} from './Modal';
import {expect, fn, userEvent, waitFor} from "@storybook/test";

const meta: Meta<typeof Modal> = {
  title: 'Example/Modal',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {control: 'text'},
    email: {control: 'text'},
  },
  args: {onSubmit: fn()},
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  play: async ({canvas}) => {
    await expect(canvas.getByRole('button', {name: /edit your spaceteams profile/i})).toBeInTheDocument();
  }
}

export const WithDefaults: Story = {
  args: {
    name: "Johannes",
    email: "johannes.klauss@spaceteams.de",
  }
};

export const Opened: Story = {
  args: {
    name: "Johannes",
    email: "johannes.klauss@spaceteams.de",
  },
  play: async ({canvas}) => {
    await userEvent.click(canvas.getByRole('button', {name: /edit your spaceteams profile/i}));

    await expect(canvas.getByLabelText(/name/i)).toBeInTheDocument();
    await expect(canvas.getByLabelText(/email/i)).toBeInTheDocument();
    await expect(canvas.getByRole('button', {name: /save changes/i})).toBeInTheDocument();
  }
};

export const SaveChanges: Story = {
  ...Opened,
  play: async (context) => {
    await Opened.play?.(context)

    await context.step('Change data', async () => {
      await userEvent.clear(context.canvas.getByLabelText(/name/i))
      await userEvent.type(context.canvas.getByLabelText(/name/i), 'Kassem')

      await userEvent.clear(context.canvas.getByLabelText(/email/i))
      await userEvent.type(context.canvas.getByLabelText(/email/i), 'kassem.thome@spaceteams.de')
    })

    await userEvent.click(context.canvas.getByRole('button', {name: /save changes/i}))

    await waitFor(() => expect(context.args.onSubmit).toHaveBeenCalledWith('Kassem', 'kassem.thome@spaceteams.de'));

    await expect(context.canvas.queryByRole('button', {name: /save changes/i})).not.toBeInTheDocument();
  }
}