export type Tag = {
    id: number;
    name: string;
    categoryId: number;
};

export type TagCategory = {
    id: number;
    name: string;
    color: string;
    tags: Tag[];
};
