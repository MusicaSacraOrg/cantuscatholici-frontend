import { UserProfile } from '../UserProfile';
import { StoryObj } from '@storybook/react';
import { UserDetail } from '../../../models/user';
import { Roles } from '../../../router/roles';

const mockUser: UserDetail = {
    id: 0,
    email: 'admin@musicasacra.com',
    mobile: '+421918958527',
    registeredAt: new Date('2024-01-01'),
    role: Roles.ADMIN,
    name: 'Admin',
    surname: 'AdminSurname',
    description: 'Some description provided here',
    avatar: 'https://via.placeholder.com/120',
};

const meta = {
    title: 'CantusCatholici/components/UserProfile',
    component: UserProfile,
    args: {
        user: mockUser,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAvatar: Story = {
    args: {
        user: {
            ...mockUser,
            avatar: undefined,
        },
    },
};

export const LongDescription: Story = {
    args: {
        user: {
            ...mockUser,
            description:
                'This is a very long description that should test how the component handles longer text content. It should wrap properly and maintain good readability.',
        },
    },
};

export const Redactor: Story = {
    args: {
        user: {
            ...mockUser,
            name: 'Jane',
            surname: 'Smith',
            role: Roles.REDACTOR,
            email: 'redactor@musicasacra.com',
        },
    },
};
