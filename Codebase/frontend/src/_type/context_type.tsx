export type UserDataType = {
    id: number;
    email: string;
    role: string;
    token: string | null;
};

export type AuthContextType = {
    isUser: boolean;
    isServiceProvider: boolean;
    userData: UserDataType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
    setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
    setIsServiceProvider: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isLoggedIn: boolean;
};

