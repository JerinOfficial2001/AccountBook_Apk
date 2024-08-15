import {createContext, useContext, useState} from 'react';

const ContextProvider = createContext();
export const useGlobalContext = () => {
  const context = useContext(ContextProvider);
  return context;
};
export const GlobalContextProvider = ({children}) => {
  const [statistics, setstatistics] = useState(null);
  return (
    <ContextProvider.Provider
      value={{
        statistics,
        setstatistics,
      }}>
      {children}
    </ContextProvider.Provider>
  );
};
