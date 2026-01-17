import { Role } from '../router/roles';

export type Person = {
    id: number;
    name: string;
    surname: string;
    description: string;
};

export type User = Person & {
    email: string;
    mobile: string;
    role: Role;
    registeredAt: Date;
};

export type UserDetail = User & {
    avatar?: string;
    descriptions?: string;
};
