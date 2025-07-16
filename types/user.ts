export interface AuthData {
    id: string;
    email: string;
    username: string;
    avatar?: string;
}

export interface UserLog {
    email: string;
    password: string;
}

export interface UpdateUserData {
    username: string;
}

export interface UserReg {
    email: string;
    password: string;
}

