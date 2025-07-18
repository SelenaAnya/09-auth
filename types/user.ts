// types/user.ts
export interface AuthData {
    email: string;
    password: string;
}

export interface UserBase {
    username: string;
    email: string;
    avatar?: string; // Зробити необов'язковим
}

export interface UserRegister extends UserBase {
    // Можна додати додаткові поля для реєстрації
}

export interface UserLogin extends UserBase {
    // Можна додати додаткові поля для входу
}

// Тип для Zustand store
export interface AuthUser extends UserBase {
    // Уніфікований тип для store
}