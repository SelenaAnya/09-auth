
export interface AuthData {
    email: string;
    password: string;
}

export interface UserLogin {
    username: string;
    email: string;
    avatar?: string; // Зробити необов'язковим
}
