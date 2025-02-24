
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const ThemeContext = createContext();

// export const useThemePallet = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem('Theme'));

//   useEffect(() => {
//     document.documentElement.className = theme
//     document.getElementById('root').className = theme;
//     localStorage.setItem('Theme',theme)
//   }, [theme]);

//   const toggleTheme = (theme) => {
//     setTheme(theme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the context value
interface ThemeContextType {
  theme: string | null; // The theme can be `null` if no value is in localStorage initially
  toggleTheme: (theme: string) => void;
}

// Create the context with an undefined default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook for consuming the context
export const useThemePallet = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemePallet must be used within a ThemeProvider");
  }

  return context;
};

// Define the props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Retrieve the theme from localStorage or default to null
  const [theme, setTheme] = useState<string | null>(localStorage.getItem('Theme'));

  useEffect(() => {
    // Apply the theme to the document
    if (theme) {
      document.documentElement.className = theme;
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.className = theme;
      }

      // Persist the theme in localStorage
      localStorage.setItem('Theme', theme);
    }
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
