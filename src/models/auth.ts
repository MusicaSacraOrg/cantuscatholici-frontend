import { Person } from './user';

export type Token = {
    accessToken: string;
    tokenType: string;
};

export type Credentials = {
    email: string;
    password: string;
};

export type NewUser = Omit<Person, 'id' | 'description'> & {
    email: string;
    password: string;
    mobile?: string;
};
