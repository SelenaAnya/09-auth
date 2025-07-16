export interface User {
    id: string;
    email: string;
    username: string;
    avatar?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
}

export interface UpdateUserData {
    username: string;
}