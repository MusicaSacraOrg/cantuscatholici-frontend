export type Tag = {
    id: number;
    name: string;
    category: string;
};

export type TagCategory = {
    name: string;
    tags: Tag[];
};
