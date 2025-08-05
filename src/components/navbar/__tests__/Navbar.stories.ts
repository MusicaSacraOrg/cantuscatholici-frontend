import { Navbar } from '../Navbar';
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'CantusCatholici/components/Navbar',
    component: Navbar,
    args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
