

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PageContextType {
  ActivePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const useActivePage = (): PageContextType => {
  const context = useContext(PageContext);

  if (!context) {
    throw new Error("useActivePage must be used within a PageProvider");
  }

  return context;
};

// Define the type for the provider props
interface PageProviderProps {
  children: ReactNode;
}

// Provider component
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [ActivePage, setActivePage] = useState<string>('Home');

  return (
    <PageContext.Provider value={{ ActivePage, setActivePage }}>
      {children}
    </PageContext.Provider>
  );
};
