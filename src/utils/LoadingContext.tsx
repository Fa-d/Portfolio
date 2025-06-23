import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}; 