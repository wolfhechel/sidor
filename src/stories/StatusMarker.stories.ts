import type { Meta, StoryObj } from '@storybook/svelte';
import StatusMarker, { Status } from '$lib/components/Feed/Post/StatusMarker.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Feed/Post/StatusMarker',
    component: StatusMarker
} satisfies Meta<StatusMarker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Unread: Story = {
    args: {
        status: Status.Unread
    }
};

export const Read: Story = {
    args: {
        status: Status.Read
    }
};

export const Removed: Story = {
    args: {
        status: Status.Removed
    }
};