import { ExampleComponent } from '../ExampleComponent';
import { StoryObj } from '@storybook/react';

const meta = {
    title: 'CantusCatholici/ExampleComponent',
    component: ExampleComponent,
    args: {
        title: 'Test Cantus Catholici',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
