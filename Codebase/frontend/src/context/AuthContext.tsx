// import { useState, useEffect, useContext, createContext } from "react";
// import getAuth from "../util/authHeader";
// import { AuthContextType, UserDataType } from "../_type/context_type";

// // Create auth context
// const AuthContext = createContext<AuthContextType | null>(null);

// // Prepare auth provider
// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [userData, setUserData] = useState<UserDataType>({
//     email: "",
//     id: 0,
//     role: "",
//     token: null
//   });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isUser, setIsUser] = useState(false);
//   const [isServiceProvider, setIsServiceProvider] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const loggedInUser = await getAuth();

//     if (loggedInUser && loggedInUser.token) {
//       setIsLoggedIn(true);
//       if (loggedInUser.role === "user") {
//         setIsUser(true);
//       } else if (loggedInUser.role === "serviceProvider") {
//         setIsServiceProvider(true);
//       }
//       setUserData(loggedInUser);
//     }
//   };

//   const values: AuthContextType = {
//     isUser,
//     isServiceProvider,
//     userData,
//     setUserData,
//     setIsUser,
//     setIsServiceProvider,
//     fetchData,
//     setIsLoggedIn,
//     isLoggedIn,
//   };

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };

// // useAuth
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


import { useState, useEffect, useContext, createContext } from "react";
import getAuth from "../util/authHeader";
import { AuthContextType, UserDataType } from "../_type/context_type";

// // create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// // prepare auth provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    id: 0,
    role: "",
    token: null
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isServiceProvider, setIsServiceProvider] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const loggedInUser = getAuth();

    loggedInUser.then((response) => {
      if (response != null && response.token != null) {
        setIsLoggedIn(true);
        if (response.role === "user") {
          setIsUser(true);
        } else if (response.role === "serviceProvider") {
          setIsServiceProvider(true);
        }
        setUserData(response);
      }
    });
  };

  const values = {
    isUser,
    isServiceProvider,
    userData,
    setUserData,
    setIsUser,
    setIsServiceProvider,
    fetchData,
    setIsLoggedIn,
    isLoggedIn,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};


// useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useData must be used within a userProvider");
  }
  return context;
};

