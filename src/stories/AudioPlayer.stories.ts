import type { Meta, StoryObj } from '@storybook/svelte';
import AudioPlayer from '$lib/components/Feed/Post/AudioPlayer.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Feed/Post/AudioPlayer',
    component: AudioPlayer
} satisfies Meta<AudioPlayer>;

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
        src: 'https://www.chosic.com/wp-content/uploads/2022/01/Missing-You.mp3',
        metadata: new MediaMetadata({
            artist: 'Purrple',
            title: 'Missing You'
        })
    },
};

export const Fullscreen: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'default'
        }
    },
    args: {
        src: 'https://www.chosic.com/wp-content/uploads/2022/01/Missing-You.mp3',
        metadata: new MediaMetadata({
            artist: 'Purrple',
            title: 'Missing You'
        })
    },
};