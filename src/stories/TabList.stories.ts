import type { Meta, StoryObj } from '@storybook/svelte';
import TabList, { type Tab } from '$lib/components/TabList.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'TabList',
    component: TabList
} satisfies Meta<TabList>;

const exampleTabs = [
    {
        id: 0,
        title: 'First page'
    },
    {
        id: 1,
        title: 'Second page'
    }
];

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    },
    args: {
        currentTab: 0,
        tabs: exampleTabs,
    },
};

export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'default'
        }
    },
    args: {
        currentTab: 0,
        tabs: exampleTabs,
    },
};