import { createContext, useState, ReactNode } from 'react';


// Create the context with the specified type
export const GlobalContext = createContext<any>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [openNotification, setOpenNotification] = useState<any>({
    open: false,
    type: '',
    message: '',
  });

  return (
    <GlobalContext.Provider value={{ openNotification, setOpenNotification }}>
      {children}
    </GlobalContext.Provider>
  );
};
