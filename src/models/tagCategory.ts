import { Tag } from './tag';

export type TagCategory = {
    id: number;
    name: string;
    color: string;
    tags: Tag[];
};
