import { ProfileHeader } from '../ProfileHeader';
import { StoryObj } from '@storybook/react';
import { Roles } from '../../../router/roles';

const meta = {
    title: 'CantusCatholici/components/ProfileHeader',
    component: ProfileHeader,
    args: {
        name: 'John',
        surname: 'Doe',
        role: Roles.ADMIN,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Redactor: Story = {
    args: {
        name: 'Jane',
        surname: 'Smith',
        role: Roles.REDACTOR,
    },
};

export const User: Story = {
    args: {
        name: 'Bob',
        surname: 'Johnson',
        role: Roles.USER,
    },
};
