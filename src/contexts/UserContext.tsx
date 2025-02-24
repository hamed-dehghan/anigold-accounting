
import React, { createContext, useState, useContext, ReactNode } from 'react';

const UserContext = createContext<any>(undefined);

// Custom hook to access the user data context
export const useUserData = (): any => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserProvider");
  }

  return context;
};

// UserProvider component
export const UserProvider: React.FC<any> = ({ children }) => {
  // Initialize UserData state
  const [UserData, setUserData] = useState<string>('Home');

  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
